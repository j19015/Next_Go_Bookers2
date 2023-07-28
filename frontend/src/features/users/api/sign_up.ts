import { User,ResponseUser,ServerResponse } from '../../../const/users/interface';

export const signUpUser=async(user :User)=>{
  try{
    // POSTリクエストを使用してユーザー情報をサーバーに送信
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/sign_up`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(user),
    });

    // サーバーからのレスポンスに基づいて適切な処理を実行
    if (response.ok) {
      // サーバーからのレスポンスを取得
      const data: ResponseUser = await response.json();
      return data; // 正常なレスポンスの場合はデータを返す

    } else {
      // サーバーからのレスポンスを取得
      const data: ServerResponse = await response.json();
      return data; // エラーレスポンスでもデータを返す（エラーメッセージが含まれる）
    }
  } catch (e :any) {
    return { error: 'エラーが発生しました', message: e.message }; // エラーオブジェクトを返す
  }
};






