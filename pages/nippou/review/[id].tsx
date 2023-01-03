import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import firestore from "../../../firebase";
import { UseFireBase } from "../../../hooks/UseFirebase";

const Review=()=> {

  const { documents } = UseFireBase("messages");

  const [message,setMessage]=useState("");

  const router = useRouter();

  // データ取得
  const gyomu=router.query.gyomu;
  const good=router.query.good;
  const bad=router.query.bad;

  // メッセージ送信処理
  const onClickMessage= async ()=>{

    try {
      const docRef=collection(firestore,"messages")
      await addDoc(docRef,{message,timestamp:serverTimestamp()})
    } catch (e) {
      console.log(e);
    }

    setMessage("");

  }

  return (
    <div>
      {gyomu}
      <br />
      {good}
      <br />
      {bad}
      <br />
      <input
       value={message} 
       onChange={(e)=> setMessage(e.target.value)} 
       type="text" 
       placeholder="コメントしてください" 
      />
      <br />
      <button onClick={onClickMessage}>送信</button>
      <br />
      {documents.map((document:any)=>{
        return (
          <div key={document.id}>
            {document.message}
          </div>
        )
      })}
      <Link href="/nippou/top/">戻る</Link>
    </div>
  );
}

export default Review