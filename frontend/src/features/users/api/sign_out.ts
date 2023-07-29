//next routerをimport
import { useRouter } from 'next/router';

export const SignOut=()=>{
  //session情報を削除
  localStorage.removeItem('session');
  // Next.js の useRouter フックを使用して、ページ遷移を行う
  const router = useRouter();
  // サインアウト後に '/' ページに遷移する
  router.push('/');
}