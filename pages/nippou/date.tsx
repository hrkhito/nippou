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
import { Box, Button, Heading } from '@chakra-ui/react';

const Date = (props:any) => {

  const router=useRouter();

  // データ取得
  const textId=router.query.textId;
  const textPassword=router.query.textPassword;

  // recoil関係
  const [owner,setOwner]:any=useRecoilState(isOwner);

  // モーダル関係
  const [modal, setModal] = useState(false);
  const [date,setDate]=useState("");
  const [isDone,setIsDone]=useState(false);
  const [nippouId,setNippouId]=useState("");
  const [callenderId,setCallenderId]=useState("");
  
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
  return (
    <Box
      p="8"
      w="100%"
      h='calc(100vh)'
    >
      <Heading
        textAlign="center"
        mb="4"
        bg="purple.400"
        w="50%"
        mr="auto"
        ml="auto"
        borderRadius="3xl"
        p="4"
      >
        日報管理アプリを始めましょう
      </Heading>
      <Button mb="8" size="sm">
        <Link href="/">topへ</Link>
      </Button>
      {owner ? (
        <Button size="sm" mb="8" ml="4" onClick={onClickLogout}>ログアウト</Button>
      ) : (
        null
      )}
      <Box mb="16">
        {modal ? (
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
      </Box>
    </Box>
  )
}

export default Date