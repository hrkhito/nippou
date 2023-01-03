import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import Link from 'next/link';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import firestore from '../../../firebase';

const Form = () => {

  const router = useRouter();

  // 業務内容、good news、bad newsの値管理
  const [gyomu,setGyomu]=useState("");
  const [good,setGood]=useState("");
  const [bad,setBad]=useState("");

  // データ取得
  const date=router.query.date;

  // 提出ボタンを押した時
  const onClickSubmit=async ()=>{

    try {
      const docRef=collection(firestore,"callender")
      addDoc(docRef,{date:date,title:"日報作成済"})
    } catch (e) {
      console.log(e);
    }

    try {
      const docRef=collection(firestore,"nippou")
      await addDoc(docRef,{gyomu,good,bad,date:date})
    } catch (e) {
      console.log(e);
    }

    setGyomu("");
    setGood("");
    setBad("");

  }

  return (
    <div>
      <div>
        <p>{date}</p>
        <h3>業務内容</h3>
        <textarea value={gyomu} onChange={(e)=>setGyomu(e.target.value)}></textarea>
        <br />
        <h3>good news</h3>
        <textarea value={good} onChange={(e)=>setGood(e.target.value)}></textarea>
        <br />
        <h3>bad news</h3>
        <textarea value={bad} onChange={(e)=>setBad(e.target.value)}></textarea>
      </div>
      {gyomu!=="" && good!=="" && bad!=="" ? <Link href="/nippou/date/" onClick={()=>{onClickSubmit()}}>提出</Link> : <p>全て記入してください</p>}
      <br />
      <Link href="/nippou/date/">戻る</Link>
    </div>
  )
}

export default Form