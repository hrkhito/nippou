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
import { callender } from '../../types/callender';
import { nippou } from '../../types/nippou';

const Date = () => {

  const router=useRouter();

  // データ取得
  const textId:any=router.query.textId;
  const textPassword:any=router.query.textPassword;

  // recoil関係
  const [owner,setOwner]=useRecoilState<boolean>(isOwner);

  // モーダル関係
  const [modal, setModal] = useState<boolean>(false);
  const [date,setDate]=useState<string>("");
  const [isDone,setIsDone]=useState<boolean>(false);
  const [nippouId,setNippouId]=useState<string>("");
  const [callenderId,setCallenderId]=useState<string>("");
  
  // 各ドキュメント
  const { documents } = UseFireBaseCallender("user","certification","callender");
  const { nippou }=UseFireBaseNippou("user","certification","nippou");

  // モーダルのクローズボタン
  const closeModal = () => {
    setModal(false)
  }

  // 日付選択時の処理
  const handleDateClick = async (arg:any)=>{

    setModal(true);
    setDate(arg.dateStr);

    const filter:Array<callender>= documents.filter((document:callender)=>{
      return (
        document.date===arg.dateStr
      )
    })

    filter.map((f:callender)=>{
      return (
        setCallenderId(f.id)
      )
    })

    if (filter.length>0){
      setIsDone(true)
    } else {
      setIsDone(false)
    }

    const targetNippou:Array<nippou>= nippou.filter((part:nippou)=>{
      return (
        part.date===arg.dateStr
      )
    })

    targetNippou.map((target:nippou)=>{
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
        bg="purple.200"
        w="50%"
        mr="auto"
        ml="auto"
        borderRadius="xl"
        p="4"
      >
        日報管理アプリを始めましょう
      </Heading>
      <Box textAlign="center">
        {owner ? (
          <Button
            size="sm"
            mb="8"
            onClick={onClickLogout}
          >
            ログアウト
          </Button>
        ) : (
          <Button
            mb="8"
            size="sm"
          >
            <Link href="/">topへ</Link>
          </Button>
        )}
      </Box>
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
            // select={props.selectDateByDragAndDrop}
          />
        )}
      </Box>
    </Box>
  )
}

export default Date