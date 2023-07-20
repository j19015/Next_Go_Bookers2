package main

import (
	"github.com/gin-gonic/gin"
	"context"
  "log"
	"github.com/j19015/Next_Go_Bookers2/ent"
	"github.com/j19015/Next_Go_Bookers2/ent/user"
	
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
			c.JSON(500, gin.H{"error": err.Error(),"messsage":"sign up succcessful"})
			return
		}
		// 保存したBookの情報をレスポンスとして返す。
		c.JSON(201, newUser)

	})

	//ユーザログイン機能
	router.POST("/sign_in",func(c *gin.Context){
		//ログインで送られてくるリクエストを型定義
		type SignInRequest struct{
			Email string `json:"email" binding:"required"`
			Password string `json:"password" binding:"required"`
		}

		//reqをSignInRequestで定義
		var req SignInRequest
		if err :=c.ShouldBindJSON(&req); err != nil{
			c.JSON(400, gin.H{"error": "Invalid request"})
      return
		}

		// ユーザの検索
		sign_in_user, err := client.User.Query().
			Where(user.EmailEQ(req.Email), user.PasswordEQ(req.Password)).
			First(context.Background())
		
		//エラーを返す
		if err != nil {
			c.JSON(401, gin.H{"error": "invalid credentials"})
			return
		}

		// ログイン成功
		c.JSON(200, gin.H{"message": "login successful", "user_id": sign_in_user.ID})

	})


	//本の新規登録
	router.POST("/books",func(c *gin.Context){
		//本の新規登録で送られてくるリクエストを型定義
		type  NewBookRequest struct{
			Title string `json:"title" binding:"required"`
			Body string `json:"body" binding:"required"`
			UserId int`json:"user_id" binding:"required"`
		}

		//reqをNewBookRequestで定義
		var req NewBookRequest
		if err:=c.ShouldBindJSON(&req); err!=nil{
			c.JSON(400,gin.H{"error":"Invalid request"})
		}

		//Bookを定義
		newBook,err:=client.Book.
				Create().
				SetTitle(req.Title).
				SetBody(req.Body).
				SetUserID(req.UserId).
				Save(context.Background())
	})

	// サーバーの開始
	router.Run(":8000")
}