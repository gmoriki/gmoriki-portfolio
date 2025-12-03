import { drizzle } from "drizzle-orm/mysql2";
import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

const works = mysqlTable("works", {
  id: int("id").autoincrement().primaryKey(),
  year: varchar("year", { length: 10 }).notNull(),
  date: varchar("date", { length: 100 }).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  organization: text("organization"),
  link: text("link"),
  image: text("image"),
  tags: text("tags").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

const notableWorks = [
  {
    year: "2023年",
    items: [
      {
        date: "2023年",
        title: "国内大学の生成AIポリシー データベース公開",
        description: "国内大学の生成AIに関するポリシーやガイドラインを体系的にまとめたデータベース。2023年3月から2024年9月までリアルタイムに更新。多数の論文やリサーチペーパー、大学HP（東北大学等）に参考資料として引用されています",
        link: "https://docs.google.com/spreadsheets/d/1cDOqaIdu9JKOYuF0ThG33oixE09m210z/edit#gid=1530250804",
        image: "/ai-policy-db.webp",
        tags: ["プロダクト", "論文・発表", "オープンソース"],
      },
      {
        date: "2023年12月6-7日",
        title: "大学職員のための生成AIコーディネーター養成講座",
        description: "大学の現場で生成AI活用を推進する人材を育成プログラム。一泊二日にわたる包括的な研修で、日常業務における生成AI活用と組織体制の整備をインプット。修了生の多くは生成AIコーディネーターとして活躍中（金沢大学、滋賀大学、岐阜聖徳学園大学等）。",
        organization: "愛媛大学教育企画室",
        tags: ["研修"],
      },
    ],
  },
  {
    year: "2024年",
    items: [
      {
        date: "2024年",
        title: "大学職員のためのプロンプトガイド開発",
        description: "実務で使えるプロンプト集を体系化。多数の大学（九州大学、立命館大学、北陸大学等）に引用され、大学業務における生成AI活用のスタンダードとして広く利用されています。",
        link: "https://promptforus.com/",
        image: "/prompt-guide.webp",
        tags: ["プロダクト", "論文・発表", "オープンソース"],
      },
      {
        date: "2024年8月27日",
        title: "大学業務における生成AI利活用セミナー",
        description: "「大学職員は生成AIを「実際に」活用できるのか」をテーマに、日本マイクロソフトと佐賀大学が共催した実践的なセミナー。基調講演を担当",
        organization: "日本マイクロソフト、佐賀大学共催",
        tags: ["講演"],
      },
    ],
  },
  {
    year: "2025年",
    items: [
      {
        date: "2025年10月27日",
        title: "金沢大学 令和7年度DX研修（生成AI活用（応用編））",
        description: "「生成AI活用の本質的理解：大学DXを加速する「プロトタイプ起点業務」」をテーマに、AIを「エイリアン・インテリジェンス（異質な知性）」として捉え、プロトタイプ思考で業務を変革する次世代の研修",
        organization: "金沢大学情報推進室",
        link: "https://note.com/pogohopper8/n/ne605cfd9b08b",
        image: "/kanazawa-dx-training.webp",
        tags: ["研修", "講演", "アドバイザリー"],
      },
      {
        date: "2025年10月27日",
        title: "プロトタイプ起点型の業務を体験しよう（ワークショップ）",
        description: "Google AI Studio「Build with Gemini」を活用した実践的ワークショップ。専門知識不要でWebアプリケーションのプロトタイプを構築し、全職員が当たり前に使える「思考ツール」としてのAI活用を体験",
        organization: "金沢大学情報推進室",
        link: "https://note.com/pogohopper8/n/n391a90174a5f",
        image: "/kanazawa-workshop.webp",
        tags: ["研修", "プロダクト", "教材開発"],
      },
    ],
  },
];

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL environment variable is not set");
    process.exit(1);
  }

  const db = drizzle(process.env.DATABASE_URL);

  console.log("Seeding works data...");

  for (const yearGroup of notableWorks) {
    for (const item of yearGroup.items) {
      await db.insert(works).values({
        year: yearGroup.year,
        date: item.date,
        title: item.title,
        description: item.description,
        organization: item.organization || null,
        link: item.link || null,
        image: item.image || null,
        tags: JSON.stringify(item.tags),
      });
      console.log(`✓ Added: ${item.title}`);
    }
  }

  console.log("✅ Seeding completed!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
