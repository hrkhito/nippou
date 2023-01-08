import { addDoc, collection } from 'firebase/firestore';
import Link from 'next/link'
import React, { useState } from 'react'
import firestore from '../firebase';
import { useRouter } from "next/router";
import { useRecoilState } from "recoil"
import { accountId } from '../states/accountId';
import { UseFireBaseLogin } from '../hooks/UseFirebaseLogin';

const CreateNippou = () => {

  const router = useRouter();

  // ドキュメント関係
  const { login }=UseFireBaseLogin("user","certification");

  // recoil
  const [aid,setAid]=useRecoilState(accountId)

  // state管理
  const [dataId,setDataId]=useState("");
  const [password,setPassword]=useState("");

  // 作成時
  const onClickCreate= async ()=>{
    const target=login.filter((l)=>{
      return (
        l.dataId===dataId || l.password===password
      )
    })
    if (target.length>0) {
      alert("同じid又は同じpasswordが既に存在しています")
    } else {
      try {
        const docRef=collection(firestore,"user",aid,"certification")
        addDoc(docRef,{dataId,password})
      } catch (e) {
        console.log(e);
      }
      setDataId("");
      setPassword("");
      router.push({
        pathname: "/login/",
      })
    }
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
      <Link href="/afterUserLogin">戻る</Link>
    </div>
  )
}

export default CreateNippou