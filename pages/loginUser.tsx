import Link from 'next/link'
import React, { useState } from 'react'
import { UseFireBaseLoginUser } from '../hooks/UseFirebaseUserLogin';
import { useRecoilState } from "recoil"
import { accountId } from '../states/accountId';
import { useRouter } from "next/router";

const LoginUser = () => {

  const router = useRouter();

  // 各ドキュメント
  const { loginUser }:any=UseFireBaseLoginUser("user");

  // recoil関係
  const [aid,setAid]=useRecoilState(accountId)
  console.log(aid);

  // state管理
  const [userName,setUserName]=useState("");
  const [userId,setUserId]=useState("");
  const [userPassword,setUserPassword]=useState("");

  // ログイン時
  const onClickLoginUser=()=>{
  
    if(loginUser===undefined) return
  
    // 該当データの取得
    const target:any= loginUser.filter((t)=>{
      return (
        t.userName===userName && t.userId===userId && t.userPassword===userPassword
      )
    })

    target.map((t:any)=>{
      return (
        setAid(t.id)
      )
    })

    if (target.length > 0) {
      router.push({
        pathname:"/afterUserLogin/"
      })
    } else {
      alert("ユーザー名、id又はpasswordが異なります。もしくはユーザーが存在しない可能性があります。");
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
        <button onClick={onClickLoginUser}>ログイン</button>
      ) : (
        <p>全て入力してください</p>
      )}
      <br />
      <Link href="/owner/">戻る</Link>
    </div>
  )
}

export default LoginUser