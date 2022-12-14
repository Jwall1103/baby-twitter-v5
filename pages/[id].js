  //imports
  import { collection, doc, onSnapshot, orderBy, query } from "@firebase/firestore";
  import { getProviders, getSession, useSession } from "next-auth/react";
  import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import { useRecoilState } from "recoil";
  import { modalState } from "../atoms/modalAtom";
  import Modal from "../components/Modal";
  import Sidebar from "../components/Sidebar";
  import Tweet from "../components/Tweet";
  import Login from "../components/Login";
  import { db } from "../firebase";
  import { ArrowLeftIcon } from "@heroicons/react/24/solid";
  import Comment from "../components/Comment";
  import Head from "next/head";
  
  //create page for each tweet when it's clicked on
  function TweetPage({ trendingResults, followResults, providers }) {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [tweet, setTweet] = useState();
    const [comments, setComments] = useState([]);
    const router = useRouter();
    const { id } = router.query;
  
    //pull up tweet
    useEffect(
      () =>
        onSnapshot(doc(db, "tweets", id), (snapshot) => {
          setTweet(snapshot.data());
        }),
      [db]
    );
  
    //pull up comments
    useEffect(
      () =>
        onSnapshot(
          query(
            collection(db, "tweets", id, "comments"),
            orderBy("timestamp", "desc")
          ),
          (snapshot) => setComments(snapshot.docs)
        ),
      [db, id]
    );
  
    //user login
    if (!session) return <Login providers={providers} />;
  
    return (
      <div>
        <Head>
          <title>
            {tweet?.userName} on Twitter: {tweet?.text}
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
          <Sidebar />
          <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
            <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
              <div
                className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                onClick={() => router.push("/")}
              >
                <ArrowLeftIcon className="h-5 text-white" />
              </div>
              Tweet
            </div>
          
            <Tweet id={id} tweet={tweet} tweetPage />
            {comments.length > 0 && (
              <div className="pb-72">
                {comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    comment={comment.data()}
                  />
                ))}
              </div>
            )}
          </div>
          {/* <Widgets
            trendingResults={trendingResults}
            followResults={followResults}
          /> */}
  
          {isOpen && <Modal />}
        </main>
      </div>
    );
  }
  
  export default TweetPage;
  
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