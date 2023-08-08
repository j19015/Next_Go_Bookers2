import Image from 'next/image'
//Headerコンポーネとをimport
import Header from '@/components/base/Header/Header'
//Linkタグをimport
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className="flex h-screen justify-center items-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-black">Welcome to Bookers2</h1>
          <p className="text-gray-600 mb-8">Please sign in or sign up to get started.</p>
          <div className="space-x-4">
            <Link href="/users/sign_in" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Sign In
            </Link>
            <Link href="/users/sign_up" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
