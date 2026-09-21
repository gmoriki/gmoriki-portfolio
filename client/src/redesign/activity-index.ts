import { works as activities } from "../data/works-data";
import { editorialItems, type EditorialItem } from "./magazine-content";
import { publishedSites } from "./published-sites";

export const mediaNames: Record<EditorialItem["kind"], string> = {
  note: "note",
  slides: "Speaker Deck",
  paper: "論文・発表",
  tool: "公開ツール",
  article: "寄稿・座談会",
};

export function dateNumber(date: string) {
  const parts = date.match(/\d+/g) || [];
  return (
    Number(parts[0] || 0) * 10000 +
    Number(parts[1] || 0) * 100 +
    Number(parts[2] || 0)
  );
}

export function displayDate(date: string) {
  if (/^\d{4}-\d{2}(?:-\d{2})?$/.test(date)) {
    return date.replace(/-/g, ".");
  }
  return date
    .replace("年", ".")
    .replace(/(\d{1,2})月/, (_, month: string) => `${month.padStart(2, "0")}.`)
    .replace(
      /(\d{1,2})(?:-(\d{1,2}))?日/,
      (_, day: string, endDay?: string) =>
        `${day.padStart(2, "0")}${endDay ? `–${endDay.padStart(2, "0")}` : ""}`
    )
    .replace(/\.$/, "");
}

export type IndexRow = {
  id: string;
  date: string;
  title: string;
  source: string;
  kind: string;
  href?: string;
  hrefLabel?: string;
  region?: number;
  regionName?: string;
  tags: string[];
};

const tokyoSlides = editorialItems.find(
  item => item.id === "slides-work-possibilities"
)!;
const p4usPaper = editorialItems.find(item => item.id === "paper-p4us")!;
const ehimeSlides = editorialItems.find(
  item => item.id === "slides-ai-introduction"
)!;
const integratedEditorialIds = new Set<string>();

// Legacy publication/link corrections are applied in this view. New activities
// live in the shared ledger so map counts and the index stay in sync.
// Evidence: docs/redesign-2026-09/v3/content-notes.md and v8/README.md.
export const activityRows: IndexRow[] = activities.map((item, index) => {
  const row: IndexRow = {
    id: `activity-${index}`,
    date: item.date,
    title: item.title,
    source: item.organization || item.university || "gmoriki",
    kind: item.tags.some(tag => tag === "研修" || tag === "講演")
      ? "講演・研修"
      : item.tags[0] || "その他",
    href: item.link,
    hrefLabel: item.linkLabel,
    region: item.prefectureCode ? Number(item.prefectureCode) : undefined,
    regionName: item.prefectureName,
    tags: [...item.tags],
  };

  if (
    item.university === "東京大学" &&
    item.title ===
      "大学業務への生成AIの活かし方 — Microsoft 365 Copilot分析機能編 —"
  ) {
    row.href = tokyoSlides.href;
  }

  if (
    item.title === p4usPaper.title &&
    item.organization === "第13回大学情報・機関調査研究集会"
  ) {
    row.date = p4usPaper.date;
    row.href = p4usPaper.href;
    row.source = `${item.organization} / J-STAGE`;
    row.tags.push("P4Us");
    integratedEditorialIds.add(p4usPaper.id);
  }

  if (item.link === "https://promptforus.com/") {
    row.title = "P4Us — 大学職員のためのプロンプトガイド";
    row.kind = "公開ツール";
    row.tags.push("P4Us", "公開ツール");
  }

  // Host-written reports support the event record, rather than appearing as
  // separate editorial publications alongside Moriki's own work.
  if (item.university === "新潟大学" && dateNumber(item.date) === 20250919) {
    row.href = "https://www.niigata-u.ac.jp/news/2025/965032/";
    row.hrefLabel = "開催報告";
  }
  if (item.university === "岡山大学" && dateNumber(item.date) === 20250826) {
    row.href = "https://www.okayama-u.ac.jp/tp/news/news_id14557.html";
    row.hrefLabel = "開催報告";
  }

  if (
    item.title === "大学職員のための生成AIコーディネーター養成講座" &&
    dateNumber(item.date) === 20231206
  ) {
    row.href = ehimeSlides.href;
  }
  return row;
});

const publicationRows: IndexRow[] = editorialItems
  .filter(
    item =>
      !integratedEditorialIds.has(item.id) &&
      !activityRows.some(
        row => row.href === item.href && row.kind === mediaNames[item.kind]
      )
  )
  .map(item => ({
    id: item.id,
    date: item.date,
    title: item.title,
    source: item.source,
    kind: mediaNames[item.kind],
    href: item.href,
    hrefLabel: item.hrefLabel,
    tags: [mediaNames[item.kind]],
  }));

const viewerRow: IndexRow = {
  id: "tool-industrial-collaboration-viewer",
  date: "2026-04-19",
  title: "産連調査Viewer",
  source: "gmoriki",
  kind: "公開ツール",
  href: "https://unifactbook.pages.dev/",
  tags: ["公開ツール", "産学連携", "大学ファクトブック", "データ可視化"],
};

const siteRows: IndexRow[] = publishedSites
  .filter(site => site.access === "public")
  .filter(
    site =>
      ![...activityRows, ...publicationRows, viewerRow].some(
        row => row.href === site.href && row.kind === "公開サイト"
      )
  )
  .map(site => ({
    id: site.id,
    date: site.createdAt,
    title: site.title,
    source: site.context,
    kind: "公開サイト",
    href: site.href,
    hrefLabel: "サイトを開く",
    tags: ["公開サイト", "ChatGPT Sites", ...site.tags],
  }));

export const indexRows = [
  ...activityRows,
  ...publicationRows,
  viewerRow,
  ...siteRows,
].sort((a, b) => dateNumber(b.date) - dateNumber(a.date));
