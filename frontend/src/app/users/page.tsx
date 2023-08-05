"use client"

import React,{useEffect,useState} from 'react';
//nextでページ遷移を行うため
import Link from 'next/link';
//Headerコンポーネとをimport
import Header from '@/components/base/Header/Header'
//Userの型をimport
import { UserList,ResponseUser,ServerResponse } from '@/const/users/interface';
//getUserAllをimport
import { getUserAll } from '@/features/users/api/get_userAll';

const Home = () => {
  
  const [userAll,setUserAll] = useState<UserList | null>(null);

  const fetchUsers = async()=>{
    try{
      const res = await getUserAll();
      if ('error' in res){
        console.log("API error:",res.error);
      }else{
        setUserAll(res);
      }
    }catch(error){
      console.log("error",error);
    }
  }

  useEffect(()=>{
    fetchUsers();
  },[])

  return (
    <>
      <Header></Header>
      <h1>User 一覧ページ</h1>
    </>
  );
};

export default Home;