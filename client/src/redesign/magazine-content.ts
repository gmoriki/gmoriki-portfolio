export interface EditorialItem {
  id: string;
  kind: "note" | "slides" | "paper" | "tool" | "article";
  title: string;
  shortTitle?: string;
  description: string;
  date: string;
  href: string;
  image?: string;
  source: string;
  hrefLabel?: string;
}

// Titles, publication dates and destinations checked against the linked sources
// on 2026-09-20. Dates refer to publication (the J-STAGE entry uses its stated
// issue date). Event dates are kept separately in the activity index.
// Future events and unverified impact/view counts are intentionally excluded.
// Editorial selections are Moriki's own writing, slides and research. University
// news reports are linked only as evidence on the corresponding activity rows.
export const editorialItems: EditorialItem[] = [
  {
    id: "article-kyoiku-ai-organization",
    kind: "article",
    title: "生成AIの組織的な活用の事例",
    description:
      "連載「大学教育×生成AI」の最終回。大学の生成AI活用を、組織として進めるために。",
    date: "2026-02-25",
    href: "https://www.shidaikyo.or.jp/newspaper/back_number/3037.html",
    hrefLabel: "掲載情報を見る",
    source: "教育学術新聞 第3037号",
  },
  {
    id: "article-kyoiku-roundtable",
    kind: "article",
    title: "大学教育を再定義する―大学での生成AI利用を深掘りして考える",
    description:
      "生成AIが大学教育に投げかける問いを、四人の視点から考える。連載「大学教育×生成AI」を振り返る紙上座談会への参加。",
    date: "2026-05-20",
    href: "https://www.shidaikyo.or.jp/newspaper/back_number/3046.html",
    hrefLabel: "掲載情報を見る",
    source: "教育学術新聞 第3046号 / 紙上座談会",
  },
  {
    id: "note-profile-2026",
    kind: "note",
    title: "森木銀河の他己紹介",
    description:
      "人が問い、判断し、学び続けるための条件を考える。森木銀河の仕事とAIへの関心を、認識的行為者性から整理した紹介文。",
    date: "2026-08-29",
    href: "https://note.com/pogohopper8/n/nf166cd100e39",
    source: "note",
  },
  {
    id: "note-ai-training-development",
    kind: "note",
    title: "AI駆動でAI研修を開発した",
    description:
      "研修の設計から教材制作、当日の運営まで、AIと反復して組み立てる。大学職員向けの研修を開発した過程と試行を記録する。",
    date: "2026-07-26",
    href: "https://note.com/pogohopper8/n/n802571eef7d1",
    image:
      "https://assets.st-note.com/production/uploads/images/297824306/rectangle_large_type_2_b578f27da35809d140ca3ba0e2908000.png?fit=bounds&quality=85&width=1280",
    source: "note",
  },
  {
    id: "note-university-data-viewer",
    kind: "note",
    title: "大学の産学連携データ7年分を閲覧できるダッシュボードを作った",
    description:
      "大学の産学連携に関する公開データを、比較しながら読める形へ。7年分のデータを扱うダッシュボードの構想と使い方を紹介する。",
    date: "2026-04-19",
    href: "https://note.com/pogohopper8/n/ndeb86ae184cf",
    image:
      "https://assets.st-note.com/production/uploads/images/268589423/rectangle_large_type_2_452638089b4c6d365e7b0b832b9053f1.png?fit=bounds&quality=85&width=1280",
    source: "note",
  },
  {
    id: "note-mado",
    kind: "note",
    title: "Markdownを読み、共有するサービスを作った",
    description:
      "AIとのやり取りで増えるMarkdownを読み、他者へ渡しやすくする。閲覧と共有のために制作したサービス「mado」を紹介する。",
    date: "2026-03-15",
    href: "https://note.com/pogohopper8/n/nfd3b33269e7a",
    image:
      "https://assets.st-note.com/production/uploads/images/259326221/rectangle_large_type_2_ec6e4b9e2a1c36831b8722cbec60def0.png?fit=bounds&quality=85&width=1280",
    source: "note",
  },
  {
    id: "note-ai-relationship",
    kind: "note",
    title: "あとから効いてくるAIとの付き合い方",
    description:
      "企画を考え、異なる立場の声を聞き、自分の違和感を見つける。目先の効率化にとどまらない、AIとの四つの付き合い方を紹介する。",
    date: "2026-01-12",
    href: "https://note.com/pogohopper8/n/n6616108810c6",
    image:
      "https://assets.st-note.com/production/uploads/images/243235615/rectangle_large_type_2_ece79ada89ce516dc7e303f85d77c409.png?fit=bounds&quality=85&width=1280",
    source: "note",
  },
  {
    id: "note-uekibachi",
    kind: "note",
    title:
      "NotionAIと一緒に、大学職員のためのAI活用サイト「うえきばちポータル」🪴を作った",
    description:
      "大学職員向けのAI活用情報を集める「うえきばちポータル」。Notion AIとともにサイトを構築し、情報を整理する過程を紹介する。",
    date: "2026-01-01",
    href: "https://note.com/pogohopper8/n/nfba8a7056732",
    image:
      "https://assets.st-note.com/production/uploads/images/240344144/rectangle_large_type_2_811902457784c580a90463de4ff5261e.png?fit=bounds&quality=85&width=1280",
    source: "note",
  },
  {
    id: "article-sentankyo-judgment",
    kind: "article",
    title: "AIが実行する時代に大学は判断力をどう育てるか",
    description:
      "AIが仕事を実行する時代に、人と組織は何を判断するのか。大学のAI人材育成を考える寄稿。全文は有料公開。",
    date: "2026-09-01",
    href: "https://www.sentankyo.jp/articles/97d930bd-c8a8-462b-a71d-ff1ec8649a1b",
    source: "先端教育 2026年10月号",
  },
  {
    id: "article-college-management-ai",
    kind: "article",
    title: "教学DXを加速させる経営層のAI活用",
    description:
      "経営層自身がAIを使うことから、大学の変化を考える。『カレッジマネジメント』248号への寄稿。",
    date: "2026-04-10",
    href: "https://souken.shingakunet.com/higher/2026/04/post-3554.html",
    source: "リクルート カレッジマネジメント",
  },
  {
    id: "note-ai-governance",
    kind: "note",
    title: "大学職員のための生成AI最前線はAIガバナンスである",
    description:
      "人とAIの接点を大学組織としてどう設計するか。利用環境、権限、レビュー、知見の共有をつなぐための論考。",
    date: "2026-05-09",
    href: "https://note.com/pogohopper8/n/ne38a1584eac6",
    image:
      "https://assets.st-note.com/production/uploads/images/274215003/rectangle_large_type_2_1880ed5e5b6d3927a0845819df59b326.png?fit=bounds&quality=85&width=1280",
    source: "note",
  },
  {
    id: "slides-ai-governance",
    kind: "slides",
    title:
      "大学職員のための生成AI最前線：最前線を、AIガバナンスとして読み直すためのTips",
    description:
      "東京都市大学渋谷PXU公開講座の登壇資料。AIに任せる仕事の違いから、大学組織に必要な運用を考える。",
    date: "2026-05-09",
    href: "https://speakerdeck.com/gmoriki/da-xue-zhi-yuan-notamenosheng-cheng-aizui-qian-xian-zui-qian-xian-wo-aigabanansutositedu-mizhi-sutamenotips",
    image:
      "https://files.speakerdeck.com/presentations/94550666d41e4a3487140850fd187d38/slide_0.jpg?39350579",
    source: "Speaker Deck",
  },
  {
    id: "note-p4us-2026",
    kind: "note",
    title: "大学職員のためのプロンプトガイド2026",
    description:
      "P4Usの全面改修に込めた考え方と、公開教材の使い方。教職員が自分の仕事を言葉にしてAIを使うために。",
    date: "2026-02-14",
    href: "https://note.com/pogohopper8/n/nced249950cfc",
    image:
      "https://assets.st-note.com/production/uploads/images/251604882/rectangle_large_type_2_5446953b018b72a9bd2261cd6aad8310.png?fit=bounds&quality=85&width=1280",
    source: "note",
  },
  {
    id: "note-non-engineer",
    kind: "note",
    title: "「非エンジニア」は誰のための言葉なのか",
    description:
      "ひとつの呼称が覆い隠す、働く人それぞれの専門性。大学職員がAIを使う意味を、教育・事務・経営から問い直す。",
    date: "2026-02-11",
    href: "https://note.com/pogohopper8/n/n104fd0146499",
    image:
      "https://assets.st-note.com/production/uploads/images/250833938/rectangle_large_type_2_042b220d07ec7fa717478a875d023484.png?fit=bounds&quality=85&width=1280",
    source: "note",
  },
  {
    id: "slides-work-possibilities",
    kind: "slides",
    title: "生成AIの大学業務での新たな活用可能性を発見する",
    description:
      "東京大学の情報システムゼミにおける講演資料。Microsoft 365 Copilotの分析機能を扱う回から公開。",
    date: "2026-02-05",
    href: "https://speakerdeck.com/gmoriki/sheng-cheng-ainoda-xue-ye-wu-denoxin-tanahuo-yong-ke-neng-xing-wofa-jian-suru",
    image:
      "https://files.speakerdeck.com/presentations/ab910e11c1c8411ea6c57c937e0587c1/slide_0.jpg?38314704",
    source: "Speaker Deck",
  },
  {
    id: "note-prototype-work",
    kind: "note",
    title: "生成AIとプロトタイプ起点業務",
    description:
      "生成AIの出力をたたき台にして、考え、試し、仕事を組み直す。金沢大学での講演をもとにした論考。",
    date: "2025-11-27",
    href: "https://note.com/pogohopper8/n/ne605cfd9b08b",
    image:
      "https://assets.st-note.com/production/uploads/images/226243474/rectangle_large_type_2_087d404ca8db9448620c58b9a7f168cd.png?fit=bounds&quality=85&width=1280",
    source: "note",
  },
  {
    id: "slides-future-university",
    kind: "slides",
    title: "生成AIと歩むこれからの大学",
    description:
      "AI利用者を対象にした入門講座の公開資料。生成AIの基礎を踏まえ、大学での仕事と学びにどう向き合うかを考える。",
    date: "2024-12-20",
    href: "https://speakerdeck.com/gmoriki/sheng-cheng-aitobu-mukorekaranoda-xue",
    image:
      "https://files.speakerdeck.com/presentations/0bef1d9b61d64f9e964d7631fd04cd99/slide_0.jpg?33125127",
    source: "Speaker Deck",
  },
  {
    id: "paper-p4us",
    kind: "paper",
    title: "大学職員のためのプロンプトガイドの開発",
    description:
      "P4Usの開発を報告した論文。生成AI利用者、行為、AIの関係を整理し、大学における人材育成の方向性を考察。",
    date: "2024-11-08",
    href: "https://www.jstage.jst.go.jp/article/mjir/13/0/13_175_1/_article/-char/ja/",
    source: "J-STAGE / 大学情報・機関調査研究集会",
  },
  {
    id: "slides-ai-introduction",
    kind: "slides",
    title: "大学業務における生成AI入門",
    description:
      "日常業務でのAI活用から、組織体制の整備まで。愛媛大学の生成AIコーディネーター養成講座で用いた公開資料。",
    date: "2023-12-06",
    href: "https://speakerdeck.com/gmoriki/da-xue-ye-wu-niokerusheng-cheng-airu-men",
    image:
      "https://files.speakerdeck.com/presentations/877bd36e909a4788a3584a862333c5a3/slide_0.jpg?28160901",
    source: "Speaker Deck",
  },
];
