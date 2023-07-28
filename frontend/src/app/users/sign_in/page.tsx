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
  //nameとpasswordを定義
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');

  //form submitの処理
  const handlesubmit=async(e: FormEvent<HTMLFormElement>)=>{

  }

  return (
    <>
      <h1>ログインページ</h1>
    </>
  );
};

export default Home;