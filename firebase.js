import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcJprZC7lLrvyGCUqGhuxHiq1rMQkx3l0",
  authDomain: "nippou-c3890.firebaseapp.com",
  projectId: "nippou-c3890",
  storageBucket: "nippou-c3890.appspot.com",
  messagingSenderId: "411982307427",
  appId: "1:411982307427:web:5b1e20bbddb3ec0ff05856"
};

const firebase=initializeApp(firebaseConfig);
const firestore=getFirestore(firebase);
const auth=getAuth(firebase);

export default firestore