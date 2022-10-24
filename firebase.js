//function import
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDBtEdRpY-zyfZpDwbgH1RWsQpIF-AbOao",
    authDomain: "babytwitterv5.firebaseapp.com",
    projectId: "babytwitterv5",
    storageBucket: "babytwitterv5.appspot.com",
    messagingSenderId: "290440677643",
    appId: "1:290440677643:web:9f4bfd633abc4f748d7a0e",
  };

  //initialize firebase
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore();
  const storage = getStorage();

  export default app;
  export { db, storage };