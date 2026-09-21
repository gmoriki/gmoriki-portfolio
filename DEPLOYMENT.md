# gmoriki.com の公開手順

準備日: 2026-09-21。今回の対象は `gmoriki/gmoriki-portfolio` → **https://gmoriki.com/** の GitHub Pages。別リポジトリの `gmoriki.github.io/ginga-moriki/` は対象外。

## 公開する内容

- `/`: 新しいトップページ
- `/works/`: Works、記事・講演資料、研修サイト、活動一覧
- `/profile/`: 本人写真、現在の活動、経歴、学歴、個人的な関心
- ページ別のタイトル・説明・canonical・SNS共有情報、1200×630の共有画像、サイトマップ、robots.txt、404ページ

本番入口は `client/site/` と `client/src/public-site.tsx`、ビルド設定は `vite.site.config.ts`。公開画像とページ情報は `site-manifest.json` に限定して管理する。出力は `dist/public/`。比較ページ、制作資料、元画像、ログは配信対象に含めない。

共有画像は `site-manifest.json` の `socialImage` で管理する。ビルド時に画像内容のハッシュを付けたURLを生成し、全ページのOGP・X用メタ情報に設定する。旧URLも同じ新画像を配信する。トップの写真やロゴを変更するときは、共有画像とその説明文も合わせて確認する。プロフィール本文の写真は共有画像とは別に扱う。

従来の `/works` は `/works/` へ移動する。旧Worksの5種類の `#section-*`、トップの `#expertise`、旧404が生成した `/?redirect=/works` を新ページの対応箇所へ案内する。存在しないURLは404とし、トップへの一律転送はしない。

## ローカル検証

Node.js 22 と package.json に指定した pnpm 10.4.1 を使う。

```sh
pnpm install --frozen-lockfile
pnpm run check:site
pnpm run build:client
pnpm run preview:site
```

プレビュー: http://127.0.0.1:4184/ 。`build:client` は配信ファイル、必須画像、metadata、サイトマップ、比較用URLの混入を検査する。4183番の比較用プレビューと、4173番の別サイトは維持する。

`pnpm run build` も新しい本番用クライアントを生成する。GitHub Pagesではサーバーのビルド・起動は不要。旧フルスタック用の `pnpm dev` は本番プレビューではない。

## 公開するとき

**準備時点ではコミット・push・デプロイを実行していない。** `main` へのpushで `.github/workflows/deploy.yml` が自動公開するため、公開指示を得てから実行する。

1. `git status --short` と差分を再確認する。元からあった制作物・未追跡ファイルをまとめて追加しない。
2. `scripts/site-release-files.txt` に列挙したファイルのみを対象に、内容を確認して1つのリリースコミットへまとめる。この一覧は新サイトの構築に必要な追加・変更ファイルであり、既存の追跡済み依存ファイルはそのまま使う。
3. Node.js 22で上記の型チェック・本番ビルドを通し、公開用プレビューを確認する。
4. 公開指示の範囲でmainへpushし、GitHub Actions「Deploy to GitHub Pages」のbuild/deploy両方の成功を確認する。
5. 公開後に `/`、`/works/`、`/profile/`、未知のURLの404、`/sitemap.xml`、SNS画像、旧URLの移動を確認する。

公開ファイルを確認して追加するためのコマンド例（公開指示の後に実行）:

```sh
git add --pathspec-from-file=scripts/site-release-files.txt
git diff --cached --check
git diff --cached --stat
git diff --cached
```

## 差し戻すとき

準備開始時のmainは `77b27cfa5ed214bfe2057e98823d4a299f03b1ef`。新サイトを1コミットにまとめ、問題があればそのリリースコミットを `git revert` した通常のコミットで差し戻す。公開指示を確認してpushし、Actionsの再公開を確認する。履歴を書き換えるforce-pushや、作業ツリーのresetは使わない。

## 確認範囲と外部依存

ローカルの本番成果物と実ブラウザを検証する。GitHub ActionsでのLinux実行、DNS、HTTPS、本番キャッシュは公開後に確認する。

記事の画像とGoogle Fontsは外部配信を利用する。北海道大学の講演サイトは、講演実施前のため掲載を取り下げている。公開済みの教材サイト3件をWorksに掲載する。外部サイト自体の権限や公開設定は変更しない。

検証記録・スクリーンショット・成果物のSHA-256一覧はローカルの `.agent-work/deploy-prep-20260921/` に保存する。これらはリリースコミットと公開ビルドに含めない。
