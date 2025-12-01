export interface University {
  name: string;
  prefecture: string;
  lat: number;
  lng: number;
  year: number;
  event: string;
}

export const universities: University[] = [
  // 北海道・東北
  { name: "秋田県内大学", prefecture: "秋田県", lat: 39.7186, lng: 140.1024, year: 2025, event: "大学コンソーシアムあきた" },
  { name: "新潟大学", prefecture: "新潟県", lat: 37.9161, lng: 139.0364, year: 2025, event: "SD研修" },
  
  // 関東
  { name: "早稲田大学", prefecture: "東京都", lat: 35.7090, lng: 139.7197, year: 2025, event: "大学ITマネジメントセミナー" },
  { name: "法政大学", prefecture: "東京都", lat: 35.6950, lng: 139.7514, year: 2025, event: "FD・SDワークショップ" },
  { name: "文京学院大学", prefecture: "東京都", lat: 35.7362, lng: 139.7282, year: 2023, event: "講演" },
  
  // 中部
  { name: "金沢大学", prefecture: "石川県", lat: 36.5447, lng: 136.7039, year: 2024, event: "DX研修（生成AI活用）" },
  { name: "岐阜聖徳学園大学", prefecture: "岐阜県", lat: 35.3912, lng: 136.7223, year: 2025, event: "FD研修会" },
  { name: "愛知教育大学", prefecture: "愛知県", lat: 35.0283, lng: 137.0689, year: 2025, event: "全学FD講演会" },
  
  // 近畿
  { name: "立命館大学", prefecture: "京都府", lat: 35.0286, lng: 135.7817, year: 2025, event: "私立大学キャンパスシステム研究会" },
  { name: "龍谷大学", prefecture: "京都府", lat: 34.9667, lng: 135.7667, year: 2024, event: "FD研修会" },
  { name: "大阪府内大学", prefecture: "大阪府", lat: 34.6937, lng: 135.5023, year: 2025, event: "大学コンソーシアム大阪" },
  { name: "神戸大学", prefecture: "兵庫県", lat: 34.7275, lng: 135.2347, year: 2025, event: "研究マネジメント人材研修会" },
  
  // 中国
  { name: "岡山大学", prefecture: "岡山県", lat: 34.6851, lng: 133.9191, year: 2025, event: "鹿田医療系キャンパス合同FD" },
  { name: "広島大学", prefecture: "広島県", lat: 34.4000, lng: 132.7167, year: 2024, event: "AL研修会" },
  
  // 四国
  { name: "愛媛大学", prefecture: "愛媛県", lat: 33.8378, lng: 132.7667, year: 2024, event: "生成AIコーディネーター養成講座" },
  { name: "四国地区大学", prefecture: "香川県", lat: 34.0658, lng: 134.0594, year: 2024, event: "SPODオンラインセミナー" },
  
  // 九州・沖縄
  { name: "九州大学", prefecture: "福岡県", lat: 33.5952, lng: 130.2181, year: 2024, event: "大学教職員職能開発FD" },
  { name: "佐賀大学", prefecture: "佐賀県", lat: 33.2433, lng: 130.3000, year: 2024, event: "生成AI利活用セミナー" },
  { name: "熊本大学", prefecture: "熊本県", lat: 32.8067, lng: 130.7083, year: 2024, event: "業務効率化勉強会" },
  { name: "崇城大学", prefecture: "熊本県", lat: 32.8667, lng: 130.7500, year: 2025, event: "FD講演会" },
  { name: "琉球大学", prefecture: "沖縄県", lat: 26.2478, lng: 127.7625, year: 2024, event: "ITスキルハンズオン研修会" },
];
