//クライアントサイドのレンダリングを明記
"use client";

import React from 'react';
// Next.js の useRouter フックを使用する
import { useRouter } from 'next/navigation'; 
//nextでページ遷移を行うため
import Link from 'next/link';
//状態維持
import { useState,FormEvent,useEffect } from 'react';
//SignInUserをimport
import { signInUser } from '@/features/users/api/sign_in';
//レスポンス用のinterfaceをimport
import { ResponseUser,ServerResponse } from '../../../const/users/interface';
//セッションを受け取る関数をimport
import { sessionConfirm } from '@/features/users/api/session';
//Headerコンポーネとをimport
import Header from '@/components/base/Header/Header'

const Home = () => {
  //emailとpasswordを定義
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // useRouterフックを初期化
  const router = useRouter(); 

  useEffect(() => {
    const session = sessionConfirm();
    if(session){
      console.log("既にログインしています。", session);
      //books一覧へ飛ばす
      router.push("/books")
    }
  }, [router]);

  //form submitの処理
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //formのデフォルト送信を防止
    e.preventDefault();
    //signInUserを実行
    const res: ResponseUser | ServerResponse = await signInUser({ email, password });
    // ここでサーバーにユーザー情報を送信するなどの処理を行う
    if ('error' in res) {
      // エラーが発生した場合
      console.error('ユーザーのログインに失敗しました。');
      console.error('Error:', res.error);
    } else {
      // エラーが発生しなかった場合（正常なレスポンスの場合）
      console.log('ユーザーのログインに成功しました！');
      // ログイン成功の場合、セッション情報をlocalStorageに保存
      localStorage.setItem('session', JSON.stringify(res));
      console.log('User:', res);
      // ログイン成功後に '/books' ページにリダイレクト
      router.push('/books');
    }
  };

  return (
    <>
      <Header></Header>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 rounded shadow-md w-96'>
          <h1 className='text-3xl font-bold mb-6 text-black'>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='text-black mb-1'>
                Email:
                <input
                  type="email"
                  value={email}
                  className='w-full border-2 border-gray-300 rounded-md p-2'
                  onChange={(e)=>setEmail(e.target.value)}
                >
                </input>
              </label>
            </div>
            <div className='mb-4'>
              <label className='text-black mb-1'>
                Password:
                <input
                  type="password"
                  value={password}
                  className='w-full border-2 border-gray-300 rounded-md p-2'
                  onChange={(e)=>{setPassword(e.target.value)}}
                >
                </input>
              </label>
            </div>
            <div>
              <button
                type='submit'
                className='bg-blue-500 text-white rounded-md px-4 py-2'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
