package main

import (
	"github.com/gin-gonic/gin"
	"context"
  "log"
	"github.com/j19015/Next_Go_Bookers2/ent"
	"github.com/j19015/Next_Go_Bookers2/ent/user"
	
	_ "github.com/lib/pq"
	"strconv"
)

//Bookの型定義
type Book struct {
	Title string `json:"title"`
	Body  string `json:"body"`
}

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

	// CORS設定
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		if c.Request.Method == "OPTIONS" {
				c.AbortWithStatus(200)
				return
		}
		c.Next()
	})
	
	// ルートハンドラの定義
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello, World!",
		})
	})

	//ユーザ新規登録機能
	router.POST("users/sign_up",func(c *gin.Context){
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
			c.JSON(500, gin.H{"error": err.Error(),"messsage":"sign up missing"})
			return
		}
		// 保存したBookの情報をレスポンスとして返す。
		c.JSON(201, gin.H{"session_user": newUser})

	})

	//ユーザログイン機能
	router.POST("users/sign_in",func(c *gin.Context){
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
		c.JSON(200, gin.H{"session_user": sign_in_user})

	})

	//ユーザ一覧取得機能
	router.GET("/users",func(c *gin.Context){
		//User一覧を取得する
		users,err:=client.User.Query().All(context.Background())
		if err!=nil{
			c.JSON(500,gin.H{"error": err.Error(),"message" : "Could user get the User list."})
			return
		}
		//booksをjson形式で返す
		c.JSON(200, users)
	})

	//ユーザ情報取得機能
	router.GET("/users/:id",func(c *gin.Context){
		//URLパラメータからidを取得
		userIDStr:=c.Param("id")
		//数値に変換
		userID,err :=strconv.Atoi(userIDStr)
		//パラメータが不正な場合はエラーを出力して終了
		if err != nil {
			c.JSON(400,gin.H{"error": "Invalid User ID"})
			return
		}
		
		// GETは主キーの検索の時だけ使える
		//context.Backgroud()は非同期用みたいな感じ
		user, err := client.User.Get(context.Background(), userID)

		if err != nil {
			c.JSON(404,gin.H{"error": err.Error(),"message":"User with specified id not found"})
			return
		}

		// 本の情報をJSON形式でレスポンスとして返す
		c.JSON(200, user)
	})

	// ユーザ情報編集機能
	router.PATCH("/users/:id",func(c *gin.Context){

		// 編集で送られてくるリクエストを型定義
		type EditRequest struct{
			Email string `json:"email" binding:"required"`
			Name string `json:"name" binding:"required"`
			Password string `json:"password" binding:"required"`
		}

		// reqをEditRequestで定義
		var req EditRequest
		if err :=c.ShouldBindJSON(&req); err != nil{
			c.JSON(400, gin.H{"error": "Invalid request"})
      return
		}

		// URLパラメータからidを取得
		userIDStr:=c.Param("id")
		//数値に変換
		userID,err:=strconv.Atoi(userIDStr)
		// パラメータが不正な場合はエラーを返して終了
		if err!=nil{
			c.JSON(400,gin.H{"error": "Invalid User ID"})
		}

		// 指定されたIDのユーザをデータベースからクエリする
		// GETは主キーの検索の時だけ使える
		// context.Backgroud()は非同期用みたいな感じ
		update_user, err := client.User.
				UpdateOneID(userID).
				SetEmail(req.Email).
				SetName(req.Name).
				SetPassword(req.Password).
				Save(context.Background())
		
		// エラーならエラーを返して終了
		if err != nil {
			c.JSON(404, gin.H{"error": err.Error(),"message":"User Couldn't update"})
			return
		}
	
		// 本の情報をJSON形式でレスポンスとして返す
		c.JSON(200, update_user)
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
		
		//エラーがある場合はエラーを返して終了
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error(),"message":"create book missing"})
			return
		}
	
		// 保存したBookの情報をレスポンスとして返す
		c.JSON(201, newBook)
	})

	//本の情報を取得
	router.GET("/books/:id",func(c *gin.Context){
		//URLパラメータから本のIDを取得する。
		bookIDStr:=c.Param("id")
		bookID,err :=strconv.Atoi(bookIDStr)
		//パラメータが不正な場合はエラーを出力して終了
		if err != nil {
			c.JSON(400,gin.H{"error": "Invalid Book ID"})
			return
		}
		// 指定されたIDの本をデータベースからクエリする
		// GETは主キーの検索の時だけ使える
		//context.Backgroud()は非同期用みたいな感じ
		book, err := client.Book.Get(context.Background(), bookID)

		if err != nil {
			c.JSON(404,gin.H{"error": err.Error(),"message":"Book with specified id not found"})
			return
		}

		// 本の情報をJSON形式でレスポンスとして返す
		c.JSON(200, book)

	})

	//本の一覧を取得
	router.GET("/books",func(c *gin.Context){

		//Book一覧を取得する
		books,err:=client.Book.Query().All(context.Background())
		if err!=nil{
			c.JSON(500,gin.H{"error": err.Error(),"message":"Could not get the book list."})
			return
		}

		//booksをjson形式で返す
		c.JSON(200, books)
	})

	//本情報を更新する。
	router.PATCH("/books/:id",func(c *gin.Context){

		//引数で値を受け取るように型を定義
		var book Book

		//bookに受け取った値を格納
		if err:=c.ShouldBindJSON(&book);err!=nil{
			c.JSON(400,gin.H{"error": err.Error(),"message":"Invalid Book ID"})
			return
		}
		
		//URLパラメータから本のIDを取得
		bookIDStr:=c.Param("id")
		bookID,err:=strconv.Atoi(bookIDStr)
		if err!=nil{
			c.JSON(400,gin.H{"error": err.Error(),"message":"could not translation string->int"})
			return
		}
		// 指定されたIDの本をデータベースからクエリする
		// GETは主キーの検索の時だけ使える
		//context.Backgroud()は非同期用みたいな感じ
		update_book, err := client.Book.
				UpdateOneID(bookID).
				SetTitle(book.Title).
				SetBody(book.Body).
				Save(context.Background())
		
		//エラーならエラーを返して終了
		if err != nil {
			c.JSON(404, gin.H{"error": err.Error(),"message":"Couldn't update"})
			return
		}
	
		// 本の情報をJSON形式でレスポンスとして返す
		c.JSON(200, update_book)
	})

	//本を削除
	router.DELETE("/books/:id",func(c *gin.Context){
		// URLパラメータから本のIDを取得する
		bookIDStr := c.Param("id")
		bookID, err := strconv.Atoi(bookIDStr)
		if err != nil {
				c.JSON(400, gin.H{"error": "Invalid Book ID"})
				return
		}

		// 指定されたIDの本をデータベースからクエリする
		//context.Backgroud()は非同期用みたいな感じ
		err = client.Book.DeleteOneID(bookID).Exec(context.Background())


		if err != nil {
			c.JSON(404, gin.H{"error": "Failed to delete"})
			return
		}

		// 本の情報をJSON形式でレスポンスとして返す
		c.JSON(200, gin.H{"message": "Delete completed"})
		})
		
	// サーバーの開始
	router.Run(":8000")
}
