//クライアントサイドのレンダリングであることを伝える
"use client"

import React, { useEffect, useState, FormEvent } from 'react';
//nextでページ遷移を行うため
import Link from 'next/link';
//Headerコンポーネとをimport
import Header from '@/components/base/Header/Header'
//newBookをimort
import { getBook } from '@/features/books/api/get_book';
//updateBookをimport
import { updateBook } from '@/features/books/api/update_book';
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
  
  //bookを定義
  const [book,setBook] = useState<BookListItem | null>(null);
  //titleを定義
  const [title,setTitle] = useState('');
  //bodyを定義
  const [body,setBody] = useState('');

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
          setTitle(res.title);
          setBody(res.body);
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

  //handleUpdateを定義
  const handleUpdate = async(e: FormEvent<HTMLFormElement>) =>{
    //formの送信を阻止
    e.preventDefault();

    if(book){
      try{
        //idが文字であり、numberに変更した際にエラーにならないこと
        if (typeof id === "string" && !isNaN(Number(id))) {
          const res : BookListItem | ServerResponse = await updateBook({title: title,body: body,user_id: book?.user_id},Number(id))
          if ('error' in res){
            console.log("error",res.error);
          }else{
            console.log("本の更新に成功しました。");

            setBook(res);
          }
        }else{
          console.log("URLのidパラメータが不正です");
        }
      }catch(error){
        console.log("error",error)
      }

    }
  }

  useEffect(()=>{
    //ログイン確認
    fetchSession();
    //本の情報を取得
    fetchBook();
  },[])

  return (
    <>
      <Header></Header>

      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 rounded shadow-md'>
          <h1 className="text-3xl font-bold mb-6 text-black">Book 編集ページ</h1>
          <form onSubmit={handleUpdate}>
            <div className='mb-4'>
              <label className='text-black mb-1'>
                Title:
                <input
                  type="text"
                  value={title}
                  className="w-full border-2 border-gray-300 rounded-md p-2"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
            </div>
            <div className='mb-4'>
              <label className='text-black mb-1'>
                Body:
                <input
                  type="text"
                  value={body}
                  className="w-full border-2 border-gray-300 rounded-md p-2"
                  onChange={(e) => setBody(e.target.value)}
                />
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md px-4 py-2"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;