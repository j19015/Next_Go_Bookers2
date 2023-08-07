//クライアントサイドのレンダリングであることを伝える
"use client"

import React, { useEffect, useState, FormEvent } from 'react';
//nextでページ遷移を行うため
import Link from 'next/link';
//Headerコンポーネとをimport
import Header from '@/components/base/Header/Header'
//newBookをimort
import { getBook } from '@/features/books/api/get_book';
//interfaceをimport
import { BookListItem,ServerResponse} from "@/const/books/interface";
//ResponseUserをimport
import { ResponseUser } from '@/const/users/interface';
//sessionを取得する関数をimport
import { sessionConfirm } from '@/features/users/api/session';
// Next.js の useRouter フックを使用する
import { useParams, useRouter } from 'next/navigation';


const Home = () => {
  //routerを定義
  const router = useRouter();
  //URLパラメータ取得用のparamsを定義
  const params = useParams()
  //paramsからidを抜き出し
  const {id} = params;
  
  //title,bodyを定義
  const [book,setBook] = useState<BookListItem | null>(null);

  //fetchBookを定義
  const fetchBook = async() => {
    try {
      //idが文字であり、numberに変更した際にエラーにならないこと
      if (typeof id === "string" && !isNaN(Number(id))) {

        const res: BookListItem | ServerResponse = await getBook(Number(id));     

        if ('error' in res) {
          console.error('Error fetching book data:', res.error);
        } else {
          setBook(res);
        }
      }
    }catch(error){
      console.log("error",error);
    }
  }

  //fetchSession
  const fetchSession = async() => {
    try{
      const res : ResponseUser | null = await sessionConfirm();

      if (!res){
        router.push("/users/sign_in");
      }

    }catch(error){
      console.log("error",error)
    }
  }

  useEffect(()=>{
    fetchSession();
    fetchBook();
  },[])

  return (
    <>
      <Header></Header>

      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 rounded shadow-md'>
          <h1 className="text-3xl font-bold mb-6 text-black">Book 詳細ページ</h1>
          <div className='mb-4'>
            <label className='text-black mb-1'>
              Title:
              <p className="w-full border-2 border-gray-300 rounded-md p-2">{book?.title}</p>
            </label>
          </div>
          <div className='mb-4'>
            <label className='text-black mb-1'>
              Body:
              <p className="w-full border-2 border-gray-300 rounded-md p-2">{book?.body}</p>
            </label>
          </div>
          <div className="mt-4">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded" onClick={() => router.push("/books")}>Back</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;