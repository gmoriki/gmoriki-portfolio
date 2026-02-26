// ============================================================
// 実績データの追加方法
// ============================================================
//
// 【手順】
// 1. このファイル（works-data.ts）の works 配列に新しいオブジェクトを追記
// 2. git commit & push → GitHub Actions が自動ビルド・デプロイ（約1〜2分）
//    ※ GitHubのブラウザ上でファイルを直接編集→コミットでもOK（CLI不要）
//
// 【追加すると自動で反映されるもの】
//   - 件数カウント（講演・研修 / 論文・発表 / 社会貢献 / Works）
//   - 日本地図のハイライト（prefectureCode を入れた場合）
//   - 「主な実績」セクション（featured: true にした場合）
//
// 【フィールド説明】
//   date          : 表示用の日付文字列（例: "2025年11月15日"）
//   title         : タイトル（必須）
//   tags          : カテゴリ（件数集計に使用）
//                   → "講演" | "研修"  ：講演・研修件数に加算
//                   → "論文・発表"     ：論文・発表件数に加算
//                   → "社会貢献"       ：社会貢献活動件数に加算
//                   → "プロダクト"     ：Works件数に加算
//                   → "アドバイザリー" | "オープンソース" | "教材開発" は件数に非加算
//   university    : 大学・機関名（地図のツールチップに表示）
//   prefectureCode: 都道府県コード（入力すると地図に自動反映）
//   prefectureName: 都道府県名（表示用）
//   featured      : true にすると「主な実績」セクションに表示
//   description   : 説明文（featured: true のときに表示）
//   organization  : 主催・依頼元（university と異なる場合に入力）
//   subtitle      : 研修名・講演名などの正式名称
//   link          : 関連URL
//   image         : 画像パス（例: "/works/xx.webp"）
//                   → 画像は client/public/works/ フォルダに配置
//
// 【都道府県コード一覧（主なもの）】
//   1:北海道 2:青森 3:岩手 4:宮城 5:秋田 6:山形 7:福島
//   8:茨城 9:栃木 10:群馬 11:埼玉 12:千葉 13:東京 14:神奈川
//   15:新潟 16:富山 17:石川 18:福井 19:山梨 20:長野 21:岐阜
//   22:静岡 23:愛知 24:三重 25:滋賀 26:京都 27:大阪 28:兵庫
//   29:奈良 30:和歌山 31:鳥取 32:島根 33:岡山 34:広島 35:山口
//   36:徳島 37:香川 38:愛媛 39:高知 40:福岡 41:佐賀 42:長崎
//   43:熊本 44:大分 45:宮崎 46:鹿児島 47:沖縄
//
// ============================================================

export interface WorkItem {
  date: string;
  title: string;
  tags: string[];
  // 地図フィールド
  university?: string;
  prefectureCode?: string;
  prefectureName?: string;
  // 主な実績セクション
  featured?: boolean;
  description?: string;
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

// ============================================================
// 全実績データ（works配列）
// ここに追記するだけで件数・地図・主な実績が自動更新されます
// ============================================================
export const works: WorkItem[] = [

  // ---- 2019年 ----

  {
    date: "2019年3月",
    title: "理科教育と科学史分野における研究の展開に対する考察",
    organization: "修士論文",
    tags: ["論文・発表"],
  },

  // ---- 2022年 ----

  {
    date: "2022年11月",
    title: "学内研究分野ネットワーク可視化システムの開発",
    organization: "第11回大学情報・機関調査研究集会",
    tags: ["論文・発表"],
  },

  // ---- 2023年 ----

  {
    date: "2023年2月",
    title: "jsonkeysearch",
    description: "JSONファイルのキーを検索するPythonパッケージ。PyPI公開。",
    link: "https://pypi.org/project/jsonkeysearch/",
    tags: ["プロダクト"],
  },
  {
    date: "2023年4月",
    title: "excel-data-splitter",
    description: "Excelファイルを指定列でデータ分割するPythonツール。",
    link: "https://github.com/gmoriki/excel-data-splitter",
    tags: ["プロダクト"],
  },
  {
    date: "2023年5月",
    title: "C4RA Python勉強会資料",
    description: "大学リサーチアドミニストレーター向けPythonプログラミング勉強会資料。",
    tags: ["プロダクト"],
  },

  {
    date: "2023年",
    title: "国内大学の生成AIポリシー データベース公開",
    description:
      "国内大学の生成AIに関するポリシーやガイドラインを体系的にまとめたデータベース。2023年3月から2024年9月までリアルタイムに更新。多数の論文やリサーチペーパー、大学HP（東北大学等）に参考資料として引用されています",
    link: "https://docs.google.com/spreadsheets/d/1cDOqaIdu9JKOYuF0ThG33oixE09m210z/edit#gid=1530250804",
    image: "/policy-database.webp",
    tags: ["プロダクト", "論文・発表", "オープンソース"],
    featured: true,
  },
  {
    date: "2023年7月11日",
    title: "生成AI時代における大学の現在地を探る",
    university: "文京学院大学",
    prefectureCode: "13",
    prefectureName: "東京都",
    tags: ["講演"],
  },
  {
    date: "2023年8月9日",
    title: "研究力分析の高度化に向けた自主的なプログラミング勉強会の取り組み",
    organization: "RA協議会第9回年次大会",
    tags: ["講演"],
  },
  {
    date: "2023年9月2日",
    title: "生成AIの現在地：大学運営における現状認識から活用まで",
    organization: "大学行政管理学会第27回定期総会・研究集会",
    tags: ["講演"],
  },
  {
    date: "2023年9月3日",
    title: "大学の事務業務における生成AI導入のための思考的枠組みに関する考察",
    organization: "大学行政管理学会第27回定期総会・研究集会",
    tags: ["講演"],
  },
  {
    date: "2023年9月29日",
    title: "生成AI利用の本質的理解―大学の授業のために―",
    university: "愛媛大学",
    prefectureCode: "38",
    prefectureName: "愛媛県",
    tags: ["講演"],
  },
  {
    date: "2023年11月",
    title: "IRではデータ収集がどのように実施・認識されてきたのか",
    organization: "第12回大学情報・機関調査研究集会",
    tags: ["論文・発表"],
  },
  {
    date: "2023年11月",
    title: "ユネスコによる教育・研究における生成AI利用ガイダンス",
    organization: "カレントアウェアネス-E (MISC)",
    tags: ["論文・発表"],
  },
  {
    date: "2023年11月19日",
    title: "大学IRにおける生成AI利用の試み",
    organization: "第12回大学情報・機関調査研究集会",
    tags: ["講演"],
  },
  {
    date: "2023年12月6-7日",
    title: "大学職員のための生成AIコーディネーター養成講座",
    subtitle: "研修名：大学職員のための生成AIコーディネーター養成講座",
    description:
      "大学の現場で生成AI活用を推進する人材を育成プログラム。一泊二日にわたる包括的な研修で、日常業務における生成AI活用と組織体制の整備をインプット。修了生の多くは生成AIコーディネーターとして活躍中（金沢大学、滋賀大学、岐阜聖徳学園大学等）。",
    university: "愛媛大学",
    organization: "愛媛大学教育企画室",
    prefectureCode: "38",
    prefectureName: "愛媛県",
    tags: ["研修"],
    featured: true,
  },
  {
    date: "2023年12月12日",
    title: "大学業務における生成AI利用の体系",
    university: "早稲田大学アカデミックソリューション",
    prefectureCode: "13",
    prefectureName: "東京都",
    tags: ["講演"],
  },

  // ---- 2024年 ----

  {
    date: "2024年",
    title: "大学職員のためのプロンプトガイド開発",
    description:
      "実務で使えるプロンプト集を体系化。多数の大学（九州大学、立命館大学、北陸大学等）に引用され、大学業務における生成AI活用のスタンダードとして広く利用されています。",
    link: "https://promptforus.com/",
    image: "/prompt-guide.webp",
    tags: ["プロダクト", "論文・発表", "オープンソース"],
    featured: true,
  },
  {
    date: "2024年1月24日",
    title: "これからの授業と生成AI",
    university: "東京国際大学",
    prefectureCode: "13",
    prefectureName: "東京都",
    tags: ["講演"],
  },
  {
    date: "2024年2月5日",
    title: "ハンズオンで理解する生成AI",
    university: "北陸大学",
    prefectureCode: "17",
    prefectureName: "石川県",
    tags: ["研修"],
  },
  {
    date: "2024年2月15日",
    title: "テキスト生成AIの基本",
    university: "美作大学",
    prefectureCode: "33",
    prefectureName: "岡山県",
    tags: ["研修"],
  },
  {
    date: "2024年2月17日",
    title: "大学職員のためのChatGPTハンズオンの会",
    university: "愛媛大学",
    organization: "愛媛大学教育企画室 教職員能力開発拠点",
    prefectureCode: "38",
    prefectureName: "愛媛県",
    tags: ["社会貢献"],
  },
  {
    date: "2024年2月28日",
    title: "大学教育における生成AI利用の対応",
    university: "北九州市立大学",
    prefectureCode: "40",
    prefectureName: "福岡県",
    tags: ["講演"],
  },
  {
    date: "2024年3月4日",
    title: "Copilotとして理解する生成AI利用の基本",
    university: "広島大学",
    prefectureCode: "34",
    prefectureName: "広島県",
    tags: ["講演"],
  },
  {
    date: "2024年3月12日",
    title: "大学教職員に必要な生成AI利用のリテラシー",
    university: "桐生大学",
    prefectureCode: "10",
    prefectureName: "群馬県",
    tags: ["研修"],
  },
  {
    date: "2024年3月14日",
    title: "生成AIとURA業務：活用のための視点",
    organization: "RA協議会 スキルプログラム専門委員会",
    tags: ["社会貢献"],
  },
  {
    date: "2024年3月21日",
    title: "生成AIを活用できる大学教職員になる-基本と実践-",
    university: "大阪体育大学",
    prefectureCode: "27",
    prefectureName: "大阪府",
    tags: ["研修"],
  },
  {
    date: "2024年6月20日",
    title: "大学業務における生成AI活用の現在地 -基本編-",
    university: "九州大学",
    prefectureCode: "40",
    prefectureName: "福岡県",
    tags: ["研修"],
  },
  {
    date: "2024年8月5日",
    title: "大学教育における生成AI活用 入門",
    university: "茨城大学",
    prefectureCode: "8",
    prefectureName: "茨城県",
    tags: ["研修"],
  },
  {
    date: "2024年8月",
    title: "大学の管理運営業務における生成AI利用",
    organization: "IDE現代の高等教育 No.663",
    tags: ["論文・発表"],
  },
  {
    date: "2024年8月20日",
    title: "大学業務における生成AI活用の現在地 -実践編-",
    university: "九州大学",
    prefectureCode: "40",
    prefectureName: "福岡県",
    tags: ["研修"],
  },
  {
    date: "2024年8月27日",
    title: "大学業務における生成AI利活用セミナー",
    subtitle: "講演名：大学職員は生成AIを「実際に」活用できるのか",
    description: "日本マイクロソフトと佐賀大学が共催した実践的なセミナー。基調講演を担当",
    university: "佐賀大学",
    organization: "日本マイクロソフト、佐賀大学共催",
    prefectureCode: "41",
    prefectureName: "佐賀県",
    tags: ["講演"],
    featured: true,
  },
  {
    date: "2024年9月4日",
    title: "大学業務の観点から生成AI利用を考える",
    university: "大学コンソーシアムひょうご神戸",
    prefectureCode: "28",
    prefectureName: "兵庫県",
    tags: ["講演"],
  },
  {
    date: "2024年9月18日",
    title: "業務のための画像/テキスト生成AI入門",
    university: "学校法人東放学園",
    prefectureCode: "13",
    prefectureName: "東京都",
    tags: ["研修"],
  },
  {
    date: "2024年9月20日",
    title: "Difyを活用した「内省支援」エージェント開発の所感",
    organization: "福岡生成AI活用Meetup Vol.1",
    prefectureCode: "40",
    prefectureName: "福岡県",
    tags: ["社会貢献"],
  },
  {
    date: "2024年9月24日",
    title: "大学業務における生成AI活用 初級編",
    university: "愛媛大学",
    prefectureCode: "38",
    prefectureName: "愛媛県",
    tags: ["研修"],
  },
  {
    date: "2024年9月26日",
    title: "大学教育における生成AI利用 実践編",
    university: "北九州市立大学",
    prefectureCode: "40",
    prefectureName: "福岡県",
    tags: ["講演"],
  },
  {
    date: "2024年10月3日",
    title: "大学職員の内省を促すAI「何でも相談おじいさん」開発の経緯と実装",
    university: "国立情報学研究所",
    prefectureCode: "13",
    prefectureName: "東京都",
    tags: ["講演"],
  },
  {
    date: "2024年10月9日",
    title: "生成AIの活用方法と今後の可能性",
    university: "龍谷大学",
    prefectureCode: "25",
    prefectureName: "滋賀県",
    tags: ["講演"],
  },
  {
    date: "2024年10月24日",
    title: "生成AIを頼れるパートナーに！大学職員のためのAI活用・習慣化講座",
    university: "大学コンソーシアム大阪",
    prefectureCode: "27",
    prefectureName: "大阪府",
    tags: ["研修"],
  },
  {
    date: "2024年10月27日",
    title: "令和6年度DX研修（生成AI活用（応用編））",
    university: "金沢大学",
    prefectureCode: "17",
    prefectureName: "石川県",
    tags: ["研修"],
  },
  {
    date: "2024年10月29日",
    title: "生成AIハンズオン研修",
    university: "琉球大学",
    prefectureCode: "47",
    prefectureName: "沖縄県",
    tags: ["研修"],
  },
  {
    date: "2024年11月6日",
    title: "大学教育におけるAI利用の習熟度レベルと生成AI活用",
    university: "広島大学",
    prefectureCode: "34",
    prefectureName: "広島県",
    tags: ["講演"],
  },
  {
    date: "2024年11月",
    title: "大学職員のためのプロンプトガイドの開発",
    organization: "第13回大学情報・機関調査研究集会",
    tags: ["論文・発表"],
  },
  {
    date: "2024年11月18日",
    title: "いともたやすく行われる地味なAI活用",
    organization: "福岡生成AI活用Meetup Vol.2",
    prefectureCode: "40",
    prefectureName: "福岡県",
    tags: ["社会貢献"],
  },
  {
    date: "2024年11月25日",
    title: "大学業務に今日から使える生成AI入門！まずは触ってみる勉強会",
    organization: "学校広報ソーシャルメディア活用勉強会",
    tags: ["社会貢献"],
  },
  {
    date: "2024年12月6日",
    title: "生成AI活用は(今のところ)だいたいプログラミング",
    university: "熊本大学",
    organization: "熊本大学 生成AIを活用した業務効率化勉強会",
    prefectureCode: "43",
    prefectureName: "熊本県",
    tags: ["社会貢献"],
  },
  {
    date: "2024年12月9日",
    title: "2024年にやたら耳にしたAIエージェントって結局何よ",
    organization: "福岡生成AI活用Meetup Vol.3",
    prefectureCode: "40",
    prefectureName: "福岡県",
    tags: ["社会貢献"],
  },
  {
    date: "2024年12月12日",
    title: "大学職員の内省を促すAIエージェントの試行的開発",
    organization: "大学ICT推進協議会（AXIES）2024年度年次大会",
    tags: ["講演"],
  },
  {
    date: "2024年12月13日",
    title: "大学事務における生成AIの活用方法",
    university: "愛知県私立大学教務研究会",
    prefectureCode: "23",
    prefectureName: "愛知県",
    tags: ["講演"],
  },
  {
    date: "2024年12月18日",
    title: "大学職員/URAのためのMicrosoft Copilot活用セミナー",
    organization: "勉強会「生成AIとURA業務」・日本マイクロソフト・株式会社ギブリー",
    tags: ["社会貢献"],
  },
  {
    date: "2024年12月19日",
    title: "生成AI時代のすでに変わった世界とこれから変わる組織",
    organization: "佐賀ロータリークラブ",
    prefectureCode: "41",
    prefectureName: "佐賀県",
    tags: ["社会貢献"],
  },
  {
    date: "2024年12月20日",
    title: "生成AIと歩むこれからの大学",
    organization: "SPOD（四国地区大学教職員能力開発ネットワーク）",
    university: "愛媛大学（SPOD）",
    prefectureCode: "38",
    prefectureName: "愛媛県",
    tags: ["講演"],
  },

  // ---- 2025年 ----

  {
    date: "2025年1月9日",
    title: "大学における生成AI活用入門",
    university: "大学コンソーシアムあきた",
    prefectureCode: "5",
    prefectureName: "秋田県",
    tags: ["研修"],
  },
  {
    date: "2025年1月10日",
    title: "大学における生成AI活用入門",
    university: "崇城大学",
    prefectureCode: "43",
    prefectureName: "熊本県",
    tags: ["研修"],
  },
  {
    date: "2025年1月15日",
    title: "生成AI活用の基礎とプラクティス -2025年こそ生成AIを活用したい職員のために-",
    university: "大学コンソーシアム大阪",
    prefectureCode: "27",
    prefectureName: "大阪府",
    tags: ["研修"],
  },
  {
    date: "2025年1月20日",
    title: "生成AIサービス活用のノウハウとその先",
    university: "立命館大学",
    prefectureCode: "26",
    prefectureName: "京都府",
    tags: ["講演"],
  },
  {
    date: "2025年1月23日",
    title: "大学職員・URAのための生成AI基本講座",
    university: "神戸大学",
    prefectureCode: "28",
    prefectureName: "兵庫県",
    tags: ["研修"],
  },
  {
    date: "2025年1月31日",
    title: "AIエージェントのコモディティ化と大学職員の生存戦略2030",
    university: "早稲田大学アカデミックソリューション",
    prefectureCode: "13",
    prefectureName: "東京都",
    tags: ["講演"],
  },
  {
    date: "2025年7月23日",
    title: "大学職員のための生成AI活用講座—\"AIをともに育む当事者\"への第一歩—",
    university: "早稲田大学アカデミックソリューション",
    prefectureCode: "13",
    prefectureName: "東京都",
    tags: ["研修"],
  },
  {
    date: "2025年8月7日",
    title: "AI-Readyな人材を育成することについて",
    organization: "全国情報技術教育研究会",
    tags: ["講演"],
  },
  {
    date: "2025年8月26日",
    title: "大学教職員のためのAIリテラシー基礎研修—今すぐ始めるAI活用で変わる働き方—",
    university: "岡山大学",
    prefectureCode: "33",
    prefectureName: "岡山県",
    tags: ["研修"],
  },
  {
    date: "2025年9月5日",
    title: "教職員における生成AI入門",
    university: "法政大学",
    prefectureCode: "13",
    prefectureName: "東京都",
    tags: ["研修"],
  },
  {
    date: "2025年9月5日",
    title: "生成AIの基本講座・リスク",
    organization: "大学評価・IR担当者集会2025",
    tags: ["講演"],
  },
  {
    date: "2025年9月10日",
    title: "生成AI入門業務活用編",
    university: "岐阜聖徳学園大学",
    prefectureCode: "21",
    prefectureName: "岐阜県",
    tags: ["研修"],
  },
  {
    date: "2025年9月19日",
    title: "AIと一緒に働こう！今日から始める生成AI入門セミナー in 新潟大学",
    university: "新潟大学",
    prefectureCode: "15",
    prefectureName: "新潟県",
    tags: ["講演", "研修"],
  },
  {
    date: "2025年9月24日",
    title: "大学授業での生成AI活用方法",
    university: "愛知教育大学",
    prefectureCode: "23",
    prefectureName: "愛知県",
    tags: ["講演"],
  },
  {
    date: "2025年10月24日",
    title: "生成AIを頼れるパートナーに！大学職員のためのAI活用・習慣化講座",
    university: "大学コンソーシアム大阪",
    prefectureCode: "27",
    prefectureName: "大阪府",
    tags: ["研修"],
  },
  {
    date: "2025年10月27日",
    title: "金沢大学 令和7年度DX研修（生成AI活用（応用編））",
    subtitle: "研修名：生成AI活用の本質的理解：大学DXを加速する「プロトタイプ起点業務」",
    description:
      "AIを「エイリアン・インテリジェンス（異質な知性）」として捉え、プロトタイプ思考で業務を変革する次世代の研修",
    university: "金沢大学",
    organization: "金沢大学情報推進室",
    prefectureCode: "17",
    prefectureName: "石川県",
    link: "https://note.com/pogohopper8/n/ne605cfd9b08b",
    image: "/kanazawa-dx-training.webp",
    tags: ["研修", "講演", "アドバイザリー"],
    featured: true,
  },
  {
    date: "2025年10月27日",
    title: "プロトタイプ起点型の業務を体験しよう（ワークショップ）",
    subtitle: "ワークショップ名：プロトタイプ起点型の業務を体験しよう",
    description:
      "Google AI Studio「Build with Gemini」を活用した実践的ワークショップ。専門知識不要でWebアプリケーションのプロトタイプを構築し、全職員が当たり前に使える「思考ツール」としてのAI活用を体験",
    university: "金沢大学",
    organization: "金沢大学情報推進室",
    prefectureCode: "17",
    prefectureName: "石川県",
    link: "https://note.com/pogohopper8/n/n391a90174a5f",
    image: "/kanazawa-workshop.webp",
    tags: ["研修", "プロダクト", "教材開発"],
    featured: true,
  },
  {
    date: "2025年12月18日",
    title: "大学教員のための生成AI基礎講座",
    university: "福島県立医科大学",
    prefectureCode: "7",
    prefectureName: "福島県",
    tags: ["研修"],
  },

  // ---- 2026年 ----

  {
    date: "2026年2月6日",
    title: "大学業務への生成AIの活かし方 — Microsoft 365 Copilot分析機能編 —",
    university: "東京大学",
    organization: "東京大学 情報システムゼミ",
    prefectureCode: "13",
    prefectureName: "東京都",
    tags: ["講演"],
  },
  {
    date: "2026年2月18日",
    title: "都留文科大学における教育現場の生成AI活用入門",
    university: "都留文科大学",
    organization: "都留文科大学 FD研修",
    prefectureCode: "19",
    prefectureName: "山梨県",
    tags: ["研修"],
  },

  // ---- ここから下に新しい実績を追加 ----
  // {
  //   date: "2026年●月●日",
  //   title: "タイトル",
  //   university: "○○大学",
  //   prefectureCode: "13",
  //   prefectureName: "東京都",
  //   tags: ["研修"],
  //   featured: false,
  // },
];

// ============================================================
// 以下は自動計算（編集不要）
// ============================================================

// タグから件数を自動集計
export function computeStats(workItems: WorkItem[]): StatItem[] {
  let lecture = 0, paper = 0, social = 0, product = 0;
  for (const w of workItems) {
    if (w.tags.some((t) => t === "講演" || t === "研修")) lecture++;
    if (w.tags.includes("論文・発表")) paper++;
    if (w.tags.includes("社会貢献")) social++;
    if (w.tags.includes("プロダクト")) product++;
  }
  return [
    { label: "論文・発表", value: paper, suffix: "件" },
    { label: "講演・研修", value: lecture, suffix: "件" },
    { label: "社会貢献活動", value: social, suffix: "件" },
    { label: "Works(作品等)", value: product, suffix: "件" },
  ];
}

// featured: true の実績を年別グループに自動変換（WorksStats で使用）
export function getNotableWorks(): YearGroup[] {
  const featured = works.filter((w) => w.featured);
  const yearMap = new Map<string, WorkItem[]>();
  for (const item of featured) {
    const match = item.date.match(/(\d{4})年/);
    if (!match) continue;
    const key = `${match[1]}年`;
    if (!yearMap.has(key)) yearMap.set(key, []);
    yearMap.get(key)!.push(item);
  }
  return Array.from(yearMap.entries()).map(([year, items]) => ({ year, items }));
}
