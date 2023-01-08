import React from 'react'
import { useRecoilState } from 'recoil';
import { UseFireBaseLoginUser } from '../hooks/UseFirebaseUserLogin';
import { accountId } from '../states/accountId';
import { useRouter } from "next/router";
import Link from 'next/link';

const GuestLogin = () => {

  const router=useRouter();

  // 各ドキュメント
  const { loginUser }=UseFireBaseLoginUser("user");

  // recoil関係
  const [aid,setAid]:any=useRecoilState(accountId);

  // ユーザー選択時
  const onClickSelectUser=(id:any)=>{
    setAid(id);
    router.push({
      pathname:"/afterGuestSelectUser/"
    })
  }

  return (
    <div>
      <h3>閲覧する日報を選択してください</h3>
      {loginUser.map((lu:any)=>{
        return (
          <div key={lu.id}>
            <p>ユーザー名:{lu.userName}</p>
            <button onClick={()=>{onClickSelectUser(lu.id)}}>選択</button>
          </div>
        )
      })}
      <Link href="/">topへ</Link>
    </div>
  )
}

export default GuestLogin