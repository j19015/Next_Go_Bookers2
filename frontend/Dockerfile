# ベースイメージを指定します
FROM node:16-alpine

# 作業ディレクトリを設定します
WORKDIR /app

# キャッシュ利用で効率化するために別でコピー
COPY package.json package-lock.json ./

# ソースコードをコピーします
COPY . .

# 依存関係をインストールします
RUN npm install

# アプリケーションをビルドします
RUN npm run build

# ポート番号を指定します（必要に応じて変更してください）
EXPOSE 3000

# アプリケーションを起動します
CMD ["npm","run","dev"]
