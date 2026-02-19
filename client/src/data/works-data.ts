// ============================================================
// 実績データの追加方法
// ============================================================
//
// 【手順】
// 1. このファイル（works-data.ts）を編集する
// 2. notableWorks の該当年の items 配列に新しいオブジェクトを追記
//    （新しい年の場合は新しい { year, items } ブロックを追加）
// 3. stats の数値を更新する（件数を手動でインクリメント）
// 4. git commit & push → GitHub Actions が自動ビルド・デプロイ
//
// 【フィールド説明】
//   date         : 表示用の日付文字列（例: "2025年11月15日"）
//   title        : 実績タイトル（必須）
//   description  : 説明文（必須）
//   tags         : カテゴリタグ（"研修" | "講演" | "アドバイザリー" | "プロダクト" | "論文・発表" | "オープンソース" | "教材開発" | "社会貢献"）
//   organization : 主催・依頼元（任意）
//   subtitle     : 研修名・講演名などの正式名称（任意）
//   link         : 関連URL（任意）
//   image        : 画像パス（任意、例: "/works/xx.webp"）
//                  → 画像は client/public/works/ フォルダに配置
//
// ============================================================

export interface WorkItem {
  date: string;
  title: string;
  description: string;
  tags: string[];
  organization?: string;
  subtitle?: string;
  link?: string;
  image?: string;
}

export interface YearGroup {
  year: string;
  items: WorkItem[];
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

// ---- 件数カウント（実績追加時に更新してください） ----
export const stats: StatItem[] = [
  { label: "論文・発表", value: 2, suffix: "件" },
  { label: "講演・研修", value: 48, suffix: "件" },
  { label: "社会貢献活動", value: 10, suffix: "件" },
  { label: "Works(作品等)", value: 3, suffix: "件" },
];

// ---- 主な実績一覧（新しい年ほど下に追加） ----
export const notableWorks: YearGroup[] = [
  {
    year: "2023年",
    items: [
      {
        date: "2023年",
        title: "国内大学の生成AIポリシー データベース公開",
        description:
          "国内大学の生成AIに関するポリシーやガイドラインを体系的にまとめたデータベース。2023年3月から2024年9月までリアルタイムに更新。多数の論文やリサーチペーパー、大学HP（東北大学等）に参考資料として引用されています",
        link: "https://docs.google.com/spreadsheets/d/1cDOqaIdu9JKOYuF0ThG33oixE09m210z/edit#gid=1530250804",
        image: "/policy-database.png",
        tags: ["プロダクト", "論文・発表", "オープンソース"],
      },
      {
        date: "2023年12月6-7日",
        title: "大学職員のための生成AIコーディネーター養成講座",
        subtitle: "研修名：大学職員のための生成AIコーディネーター養成講座",
        description:
          "大学の現場で生成AI活用を推進する人材を育成プログラム。一泊二日にわたる包括的な研修で、日常業務における生成AI活用と組織体制の整備をインプット。修了生の多くは生成AIコーディネーターとして活躍中（金沢大学、滋賀大学、岐阜聖徳学園大学等）。",
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
        description:
          "実務で使えるプロンプト集を体系化。多数の大学（九州大学、立命館大学、北陸大学等）に引用され、大学業務における生成AI活用のスタンダードとして広く利用されています。",
        link: "https://promptforus.com/",
        image: "/prompt-guide.webp",
        tags: ["プロダクト", "論文・発表", "オープンソース"],
      },
      {
        date: "2024年8月27日",
        title: "大学業務における生成AI利活用セミナー",
        subtitle: "講演名：大学職員は生成AIを「実際に」活用できるのか",
        description:
          "日本マイクロソフトと佐賀大学が共催した実践的なセミナー。基調講演を担当",
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
        subtitle:
          "研修名：生成AI活用の本質的理解：大学DXを加速する「プロトタイプ起点業務」",
        description:
          "AIを「エイリアン・インテリジェンス（異質な知性）」として捉え、プロトタイプ思考で業務を変革する次世代の研修",
        organization: "金沢大学情報推進室",
        link: "https://note.com/pogohopper8/n/ne605cfd9b08b",
        image: "/kanazawa-dx-training.webp",
        tags: ["研修", "講演", "アドバイザリー"],
      },
      {
        date: "2025年10月27日",
        title: "プロトタイプ起点型の業務を体験しよう（ワークショップ）",
        subtitle: "ワークショップ名：プロトタイプ起点型の業務を体験しよう",
        description:
          "Google AI Studio「Build with Gemini」を活用した実践的ワークショップ。専門知識不要でWebアプリケーションのプロトタイプを構築し、全職員が当たり前に使える「思考ツール」としてのAI活用を体験",
        organization: "金沢大学情報推進室",
        link: "https://note.com/pogohopper8/n/n391a90174a5f",
        image: "/kanazawa-workshop.webp",
        tags: ["研修", "プロダクト", "教材開発"],
      },
    ],
  },
  // ---- ここから下に新しい年のブロックを追加 ----
  // {
  //   year: "2026年",
  //   items: [
  //     {
  //       date: "2026年●月●日",
  //       title: "タイトル",
  //       description: "説明文",
  //       organization: "主催",
  //       tags: ["研修"],
  //       link: "https://...",
  //       image: "/works/image.webp",
  //     },
  //   ],
  // },
];
