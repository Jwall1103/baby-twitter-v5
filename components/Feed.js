//imports
import { SparklesIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Input from "./Input";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { db } from "../firebase";
import Tweet from "./Tweet";
import { useSession } from "next-auth/react";
import postcss from "postcss";

//main feed component. pulls tweets by ID and orders them from new to old
function Feed() {
  const [tweets, setTweets] = useState([]);

  useEffect(
    () =>
    onSnapshot(
        query(collection(db, "tweets"), orderBy("timestamp", "desc")),
        (snapshot) => {
            setTweets(snapshot.docs);
        }
    ),
    [db]
  );

  console.log(tweets);

  return (
    <div className="text-white flex-grow border-l border-r
    border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
        <div className="text-[#d9d9d9] flex items-center
        sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black
        border-b border-gray-700">
            <h2 className="text-lg sm:text-xl font-bold">Home</h2>
            <div className="hoverAnimation w-9 h-9 flex items-center
            justify-center xl:px-0 ml-auto">
                <SparklesIcon className="h-5 text-white" />
            </div>
        </div>

        <Input />
        <div className="pb-72">
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} id={tweet.id} tweet={tweet.data()}/>
            ))}
        </div>
    </div>
  );
}

export default Feed;