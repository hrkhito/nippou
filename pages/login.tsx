import Link from 'next/link'
import React, { useState } from 'react'
import { UseFireBaseLogin } from '../hooks/UseFirebaseLogin';
import { useRouter } from "next/router";
import { useRecoilState } from "recoil"
import { groupId } from '../states/groupId';

const Login = () => {

  const router = useRouter();

  // 各ドキュメント
  const { login }=UseFireBaseLogin("certification");

  // recoil関係
  const [id,setId]:any=useRecoilState(groupId);

  // state管理
  const [textId,setTextId]=useState("");
  const [textPassword,setTextPassword]=useState("");

  // ログイン時
  const onClickLogin= async ()=>{
    if(login===undefined) return
    
    // 該当データの取得
    const target:any= login.filter((t)=>{
      return (
        t.dataId===textId && t.password===textPassword
      )
    })

    target.map((t:any)=>{
      return (
        setId(t.id)
      )
    })

    if (target.length > 0) {

      router.push({
        pathname:"/nippou/date/",
        query: {textId,textPassword}
      })
      setTextId("");
      setTextPassword("");
    } else {
      alert("id又はpasswordが異なります");
    }
  }

  return (
    <>
      <h3>ログインしてください</h3>
      <input value={textId} onChange={(e)=>setTextId(e.target.value)} />
      <br />
      <input value={textPassword} onChange={(e)=>setTextPassword(e.target.value)} />
      <br />
      {textId==="" || textPassword==="" ? (
        <p>全て入力してください</p>
      ) : (
        <button onClick={onClickLogin}>ログイン</button>
      )}
      <Link href="/">戻る</Link>
    </>
  )
}

export default Login