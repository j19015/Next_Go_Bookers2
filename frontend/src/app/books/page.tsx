import React from 'react';
//nextでページ遷移を行うため
import Link from 'next/link';
//Headerコンポーネとをimport
import Header from '@/components/base/Header/Header'

const Home = () => {
  return (
    <>
      <Header></Header>
      <h1>Book 一覧ページ</h1>
    </>
  );
};

export default Home;