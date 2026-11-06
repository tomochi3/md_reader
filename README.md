# Markdown Reader

.md / .markdown ファイルを選択またはドロップして読む軽量アプリです。
見出し、リスト、リンク、コード、引用、表に対応。最大 10 MB、UTF-8 を想定しています。
ファイルの内容はブラウザ内だけで処理します。外部画像は読み込みません。

## Mac で開く（Intel / Apple Silicon 共通）

`index.html` または `md-reader.html` をダウンロードしてダブルクリックすると、Safari / Chrome で使えます。
Node.js、Python、サーバー起動は不要です。オフラインでも動きます。
GitHub では `md-reader.html` の「Download raw file」から保存してください。
開いた画面の「ファイルを開く」で読みたい `.md` を選択します。

## 開発用サーバーで起動

Node.js 20 以上と Python 3 を用意し、次を実行します。

```sh
npm ci
npm start
```

ブラウザでポート 8000 を開きます。ビルドや API キーは不要です。

## 確認

```sh
npm test
```

単体 HTML を再生成する場合は `node build.mjs` を実行してください。
