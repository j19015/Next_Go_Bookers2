//ログイン用
export interface User{
  email: string;
  password: string;
}
//ユーザ作成時用
export interface CreateUser extends User{
  name: string;
}
//response受け取る時用
export interface ResponseUser extends CreateUser{
  id: number;
}

//エラーメッセージ用のレスポンス
export interface ServerResponse{
  error: string;
  message: string;
}
