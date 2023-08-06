import React, { useState } from 'react';
//nextでページ遷移を行うため
import Link from 'next/link';
//Headerコンポーネとをimport
import Header from '@/components/base/Header/Header'
//User型をimport
import { ResponseUser, ServerResponse } from '@/const/users/interface';
//URLパラメータ取得用
import { useParams } from 'next/navigation';
//getUserをimport
import { getUser } from '@/features/users/api/get_user';


const Home = () => {

  //user情報を格納するようの変数
  const [user,setUser] = useState<ResponseUser | null>(null);
  //URLパラメータ取得
  const params = useParams();
  //idを抽出
  const {id} = params;

  const fetchUser = async () => {
    try{
      if(id && isNaN(Number(id))){
        const res :ResponseUser | ServerResponse= await getUser(Number(id));
        if ('error' in res){
          console.log("error",res.error);
        }else{

        }
      }else{
        console.log("error","そのユーザは存在しません。");
      }
    }catch(error){
      console.log("error:",error);
    }
  }
  

  return (
    <>
      <Header></Header>
      <h1>User 詳細ページ</h1>
    </>
  );
};

export default Home;