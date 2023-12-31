// Book登録用
export interface Book{
  title: string;
  body: string;
  user_id: number;
}

// Book一覧取得用のitem用
export interface BookListItem extends Book {
  id: number;
  created_at: Date;
  updated_at: Date;
}

// Book一覧取得用
export type BookList = BookListItem[];

//エラーメッセージ用のレスポンス
export interface ServerResponse{
  error: string;
  message: string;
}

