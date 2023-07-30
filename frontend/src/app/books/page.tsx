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
    fetchBooks();
  },[]);

  // 本の一覧を取得する関数
  const fetchBooks = async () => {
    try {
      //APIのレスポンセ鵜を取得
      const res: BookList | ServerResponse = await getBookAll();
       // resの内容を表示
      console.log('APIのレスポンス:', res);
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
      <Header></Header>
      <h1>Book 一覧ページ</h1>
    </>
  );
};

export default Home;