// Local preview of the exact GitHub Pages artifact, including directory URLs and 404.
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  fileURLToPath(new URL("../dist/public/", import.meta.url))
);
const port = Number(process.env.PORT || 4184);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};
await stat(path.join(root, "index.html"));

createServer(async (request, response) => {
  try {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405, { Allow: "GET, HEAD" });
      return response.end();
    }
    const url = new URL(request.url, "http://127.0.0.1");
    const pathname = decodeURIComponent(url.pathname);
    let file = path.resolve(root, "." + pathname);
    if (
      (file !== root && !file.startsWith(root + path.sep)) ||
      pathname.includes("\0")
    ) {
      response.writeHead(400);
      return response.end("Bad request");
    }
    let info = await stat(file).catch(() => null);
    if (info?.isDirectory()) {
      if (!url.pathname.endsWith("/")) {
        response.writeHead(301, { Location: url.pathname + "/" + url.search });
        return response.end();
      }
      file = path.join(file, "index.html");
      info = await stat(file).catch(() => null);
    }
    const status = info?.isFile() ? 200 : 404;
    if (status === 404) file = path.join(root, "404.html");
    response.writeHead(status, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    if (request.method === "HEAD") return response.end();
    createReadStream(file)
      .on("error", () => response.destroy())
      .pipe(response);
  } catch {
    response.writeHead(400);
    response.end("Bad request");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Public site preview: http://127.0.0.1:${port}/`)
);
