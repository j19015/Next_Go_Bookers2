//クライアントサイドのレンダリングであることを伝える
"use client"

import React, { useEffect, useState } from 'react';
//nextでページ遷移を行うため
import Link from 'next/link';
//Headerコンポーネとをimport
import Header from '@/components/base/Header/Header'
//getBookAllをimport
import { getBookAll } from '../../features/books/api/get_bookAll';
//interfaceをimport
import { BookList,BookListItem,ServerResponse} from "@/const/books/interface";

const Home = () => {

  const [bookAll,setBookAll]=useState<BookList>([])

  useEffect(() => {
    // ページがロードされた時に本の一覧を取得する
    fetchBooksAll();
  },[]);

  // 本の一覧を取得する関数
  const fetchBooksAll = async () => {
    try {
      //APIのレスポンセ鵜を取得
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

  return (
    <>
      <Header />
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 rounded shadow-md'>
          <h1 className="text-3xl font-bold my-4 text-black">Book 一覧ページ</h1>
          <table className='table-auto w-full text-black'>
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Body</th>
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