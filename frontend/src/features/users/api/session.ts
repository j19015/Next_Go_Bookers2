import { ResponseUser } from "@/const/users/interface";

//sessionの確認
export const sessionConfirm=()=>{
  // セッション情報がlocalStorageに保存されているか確認
  const sessionData = localStorage.getItem('session');
  if(sessionData){
     // JSON形式の文字列をJavaScriptオブジェクトに変換
    const session: ResponseUser = JSON.parse(sessionData);
    return session;
  }else{
    return null;
  }
}

