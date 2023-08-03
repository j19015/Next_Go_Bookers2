//クライアントサイドのレンダリングであることを伝える
"use client"

import React, { useEffect, useState, FormEvent } from 'react';
//nextでページ遷移を行うため
import Link from 'next/link';
//Headerコンポーネとをimport
import Header from '@/components/base/Header/Header'
//getBookAllをimport
import { getBookAll } from '../../features/books/api/get_bookAll';
//newBookをimort
import { newBook } from '@/features/books/api/new_book';
//interfaceをimport
import { Book,BookList,BookListItem,ServerResponse} from "@/const/books/interface";
//ResponseUserをimport
import { ResponseUser } from '@/const/users/interface';
//sessionを取得する関数をimport
import { sessionConfirm } from '@/features/users/api/session';
// Next.js の useRouter フックを使用する
import { useRouter } from 'next/navigation'; 
//Book型をimport

const Home = () => {

  //本作成用
  const [title,setTitle]=useState('');
  const [body,setBody]=useState('');
  const [session_user,SetSession]=useState<ResponseUser | null>(null)

  // useRouterフックを初期化
  const router = useRouter(); 

  const [bookAll,setBookAll]=useState<BookList>([])

  useEffect(() => {
    //sessionをAPIで取得
    const session : ResponseUser | null = sessionConfirm();
    // sessionの情報を保存する
    getSession(session);
    
    if(!session){
      //sign_inへ飛ばす
      router.push("/users/sign_in")
    }
    // ページがロードされた時に本の一覧を取得する
    fetchBooksAll();
  },[]);

  //sessionを取得
  const getSession = async(session: ResponseUser | null)=>{
    SetSession(session);
  } 

  // 本の一覧を取得する関数
  const fetchBooksAll = async () => {
    try {
      //APIのレスポンスを取得
      const res: BookList | ServerResponse = await getBookAll();
       // resの内容を表示
      console.log('API:', res);
      //errorがあった場合の処理
      if ('error' in res) {
        console.error('本の一覧を取得できませんでした。');
        console.error('Error:', res.error);
      } else {
        // 取得した本の一覧をstateに設定する
        setBookAll(res);
      }
    } catch (error) {
      //処理中のエラー処理
      console.error('本の一覧を取得できませんでした。');
      console.error('Error:', error);
    }
  };

  //本を作成
  const handleSubmit=async(e: FormEvent<HTMLFormElement>)=>{
    //formのデフォルト送信を防止
    e.preventDefault();
    try{
      if (session_user){
        //APIレスポンスを取得
        const res: Book | ServerResponse= await newBook({title: title,body: body,user_id: session_user.id})
        // 本が作成された後、本の一覧を再取得する
        await fetchBooksAll();
      }
      
    }catch(error){
      //処理中のエラー処理
      console.error('本の一覧を取得できませんでした。');
      console.error('Error:', error);
    }
  }

  return (
    <>
      <Header />
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 rounded shadow-md'>
        <h1 className="text-3xl font-bold mb-6 text-black">新規登録</h1>
          <form onSubmit={handleSubmit}>
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
                Submit
              </button>
            </div>
          </form>
          <h1 className="text-3xl font-bold my-4 text-black">Book 一覧ページ</h1>
          <table className='table-auto w-full text-black'>
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Body</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {
                bookAll.length > 0 ? (
                  bookAll.map((book) => (
                    <tr key={book.id}>
                      <td className="border px-4 py-2">{book.title}</td>
                      <td className="border px-4 py-2">{book.body}</td>
                      <td className="border px-4 py-2">{book.user_id}</td>
                      <td className="border px-4 py-2">
                        <Link href="/">
                          <span className="text-blue-500">Show</span>
                        </Link>
                      </td>
                      <td className="border px-4 py-2">
                        <Link href="/">
                          <span className="text-green-500">Edit</span>
                        </Link>
                      </td>
                      <td className="border px-4 py-2">
                        <Link href="/">
                          <span className="text-red-500">Delete</span>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="border px-4 py-2" colSpan={5}>
                      Loading...
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;