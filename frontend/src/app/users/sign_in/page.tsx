//クライアントサイドのレンダリングを明記
"use client";

import React from 'react';
//nextでページ遷移を行うため
import Link from 'next/link';
//状態維持
import { useState,FormEvent } from 'react';
//SignInUserをimport
import { signInUser } from '@/features/users/api/sign_in';
//レスポンス用のinterfaceをimport
import { ResponseUser,ServerResponse } from '../../../const/users/interface';



const Home = () => {
  //emailとpasswordを定義
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  //form submitの処理
  const handlesubmit=async(e: FormEvent<HTMLFormElement>)=>{
    //formのデフォルト送信を防止
    e.preventDefault();
    //signInUserを実行
    const res: ResponseUser | ServerResponse = await signInUser({email,password});
    // ここでサーバーにユーザー情報を送信するなどの処理を行う
    if ('error' in res) {
      // エラーが発生した場合
      console.error('ユーザーのログインに失敗しました。');
      console.error('Error:', res.error);
    } else {
      // エラーが発生しなかった場合（正常なレスポンスの場合）
      console.log('ユーザーのログインに成功しました！');
      console.log('User:', res);
    }
  }

  return (
    <>
      <h1>ログインページ</h1>
    </>
  );
};

export default Home;