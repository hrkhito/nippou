import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import firestore from '../../../firebase';
import { UseFireBaseChat } from '../../../hooks/UseFirebaseChat';
import Link from 'next/link';

const Review = () => {

  const { chat }=UseFireBaseChat("chats");

  // router
  const router=useRouter();

  // state管理
  const [nippou,setNippou]:any=useState({});
  const [message,setMessage]=useState("");
  const [targetChat,setTargetChat]=useState([]);

  // データ取得
  const date=router.query.date;
  const nippouId:any=router.query.nippouId;

  // マウント時に該当の日報を取得
  useEffect(()=>{
    const data=async()=>{
      try {
        const docRef = doc(firestore,"nippou",nippouId)
        const docSnap:any = await getDoc(docRef);
        const data=docSnap.data();
        setNippou(data);
      } catch(e) {
        console.log(e);
      }
    }
    data();

    const target=chat.filter((c)=>{
      return (
        c.date===date
      )
    })
    setTargetChat(target);
  },[nippouId,chat,date])

  // チャット送信時
  const onClickChat= async ()=>{
    try {
      const docRef=collection(firestore,"chats")
      await addDoc(docRef,{message,date,timestamp:serverTimestamp()})
    } catch (e) {
      console.log(e);
    }
    setMessage("");
  }

  // スタイル(仮)
  const container={
    display: "flex",
    alignItems: "center",
  }

  return (
    <div style={container}>
      <div>
        <p>date:{date}</p>
        <h3>業務内容</h3>
        <p>{nippou.gyomu}</p>
        <h3>good news</h3>
        <p>{nippou.good}</p>
        <h3>bad news</h3>
        <p>{nippou.bad}</p>
        <p>編集は編集ページでお願いします</p>
      </div>
      <div>
        {targetChat.map((c)=>{
          return (
            <p key={c.id}>{c.message}</p>
          )
        })}
        <input value={message} onChange={(e)=> setMessage(e.target.value)} />
        <button onClick={onClickChat}>送信</button>
      </div>
      <Link href="/nippou/date/">戻る</Link>
    </div>
  )
}

export default Review