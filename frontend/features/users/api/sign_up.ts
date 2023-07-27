interface User{
  name: string;
  email: string;
  password: string;
}

interface CreateUser extends User{
  id: number;
}

interface ServerResponse{
  error: string;
  message: string;
}

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
      // 成功した場合の処理
      console.log('ユーザーの登録に成功しました！');
      // サーバーからのレスポンスを取得
      const data: CreateUser = await response.json();

      return data; // 正常なレスポンスの場合はデータを返す
    } else {
      // エラーが発生した場合の処理
      console.error('ユーザーの登録に失敗しました。');
      // サーバーからのレスポンスを取得
      const data: ServerResponse = await response.json();

      return data; // エラーレスポンスでもデータを返す（エラーメッセージが含まれる）
    }
  } catch (e :any) {
    // エラーが発生した場合の処理
    console.error('エラーが発生しました:', e);
    return { error: 'エラーが発生しました', message: e.message }; // エラーオブジェクトを返す
  }
};






