interface User{
  name: string;
  email: string;
  password: string;
}

interface ServerResponse{
  error: string;
  messeage: string;
}

export const signUpUser=async(user :User)=>{
  try{
    // POSTリクエストを使用してユーザー情報をサーバーに送信
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/sign_up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    // サーバーからのレスポンスを取得
    const data :ServerResponse = await response.json();

    // サーバーからのレスポンスに基づいて適切な処理を実行
    if (response.ok) {
      // 成功した場合の処理
      console.log('ユーザーの登録に成功しました！');
    } else {
      // エラーが発生した場合の処理
      console.error('ユーザーの登録に失敗しました。');
    }
  }catch(e){
    console.error('エラーが発生しました:', e);
  }
}