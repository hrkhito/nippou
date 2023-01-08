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


const Date = (props:any) => {

  const router=useRouter();

  // データ取得
  const textId=router.query.textId;
  const textPassword=router.query.textPassword;

  // recoil関係
  const [owner,setOwner]:any=useRecoilState(isOwner);
  console.log(owner);

  // モーダル関係
  const [modal, setModal] = useState(false);
  const [date,setDate]=useState("");
  const [isDone,setIsDone]=useState(false);
  const [nippouId,setNippouId]=useState("");
  
  // 各ドキュメント
  const { documents }:any = UseFireBaseCallender("user","certification","callender");
  const { nippou }:any=UseFireBaseNippou("user","certification","nippou");

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

  return (
    <>
      <h3>
        <Link href="/">topへ</Link>
      </h3>
      {owner ? (
        <h3>
          <button onClick={onClickLogout}>ログアウト</button>
        </h3>
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