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
  const [isAdminDataId,setIsAdminDataId]=useState(false);
  const [isAdminPassword,setIsAdminPassword]=useState(false);

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

  // 入力時に文字数が足らないと警告する
  const onChangeUserName=(e:any)=>{
    setDataId(e.target.value)
    if(e.target.value.length<5) {
      setIsAdminDataId(false);
    } else {
      setIsAdminDataId(true);
    }
  }
  const onChangeUserId=(e:any)=>{
    setPassword(e.target.value)
    if(e.target.value.length<5) {
      setIsAdminPassword(false);
    } else {
      setIsAdminPassword(true);
    }
  }

  return (
    <div>
      <input value={dataId} onChange={(e)=>onChangeUserName(e)} />
      <br />
      <input value={password} onChange={(e)=>onChangeUserId(e)} />
      <br />
      {isAdminDataId && isAdminPassword ? (
        <button onClick={onClickCreate}>作成</button>
      ) : (
        <p>全て入力してください。またidとpasswordは5文字以上でなければいけません。</p>
      )}
      <br />
      <Link href="/afterUserLogin">戻る</Link>
    </div>
  )
}

export default CreateNippou