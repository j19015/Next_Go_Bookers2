import React from 'react';
import Link from 'next/link';
import Header from '@/components/base/Header/Header';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto py-10">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-4xl font-semibold mb-6">Aboutページ</h1>
          <p className="text-lg font-medium text-gray-700 mb-8">
            このページは、ユーザ認証機能や本のCRUD（Create, Read, Update, Delete）が
            実装されたページです。
          </p>
          <p className="text-lg font-medium text-gray-700 mb-8">
            ユーザ認証により、ユーザごとにセキュリティが保持され、本のデータを操作できます。
          </p>
          <div className="flex space-x-4">
            <Link href="/users/sign_in" className="text-blue-500 hover:underline text-lg font-medium">
              ユーザ認証を試す
            </Link>
            <Link href="/books" className="text-blue-500 hover:underline text-lg font-medium">
              本のCRUDを試す
            </Link>
          </div>
          <p className="text-lg font-medium text-gray-700 mt-6">
            まずはユーザ認証でログインし、本のCRUD機能をお試しください。
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
