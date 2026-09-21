// Sites metadata and anonymous access were checked on 2026-09-21 (JST).
// Evidence: docs/redesign-2026-09/v10/sites-research.md.
// Upcoming lecture sites are omitted until the event has taken place.
export type PublishedSite = {
  id: string;
  title: string;
  context: string;
  description: string;
  href: string;
  createdAt: string;
  access: "public" | "restricted";
  tags: string[];
};

export const publishedSites: PublishedSite[] = [
  {
    id: "site-kanazawa-seiryo-ai-training",
    title: "業務改善係のミッション",
    context: "金沢星稜大学 FD・SD研修",
    description:
      "AIにExcel関数を作らせ、人が式と計算結果を確かめる。業務改善を題材にした実践教材。",
    href: "https://kanazawa-seiryo-ai-training-2026.gmoriki.chatgpt.site",
    createdAt: "2026-08-23",
    access: "public",
    tags: ["金沢星稜大学", "FD", "SD", "Excel", "生成AI", "研修教材"],
  },
  {
    id: "site-toita-fdsd-ai",
    title: "生成AI 実践ワーク",
    context: "戸板女子短期大学 FD・SD研修",
    description:
      "安全な使い方を判断し、演習と相互確認を経て、自分の仕事で使う指示カードをつくる受講者用サイト。",
    href: "https://toita-fdsd-ai-2026.gmoriki.chatgpt.site",
    createdAt: "2026-08-05",
    access: "public",
    tags: ["戸板女子短期大学", "FD", "SD", "生成AI", "研修教材"],
  },
  {
    id: "site-was-ai-workbook",
    title: "大学職員のための生成AI業務活用入門",
    context: "WAS 2026 受講者用ワークブック",
    description:
      "共通実践、個人ワーク、共有、次の実践まで。ワークシートと講義スライドを一つにまとめた教材。",
    href: "https://was-2026-ai-workbook.gmoriki.chatgpt.site",
    createdAt: "2026-07-18",
    access: "public",
    tags: ["WAS", "大学職員", "生成AI", "業務活用", "研修教材"],
  },
];
