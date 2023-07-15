# ベースイメージを指定
FROM golang:latest

# コンテナ内の作業ディレクトリを設定
WORKDIR /app

# ローカルのソースコードをコンテナにコピー
COPY . .

# 必要なパッケージをインストールします
RUN go mod download

# アプリケーションをビルドします
RUN go build -o main .

# コンテナのポートを公開します
EXPOSE 8080

# アプリケーションを実行します
CMD ["go", "run", "main.go"]