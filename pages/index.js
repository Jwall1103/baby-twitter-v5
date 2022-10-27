//imports
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from '../components/Login';
import Modal from '../components/Modal';
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";

//open home page
export default function Home({trendingResults, followResults, providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  
if (!session) return <Login providers={providers} />;

  return (
    <div className="">
      <Head>
        <title>Twitter </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed />
        {/* Widgets */}

        {isOpen && <Modal />}
      </main>
    </div>
  );
}

 //needs work. wanted to implement a fake "trending" tab but ran out of time
export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://api.npoint.io/f12291e59c8442b9027a").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://api.npoint.io/ebaa46a0fec3c3673680").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}