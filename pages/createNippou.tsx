import { addDoc, collection } from 'firebase/firestore';
import Link from 'next/link'
import React, { useState } from 'react'
import firestore from '../firebase';
import { useRouter } from "next/router";

const CreateNippou = () => {

  const router = useRouter();

  // state管理
  const [dataId,setDataId]=useState("");
  const [password,setPassword]=useState("");

  // 作成時
  const onClickCreate= async ()=>{

    router.push({
      pathname: "/login/",
    })

    try {
      const docRef=collection(firestore,"certification")
      addDoc(docRef,{dataId,password})
    } catch (e) {
      console.log(e);
    }

    setDataId("");
    setPassword("");
  }

  return (
    <div>
      <input value={dataId} onChange={(e)=>setDataId(e.target.value)} />
      <br />
      <input value={password} onChange={(e)=>setPassword(e.target.value)} />
      <br />
      {dataId==="" || password==="" ? (
        <p>全て入力してください</p>
      ) : (
        <button onClick={onClickCreate}>作成</button>
      )}
      <br />
      <Link href="/">戻る</Link>
    </div>
  )
}

export default CreateNippou