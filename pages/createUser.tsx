import { addDoc, collection } from 'firebase/firestore';
import Link from 'next/link'
import React, { useState } from 'react'
import firestore from '../firebase';
import { useRouter } from "next/router";
import { UseFireBaseLoginUser } from '../hooks/UseFirebaseUserLogin';

const CreateUser = () => {

  const router=useRouter();

  // 各ドキュメント
  const { loginUser }=UseFireBaseLoginUser("user");

  // state管理
  const [userName,setUserName]=useState("");
  const [userId,setUserId]=useState("");
  const [userPassword,setUserPassword]=useState("");

  // 新規作成時
  const onClickCreateUser= async ()=>{

    const target=loginUser.filter((lu:any)=>{
      return (
        lu.userName===userName || lu.userId===userId || lu.userPassword===userPassword
      )
    })

    if (target.length>0) {
      if(target[0].userName===userName) {
        alert("同じユーザー名が既に存在しているものです")
      } else if (target[0].userId===userId) {
        alert("同じidが既に存在しているものです")
      } else if (target[0].userPassword===userPassword) {
        alert("同じpasswordが既に存在しているものです")
      }
    } else {
      try {
        const docRef=collection(firestore,"user")
        addDoc(docRef,{userName,userId,userPassword})
      } catch (e) {
        console.log(e);
      }
      router.push({
        pathname:"/loginUser/"
      })
      setUserName("");
      setUserId("");
      setUserPassword("");
    }
  }

  return (
    <div>
      <p>ユーザー名</p>
      <input value={userName} onChange={(e)=>setUserName(e.target.value)} />
      <p>ユーザーid</p>
      <input value={userId} onChange={(e)=>setUserId(e.target.value)} />
      <p>パスワード</p>
      <input value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} />
      <br />
      {userName!=="" && userId!=="" && userPassword!=="" ? (
        <button onClick={onClickCreateUser}>作成</button>
      ) : (
        <p>全て入力してください</p>
      )}
      <br />
      <Link href="/owner/">戻る</Link>
    </div>
  )
}

export default CreateUser