import React, { useState } from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin from "@fullcalendar/interaction";
import { UseFireBase } from '../../hooks/UseFirebase';
import Modal from '../../components/Modal';
import { UseFireBaseNippou } from '../../hooks/UseFirebaseNippou';

const Date = (props:any) => {

  const { documents }:any = UseFireBase("callender");
  const { nippou }:any=UseFireBaseNippou("nippou");

  // モーダル関係
  const [modal, setModal] = useState(false);
  const [date,setDate]=useState("");
  const [isDone,setIsDone]=useState(false);
  const [nippouId,setNippouId]=useState("");

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

  return (
    <div>
      {modal ? (
        <div>
          <Modal modal={modal} closeModal={closeModal} date={date} isDone={isDone} nippouId={nippouId} />
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
    </div>
  )
}

export default Date