import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const project = fileURLToPath(new URL("../", import.meta.url));
const root = path.join(project, "dist/public");
const manifest = JSON.parse(
  await readFile(path.join(project, "site-manifest.json"), "utf8")
);
const read = file => readFile(path.join(root, file), "utf8");
const files = (await readdir(root, { recursive: true })).filter(
  file => !file.endsWith("/")
);
const allowed = new Set([
  ...manifest.pages.map(page => page.entry),
  ...manifest.assets,
  "404.html",
  ".nojekyll",
  "robots.txt",
  "sitemap.xml",
]);
for (const file of files) {
  if (!(await stat(path.join(root, file))).isFile()) continue;
  assert.ok(
    allowed.has(file) || /^assets\/[\w.-]+\.(js|css)$/.test(file),
    `Unexpected public file: ${file}`
  );
}
for (const file of allowed)
  assert.ok((await stat(path.join(root, file))).isFile(), `Missing ${file}`);
assert.equal((await read("CNAME")).trim(), new URL(manifest.origin).hostname);
assert.ok(
  (await read("robots.txt")).includes(`Sitemap: ${manifest.origin}/sitemap.xml`)
);
const sitemap = await read("sitemap.xml");
assert.equal((sitemap.match(/<loc>/g) || []).length, manifest.pages.length);
for (const page of manifest.pages) {
  const html = await read(page.entry);
  const url = manifest.origin + page.path;
  assert.ok(
    html.includes(`<title>${page.title}</title>`),
    `${page.entry}: title`
  );
  assert.ok(
    html.includes(`rel="canonical" href="${url}"`),
    `${page.entry}: canonical`
  );
  assert.ok(
    html.includes(`name="description" content="${page.description}"`),
    `${page.entry}: description`
  );
  assert.ok(
    html.includes(`property="og:url" content="${url}"`),
    `${page.entry}: og:url`
  );
  assert.ok(
    html.includes(
      `property="og:image" content="${manifest.origin}/redesign/social-card.png"`
    ),
    `${page.entry}: social image`
  );
  assert.ok(
    html.includes('name="twitter:card" content="summary_large_image"'),
    `${page.entry}: Twitter card`
  );
  assert.ok(!html.includes("noindex"), `${page.entry}: must be indexable`);
  assert.ok(html.includes('lang="ja"'), `${page.entry}: language`);
  assert.ok(sitemap.includes(`<loc>${url}</loc>`), `${page.entry}: sitemap`);
}
assert.ok((await read("404.html")).includes('content="noindex, follow"'));
const card = await readFile(path.join(root, "redesign/social-card.png"));
assert.equal(card.subarray(1, 4).toString(), "PNG");
assert.equal(card.readUInt32BE(16), 1200);
assert.equal(card.readUInt32BE(20), 630);
// Scan emitted files, not source files: preview links and private paths must not ship.
for (const file of files.filter(file => /\.(html|js|css)$/.test(file))) {
  const contents = await read(file);
  assert.ok(
    !/\/(?:redesign|works-study|profile-study|type-study|identity-study|logo-study)\.html/.test(
      contents
    ),
    `${file}: study URL`
  );
  assert.ok(!contents.includes("/Users/gmoriki/"), `${file}: local path`);
  for (const match of contents.matchAll(
    /(?:src|href)="(\/[^"?#]*)(?:[?#][^"]*)?"/g
  )) {
    const target = match[1];
    if (target.startsWith("//")) continue;
    const entry = target.endsWith("/") ? target + "index.html" : target;
    assert.ok(
      (await stat(path.join(root, entry))).isFile(),
      `${file}: missing link ${target}`
    );
  }
}
console.log(
  `Public build verified: ${manifest.pages.length} pages, 404, ${manifest.assets.length} public assets, metadata and sitemap.`
);
