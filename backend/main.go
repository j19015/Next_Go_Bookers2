package main

import (
	"github.com/gin-gonic/gin"
	"context"
  "log"
	"github.com/j19015/Next_Go_Bookers2/ent"
	_ "github.com/lib/pq"
)

func main() {

	//PostgreSQLに接続
	client, err := ent.Open("postgres", "host=db port=5432 user=postgres dbname=bookers2 password=password sslmode=disable")

	if err != nil {
			log.Fatalf("failed opening connection to postgres: %v", err)
	}
	// Run the auto migration tool.
	if err := client.Schema.Create(context.Background()); err != nil {
			log.Fatalf("failed creating schema resources: %v", err)
	}

	//Ginフレームワークのデフォルトの設定を使用してルータを作成
	router := gin.Default()
	
	// ルートハンドラの定義
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello, World!",
		})
	})

	//ユーザ新規登録機能
	router.POST("/sign_up",func(c *gin.Context){
		//サインアップで送られてくるリクエストを型定義
		type SignUpRequest struct{
			Email string `json:"email" binding:"required"`
			Name string `json:"name" binding:"required"`
			Password string `json:"password" binding:"required"`
		}

		//reqをSignUpRequestで定義
		var req SignUpRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"error": "Invalid request"})
        return
    }

		//ユーザ登録
		newUser,err := client.User.
        Create().
        SetEmail(req.Email).
        SetName(req.Name).
        SetPassword(req.Password).
        Save(context.Background())

		//エラーの場合はエラーを返す。
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error(),"messsage":"本の保存ができませんでした。"})
			return
		}
		// 保存したBookの情報をレスポンスとして返す。
		c.JSON(201, newUser)

	})

	//ユーザログイン機能
	router.POST("/sign_in",func(c *gin.Context){
		//ログインで送られてくるリクエストを型定義
		type LoginRequest struct{
			Name string `json:"name" binding:"required"`
			Password string `json:"password" binding:"required"`
		}
	})

	// サーバーの開始
	router.Run(":8000")
}