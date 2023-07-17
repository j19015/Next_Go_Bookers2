package main

import (
	"github.com/gin-gonic/gin"
	"context"
  "log"
	"github.com/j19015/Next_Go_Bookers2/ent"
	_ "github.com/lib/pq"
)

func main() {
	//Ginフレームワークのデフォルトの設定を使用してルータを作成
	router := gin.Default()
	
	// ルートハンドラの定義
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello, World!",
		})
	})

	// サーバーの開始
	router.Run(":8000")
}