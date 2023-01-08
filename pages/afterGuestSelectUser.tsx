import Link from 'next/link';
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { UseFireBaseLogin } from '../hooks/UseFirebaseLogin';
import { groupId } from '../states/groupId';
import { useRouter } from "next/router";

const AfterGuestSelectUser = () => {

  const router = useRouter();

  // 各ドキュメント
  const { login }:any=UseFireBaseLogin("user","certification");

  // recoil関係
  const [gid,setGid]:any=useRecoilState(groupId);

  // state管理
  const [textId,setTextId]=useState("");
  const [textPassword,setTextPassword]=useState("");

  // ログイン時
  const onClickLogin=()=>{

    const target=login.filter((l:any)=>{
      return (
        l.dataId===textId && l.password===textPassword
      )
    })

    target.map((t:any)=>{
      return (
        setGid(t.id)
      )
    })

    if (target.length>0){
      router.push({
        pathname:"/nippou/date/",
        query: {textId,textPassword}
      })
      setTextId("");
      setTextPassword("");
    } else {
      alert("id又はpasswordが異なります。もしくは日報が作られていない可能性があります。");
    }

  }

  return (
    <div>
      <h3>閲覧したい日報のidとパスワードを入力してください</h3>
      <p>id</p>
      <input value={textId} onChange={(e)=>setTextId(e.target.value)} />
      <p>password</p>
      <input value={textPassword} onChange={(e)=>setTextPassword(e.target.value)} />
      <br />
      <br />
      <button onClick={onClickLogin}>ログイン</button>
      <br />
      <br />
      <Link href="/">topへ</Link>
    </div>
  )
}

export default AfterGuestSelectUser