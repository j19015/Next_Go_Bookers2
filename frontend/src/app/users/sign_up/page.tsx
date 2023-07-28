//クライアントサイドのレンダリングであることを伝える
"use client";

import React from 'react';
//ページ遷移
import Link from 'next/link';
//状態維持
import { useState,FormEvent  } from "react";
//signUpUserをimport
import { signUpUser } from '../../../features/users/api/sign_up';

import { User,CreateUser,ServerResponse } from '../../../const/users/interface';

const Home = () => {

  //name,email,passwordをuseStateで定義
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  //form submit時の処理
  const handleSubmit=async(e: FormEvent<HTMLFormElement>)=>{
    //formのデフォルトの送信を防止
    e.preventDefault();
    //signUpUserを実行
    const res: CreateUser | ServerResponse = await signUpUser({name,email,password});
    // ここでサーバーにユーザー情報を送信するなどの処理を行う
    if ('error' in res) {
      // エラーが発生した場合
      console.error('ユーザーの登録に失敗しました。');
      console.error('Error:', res.error);
    } else {
      // エラーが発生しなかった場合（正常なレスポンスの場合）
      console.log('ユーザーの登録に成功しました！');
      console.log('User:', res);
    }
  }

  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 rounded shadow-md w-96'>
          <h1 className="text-3xl font-bold mb-6 text-black">Sign up</h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='text-black mb-1'>
                Name:
                <input
                  type="text"
                  value={name}
                  className="w-full border-2 border-gray-300 rounded-md p-2"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div className='mb-4'>
              <label className='text-black mb-1'>
                Email:
                <input
                  type="email"
                  value={email}
                  className="w-full border-2 border-gray-300 rounded-md p-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className='mb-4'>
              <label className='text-black mb-1'>
                Password:
                <input
                  type="password"
                  value={password}
                  className="w-full border-2 border-gray-300 rounded-md p-2"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2"
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