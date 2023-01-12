import React, { useState } from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin from "@fullcalendar/interaction";
import { UseFireBaseCallender } from '../../hooks/UseFirebaseCallender';
import Modal from '../../components/Modal';
import { UseFireBaseNippou } from '../../hooks/UseFirebaseNippou';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useRecoilState } from 'recoil';
import { isOwner } from '../../states/isOwner';
import { UseFireBaseLoginUser } from '../../hooks/UseFirebaseUserLogin';
import { accountId } from '../../states/accountId';
import firestore from '../../firebase';
import { groupId } from '../../states/groupId';
import { deleteDoc, doc } from 'firebase/firestore';


const Date = (props:any) => {

  const router=useRouter();

  // データ取得
  const textId=router.query.textId;
  const textPassword=router.query.textPassword;

  // recoil関係
  const [owner,setOwner]:any=useRecoilState(isOwner);
  const [aid,setAid]:any=useRecoilState(accountId);
  const [gid,setGid]:any=useRecoilState(groupId);

  // モーダル関係
  const [modal, setModal] = useState(false);
  const [date,setDate]=useState("");
  const [isDone,setIsDone]=useState(false);
  const [nippouId,setNippouId]=useState("");
  const [callenderId,setCallenderId]=useState("");
  
  // 各ドキュメント
  const { documents }:any = UseFireBaseCallender("user","certification","callender");
  const { nippou }:any=UseFireBaseNippou("user","certification","nippou");
  const { loginUser }:any=UseFireBaseLoginUser("user");
  console.log(loginUser);

  // モーダルのクローズボタン
  const closeModal = () => {
    setModal(false)
  }

  // 日付選択時の処理
  const handleDateClick = async (arg:any)=>{

    setModal(true);
    setDate(arg.dateStr);

    const filter= await documents.filter((document:any)=>{
      return (
        document.date===arg.dateStr
      )
    })

    filter.map((f:any)=>{
      return (
        setCallenderId(f.id)
      )
    })

    if (filter.length>0){
      setIsDone(true)
    } else {
      setIsDone(false)
    }

    const targetNippou= await nippou.filter((part:any)=>{
      return (
        part.date===arg.dateStr
      )
    })

    targetNippou.map((target:any)=>{
      return (
        setNippouId(target.id)
      )
    })
  }

  // ログアウト時
  const onClickLogout=()=>{
    setOwner(false);
    router.push({
      pathname: "/"
    })
  }

  // アカウントを削除時
  const onClickDeleteAccount= async ()=>{
    // const answer=window.confirm("本当に削除しますか");
    // // 削除確認後の処理
    // if (answer) {
    //   const docUser = doc(firestore,"user",aid,);
    //   await deleteDoc(docUser);
    //   router.push({
    //     pathname: "/"
    //   })
    // }
  }

  // プロフィール編集時
  const onClickEditProfile=()=>{

  }

  return (
    <>
      <div>
        <button>
          <Link href="/">topへ</Link>
        </button>
      </div>
      {owner ? (
        <div>
          <button onClick={onClickLogout}>ログアウト</button>
          <br />
          <button onClick={onClickDeleteAccount}>アカウントを削除する</button>
          <br />
          <button onClick={onClickEditProfile}>プロフィールを編集する</button>
        </div>
      ) : (
        null
      )}
      {modal ? (
        <div>
          <Modal 
            modal={modal} 
            closeModal={closeModal} 
            date={date} 
            isDone={isDone} 
            nippouId={nippouId}
            callenderId={callenderId}
            dataId={textId} 
            password={textPassword} 
          />
        </div>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin,interactionPlugin]}
          initialView="dayGridMonth"
          locales={allLocales}
          locale="ja"
          events={documents}
          dateClick={(arg)=>{handleDateClick(arg)}}
          selectable={true}
          select={props.selectDateByDragAndDrop}
        />
      )}
    </>
  )
}

export default Date