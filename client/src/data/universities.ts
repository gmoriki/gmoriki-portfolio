export interface University {
  name: string;
  prefecture: string;
  prefectureCode: string;
  date: string;
  title: string;
}

export const universities: University[] = [
  // 2025年
  { name: "福島県立医科大学", prefecture: "福島県", prefectureCode: "7", date: "2025年12月18日", title: "大学教員のための生成AI基礎講座" },
  { name: "愛知教育大学", prefecture: "愛知県", prefectureCode: "23", date: "2025年9月24日", title: "大学授業での生成AI活用方法" },
  { name: "新潟大学", prefecture: "新潟県", prefectureCode: "15", date: "2025年9月19日", title: "AIと一緒に働こう！今日から始める生成AI入門セミナー in 新潟大学" },
  { name: "岐阜聖徳学園大学", prefecture: "岐阜県", prefectureCode: "21", date: "2025年9月10日", title: "生成AI入門業務活用編" },
  { name: "法政大学", prefecture: "東京都", prefectureCode: "13", date: "2025年9月5日", title: "教職員における生成AI入門" },
  { name: "岡山大学", prefecture: "岡山県", prefectureCode: "33", date: "2025年8月26日", title: "大学教職員のためのAIリテラシー基礎研修—今すぐ始めるAI活用で変わる働き方—" },
  { name: "早稲田大学アカデミックソリューション", prefecture: "東京都", prefectureCode: "13", date: "2025年7月23日", title: "大学職員のための生成AI活用講座—\"AIをともに育む当事者\"への第一歩—" },
  { name: "早稲田大学アカデミックソリューション", prefecture: "東京都", prefectureCode: "13", date: "2025年1月31日", title: "AIエージェントのコモディティ化と大学職員の生存戦略2030" },
  { name: "神戸大学", prefecture: "兵庫県", prefectureCode: "28", date: "2025年1月23日", title: "大学職員・URAのための生成AI基本講座" },
  { name: "立命館大学", prefecture: "京都府", prefectureCode: "26", date: "2025年1月20日", title: "生成AIサービス活用のノウハウとその先" },
  { name: "大学コンソーシアム大阪", prefecture: "大阪府", prefectureCode: "27", date: "2025年1月15日", title: "⽣成AI活⽤の基礎とプラクティス -2025年こそ⽣成AIを活⽤したい職員のために-" },
  { name: "崇城大学", prefecture: "熊本県", prefectureCode: "43", date: "2025年1月10日", title: "⼤学における⽣成AI活⽤⼊⾨" },
  { name: "大学コンソーシアムあきた", prefecture: "秋田県", prefectureCode: "5", date: "2025年1月9日", title: "⼤学における⽣成AI活⽤⼊⾨" },
  
  // 2024年
  { name: "広島大学", prefecture: "広島県", prefectureCode: "34", date: "2024年11月6日", title: "⼤学教育におけるAI利⽤の習熟度レベルと⽣成AI活⽤" },
  { name: "琉球大学", prefecture: "沖縄県", prefectureCode: "47", date: "2024年10月29日", title: "生成AIハンズオン研修" },
  { name: "金沢大学", prefecture: "石川県", prefectureCode: "17", date: "2024年10月27日", title: "令和7年度DX研修（生成AI活用（応用編））" },
  { name: "大学コンソーシアム大阪", prefecture: "大阪府", prefectureCode: "27", date: "2024年10月24日", title: "生成AIを頼れるパートナーに！大学職員のためのAI活用・習慣化講座" },
  { name: "龍谷大学", prefecture: "滋賀県", prefectureCode: "25", date: "2024年10月9日", title: "生成AIの活用方法と今後の可能性" },
  { name: "国立情報学研究所", prefecture: "東京都", prefectureCode: "13", date: "2024年10月3日", title: "大学職員の内省を促すAI「何でも相談おじいさん」開発の経緯と実装" },
  { name: "北九州市立大学", prefecture: "福岡県", prefectureCode: "40", date: "2024年9月26日", title: "大学教育における生成AI利用 実践編" },
  { name: "愛媛大学", prefecture: "愛媛県", prefectureCode: "38", date: "2024年9月24日", title: "大学業務における生成AI活用 初級編" },
  { name: "佐賀大学", prefecture: "佐賀県", prefectureCode: "41", date: "2024年8月27日", title: "大学職員は生成AIを「実際に」活用できるのか" },
  { name: "九州大学", prefecture: "福岡県", prefectureCode: "40", date: "2024年8月20日", title: "大学業務における生成AI活用の現在地 -実践編-" },
  { name: "茨城大学", prefecture: "茨城県", prefectureCode: "8", date: "2024年8月5日", title: "大学教育における生成AI活用 入門" },
  { name: "九州大学", prefecture: "福岡県", prefectureCode: "40", date: "2024年6月20日", title: "大学業務における生成AI活用の現在地 -基本編-" },
  { name: "大阪体育大学", prefecture: "大阪府", prefectureCode: "27", date: "2024年3月21日", title: "生成AIを活用できる大学教職員になる-基本と実践-" },
  { name: "桐生大学", prefecture: "群馬県", prefectureCode: "10", date: "2024年3月12日", title: "大学教職員に必要な生成AI利用のリテラシー" },
  { name: "広島大学", prefecture: "広島県", prefectureCode: "34", date: "2024年3月4日", title: "Copilotとして理解する生成AI利用の基本" },
  { name: "北九州市立大学", prefecture: "福岡県", prefectureCode: "40", date: "2024年2月28日", title: "大学教育における生成AI利用の対応" },
  { name: "美作大学", prefecture: "岡山県", prefectureCode: "33", date: "2024年2月15日", title: "テキスト生成AIの基本" },
  { name: "北陸大学", prefecture: "石川県", prefectureCode: "17", date: "2024年2月5日", title: "ハンズオンで理解する生成AI" },
  { name: "東京国際大学", prefecture: "東京都", prefectureCode: "13", date: "2024年1月24日", title: "これからの授業と生成AI" },
  
  // 2023年
  { name: "早稲田大学アカデミックソリューション", prefecture: "東京都", prefectureCode: "13", date: "2023年12月12日", title: "大学業務における生成AI利用の体系" },
  { name: "愛媛大学", prefecture: "愛媛県", prefectureCode: "38", date: "2023年12月6日", title: "大学業務における生成AI入門" },
  { name: "愛媛大学", prefecture: "愛媛県", prefectureCode: "38", date: "2023年9月29日", title: "生成AI利用の本質的理解―大学の授業のために―" },
  { name: "文京学院大学", prefecture: "東京都", prefectureCode: "13", date: "2023年7月11日", title: "生成AI時代における大学の現在地を探る" },
];

// 都道府県コードごとにグループ化
export const universitiesByPrefecture = universities.reduce((acc, uni) => {
  if (!acc[uni.prefectureCode]) {
    acc[uni.prefectureCode] = [];
  }
  acc[uni.prefectureCode].push(uni);
  return acc;
}, {} as Record<string, University[]>);

// 実績のある都道府県コードのリスト
export const prefecturesWithUniversities = Object.keys(universitiesByPrefecture);

// 統計情報
export const stats = {
  totalUniversities: universities.length,
  totalPrefectures: prefecturesWithUniversities.length,
};
