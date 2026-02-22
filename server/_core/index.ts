import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // OGP取得 API（og:image / og:title を返す）
  app.get("/api/ogp", async (req, res) => {
    const urlParam = req.query.url as string | undefined;
    if (!urlParam) { res.status(400).json({ error: "url required" }); return; }
    try {
      // SpeakerDeck: Cloudflare が HTML fetch をブロックするため oEmbed API を使用
      if (urlParam.includes("speakerdeck.com")) {
        const oembedUrl = `https://speakerdeck.com/oembed.json?url=${encodeURIComponent(urlParam)}`;
        const oembed = await fetch(oembedUrl, {
          headers: { "User-Agent": "Mozilla/5.0 (compatible; OGP-fetcher/1.0; +https://gmoriki.com)" },
          signal: AbortSignal.timeout(8000),
        }).then((r) => r.json()) as { thumbnail_url?: string; title?: string };
        res.setHeader("Cache-Control", "public, max-age=3600");
        res.json({ image: oembed.thumbnail_url ?? null, title: oembed.title ?? null, publishedTime: null });
        return;
      }
      const html = await fetch(urlParam, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; OGP-fetcher/1.0; +https://gmoriki.com)", Accept: "text/html" },
        signal: AbortSignal.timeout(6000),
      }).then((r) => r.text());
      const pick = (prop: string) => {
        const re1 = new RegExp(`<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']+)["']`, "i");
        const re2 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${prop}["']`, "i");
        return (html.match(re1) ?? html.match(re2))?.[1] ?? null;
      };
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.json({ image: pick("og:image"), title: pick("og:title"), publishedTime: pick("article:published_time") });
    } catch {
      res.status(500).json({ error: "fetch failed" });
    }
  });

  // note記事一覧 API（eyecatch画像込み）
  app.get("/api/note-articles", async (req, res) => {
    const page = (req.query.page as string | undefined) ?? "1";
    try {
      const data = await fetch(
        `https://note.com/api/v2/creators/pogohopper8/contents?kind=note&page=${page}`,
        { headers: { "User-Agent": "Mozilla/5.0 (compatible; Dashboard/1.0)" }, signal: AbortSignal.timeout(8000) }
      ).then((r) => r.json());
      res.setHeader("Cache-Control", "public, max-age=1800");
      res.json(data);
    } catch {
      res.status(500).json({ error: "fetch failed" });
    }
  });

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
