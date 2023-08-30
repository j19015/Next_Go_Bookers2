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
//interfaceからmessageをimport
import { message } from '../../const/message/interface';

const Home = () => {
  
  const [userAll,setUserAll] = useState<UserList | null>(null);

  //メッセージ用の変数を定義
  const [message,setMessage]=useState<message | null>(null);

  const fetchUsers = async()=>{
    try{
      const res = await getUserAll();
      if ('error' in res){
        console.log("API error:",res.error);
      }else{
        setUserAll(res);
        console.log(res);
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
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 rounded shadow-md'>
        <h1 className="text-3xl font-bold mb-6 text-black">User一覧</h1>
        <table className='table-auto w-full text-black'>
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Password</th>
              <th className="px-4 py-2">Created_at</th>
              <th className="px-4 py-2">Updated_at</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {
              userAll && userAll.length > 0 ? (
                userAll.map((user) => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">
                      <Link href={`/users/${user.id}`} className='text-cyan-600 border-b-2 border-cyan-500'>{user.email}</Link>
                    </td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">*******</td>
                    <td className="border px-4 py-2">{user.created_at}</td>
                    <td className="border px-4 py-2">{user.updated_at}</td>
                    <td className="border px-4 py-2">
                      <Link href={`/users/${user.id}/edit`} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Edit</Link>
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