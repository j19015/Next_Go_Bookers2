import React from 'react';
//ページ遷移
import Link from 'next/link';
//状態維持
import { useEffect, useState } from "react";

const Home = () => {

  //name,email,passwordをuseStateで定義
   const [name,SetName] = useState('')
   const [email,SetEmail] = useState('')
   const [password,SetPassword] = useState('')

  return (
    <>
      <h1>Sign up</h1>
      
    </>
  );
};

export default Home;