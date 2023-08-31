"use client"

import React, { useEffect, useState } from 'react';
//nextでページ遷移を行うため
import Link from 'next/link';
//Headerコンポーネとをimport
import Header from '@/components/base/Header/Header'
//User型をimport
import { ResponseUser, ServerResponse } from '@/const/users/interface';
//URLパラメータ取得用
import { useParams,useRouter } from 'next/navigation';
//getUserをimport
import { getUser } from '@/features/users/api/get_user';


const Home = () => {

  //user情報を格納するようの変数
  const [user,setUser] = useState<ResponseUser | null>(null);
  //URLパラメータ取得
  const params = useParams();
  //idを抽出
  const {id} = params;
  //routerを定義
  const router = useRouter();

  //Userを取得する関数
  const fetchUser = async () => {
    try{
      if(id && !isNaN(Number(id))){
        const res :ResponseUser | ServerResponse = await getUser(Number(id));
        if ('error' in res){
          console.log("error",res.error);
        }else{
          setUser(res);
          console.log("User情報の取得が成功しました。")
        }
      }else{
        console.log("error","そのユーザは存在しません。");
      }
    }catch(error){
      console.log("error:",error);
    }
  }
  
  useEffect(()=>{
    fetchUser();
  },[])

  return (
    <>
      <Header></Header>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 rounded shadow-md'>
          <h1 className="text-3xl font-bold mb-6 text-black">User詳細ページ</h1>
          <div className='mb-4'>
            <label className='text-black mb-1'>
              ID:
              <p className="w-full border-2 border-gray-300 rounded-md p-2">{user?.id}</p>
            </label>
          </div>
          <div className='mb-4'>
            <label className='text-black mb-1'>
              Email:
              <p className="w-full border-2 border-gray-300 rounded-md p-2">{user?.email}</p>
            </label>
          </div>
          <div className='mb-4'>
            <label className='text-black mb-1'>
              Name:
              <p className="w-full border-2 border-gray-300 rounded-md p-2">{user?.name}</p>
            </label>
          </div>
          <div className='mb-4'>
            <label className='text-black mb-1'>
              Password:
              <p className="w-full border-2 border-gray-300 rounded-md p-2">*********</p>
            </label>
          </div>
          <div className='mb-4'>
            <label className='text-black mb-1'>
              Created_at:
              <p className="w-full border-2 border-gray-300 rounded-md p-2">{user?.created_at}</p>
            </label>
          </div>
          <div className='mb-4'>
            <label className='text-black mb-1'>
              Updated_at:
              <p className="w-full border-2 border-gray-300 rounded-md p-2">{user?.updated_at}</p>
            </label>
          </div>
          <div className='flex justify-between'>
            <div className="mt-4">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded" onClick={() => router.push("/users")}>Back</button>
            </div>
            <div className="mt-4">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300" onClick={() => router.push(`/users/${id}/edit`)}>Edit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;