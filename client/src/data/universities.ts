// このファイルは works-data.ts から自動生成されます。
// 地図データを追加・変更したい場合は works-data.ts を編集してください。

import { works } from "./works-data";

export interface University {
  name: string;
  prefecture: string;
  prefectureCode: string;
  date: string;
  title: string;
}

// prefectureCode を持つ実績を地図用データに変換
export const universities: University[] = works
  .filter((w) => w.prefectureCode && w.university)
  .map((w) => ({
    name: w.university!,
    prefecture: w.prefectureName ?? "",
    prefectureCode: w.prefectureCode!,
    date: w.date,
    title: w.title,
  }));

// 都道府県コードごとにグループ化
export const universitiesByPrefecture = universities.reduce(
  (acc, uni) => {
    if (!acc[uni.prefectureCode]) {
      acc[uni.prefectureCode] = [];
    }
    acc[uni.prefectureCode].push(uni);
    return acc;
  },
  {} as Record<string, University[]>
);

// 実績のある都道府県コードのリスト
export const prefecturesWithUniversities = Object.keys(universitiesByPrefecture);
