import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import manifest from "./site-manifest.json";

const project = import.meta.dirname;
const root = path.resolve(project, "client/site");

export default defineConfig({
  root,
  base: "/",
  appType: "mpa",
  publicDir: false,
  envDir: false,
  define: { "import.meta.env.VITE_PUBLIC_SITE": JSON.stringify("true") },
  plugins: [
    react(),
    {
      name: "public-site-metadata-and-assets",
      transformIndexHtml(html, context) {
        const entry = path
          .relative(root, context.filename)
          .split(path.sep)
          .join("/");
        const page = manifest.pages.find(item => item.entry === entry);
        if (!page) return html;
        const url = manifest.origin + page.path;
        const image = manifest.origin + "/redesign/social-card.png";
        return {
          html: html.replace(
            /<title>.*?<\/title>/s,
            `<title>${page.title}</title>`
          ),
          tags: [
            {
              tag: "meta",
              attrs: { name: "description", content: page.description },
            },
            {
              tag: "meta",
              attrs: { name: "robots", content: "index, follow" },
            },
            { tag: "link", attrs: { rel: "canonical", href: url } },
            ...Object.entries({
              "og:type": "website",
              "og:locale": "ja_JP",
              "og:site_name": "gmoriki",
              "og:url": url,
              "og:title": page.title,
              "og:description": page.description,
              "og:image": image,
              "og:image:width": "1200",
              "og:image:height": "630",
              "og:image:alt":
                "gmoriki — 職場としての大学に、AI人材育成を。森木銀河のポートレート",
            }).map(([property, content]) => ({
              tag: "meta",
              attrs: { property, content },
            })),
            ...Object.entries({
              "twitter:card": "summary_large_image",
              "twitter:title": page.title,
              "twitter:description": page.description,
              "twitter:image": image,
              "twitter:image:alt":
                "gmoriki — 職場としての大学に、AI人材育成を。森木銀河のポートレート",
            }).map(([name, content]) => ({
              tag: "meta",
              attrs: { name, content },
            })),
          ],
        };
      },
      generateBundle() {
        for (const fileName of manifest.assets) {
          this.emitFile({
            type: "asset",
            fileName,
            source: readFileSync(
              path.resolve(project, "client/public", fileName)
            ),
          });
        }
        this.emitFile({ type: "asset", fileName: ".nojekyll", source: "" });
        this.emitFile({
          type: "asset",
          fileName: "robots.txt",
          source: `User-agent: *\nAllow: /\nSitemap: ${manifest.origin}/sitemap.xml\n`,
        });
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${manifest.pages.map(page => `  <url><loc>${manifest.origin}${page.path}</loc></url>`).join("\n")}\n</urlset>\n`,
        });
      },
    },
  ],
  build: {
    outDir: path.resolve(project, "dist/public"),
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: Object.fromEntries([
        ...manifest.pages.map(page => [
          page.entry,
          path.resolve(root, page.entry),
        ]),
        ["404", path.resolve(root, "404.html")],
      ]),
    },
  },
  server: { host: "127.0.0.1", port: 4184, strictPort: true },
});
