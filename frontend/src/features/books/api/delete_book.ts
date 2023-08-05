import { BookListItem,ServerResponse} from "@/const/books/interface";

export const deleteBook=async(id: number)=>{
  try{
    // POSTリクエストを使用してユーザー情報をサーバーに送信
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      credentials: 'include',
    });

    // サーバーからのレスポンスを返す
    const data: ServerResponse = await response.json();
    return data;

  } catch (e :any) {
    return { error: 'エラーが発生しました', message: e.message }; // エラーオブジェクトを返す
  }
};






