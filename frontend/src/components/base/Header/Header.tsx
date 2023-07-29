//クライアントサイドのレンダリングであることを伝える
"use client";

import React,{useState,useEffect} from 'react';
//Linkコンポーネントをimport
import Link from 'next/link';
//session情報を取得
import { sessionConfirm } from '@/features/users/api/session';
//sign_outの処理をimport
import { SignOut } from '@/features/users/api/sign_out';
const Header = () => {


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const session_user=sessionConfirm()
    session_user ? setIsLoggedIn(true): setIsLoggedIn(false);
  },[])

  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-xl font-bold">Bookers2</h1>
          <nav>
            <ul className="flex space-x-4 text-white">
              {/* セッションがある場合 */}
              {isLoggedIn ? (
                <>
                  <li>
                    <Link href="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/books">
                      Books
                    </Link>
                  </li>
                  <li>
                    <Link href="/users">
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link href="/users/sign_out">
                      Sign Out
                    </Link>
                  </li>
                </>
              ) : (
                // セッションがない場合
                <>
                  <li>
                    <Link href="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/users/sign_up">
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link href="/users/sign_in">
                      Sign In
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
