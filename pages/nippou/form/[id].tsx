import React, { useState } from 'react'
import { useRouter } from "next/router";
import Link from 'next/link';
import { addDoc, collection } from 'firebase/firestore';
import firestore from '../../../firebase';
import { useRecoilState } from "recoil";
import { groupId } from '../../../states/groupId';
import { accountId } from '../../../states/accountId';
import { Box, Text, Button, Textarea, Heading } from '@chakra-ui/react';

const Form = () => {

  const router = useRouter();

  const [gid,setGid]=useRecoilState<string>(groupId);
  const [aid,setAid]=useRecoilState<string>(accountId);

  // 業務内容、good news、bad newsの値管理
  const [gyomu,setGyomu]=useState<string>("");
  const [good,setGood]=useState<string>("");
  const [bad,setBad]=useState<string>("");

  // データ取得
  const date=router.query.date;
  const dataId=router.query.dataId;
  const password=router.query.password;

  // 提出ボタンを押した時
  const onClickSubmit= async ()=>{

    try {
      const docRef=collection(firestore,"user",aid,"certification",gid,"callender")
      addDoc(docRef,{date:date,title:"日報作成済",dataId:dataId,password:password})
    } catch (e) {
      console.log(e);
    }

    try {
      const docRef=collection(firestore,"user",aid,"certification",gid,"nippou")
      await addDoc(docRef,{gyomu:gyomu,good:good,bad:bad,date:date,dataId:dataId,password:password})
    } catch (e) {
      console.log(e);
    }

    setGyomu("");
    setGood("");
    setBad("");

  }

  return (
    <Box
      bg="purple.50"
      w="100%"
      h='calc(100vh)'
      textAlign="center"
      pt="16"
    >
      <Box mb="8">
        <Heading fontSize="3xl" mb="8">{date}</Heading>
        <Text fontWeight="bold" mb="2">業務内容</Text>
        <Textarea
          w="50%"
          mb="4" 
          borderWidth={2} 
          borderColor="blackAlpha.400"
          value={gyomu} 
          onChange={(e)=>setGyomu(e.target.value)}
        >
        </Textarea>
        <br />
        <Text fontWeight="bold" mb="2">good news</Text>
        <Textarea
          w="50%"
          mb="4" 
          borderWidth={2} 
          borderColor="blackAlpha.400"
          value={good} 
          onChange={(e)=>setGood(e.target.value)}
        >
        </Textarea>
        <br />
        <Text fontWeight="bold" mb="2">bad news</Text>
        <Textarea
          w="50%"
          mb="4" 
          borderWidth={2} 
          borderColor="blackAlpha.400" 
          value={bad} 
          onChange={(e)=>setBad(e.target.value)}
        >
        </Textarea>
      </Box>
      {gyomu!=="" && good!=="" && bad!=="" ? 
        <Button mb="8" bg="purple.400" color="white">
          <Link href="/nippou/date/" onClick={()=>{onClickSubmit()}}>提出</Link>
        </Button> : 
        <Text mb="4">全て記入してください</Text>
      }
      <br />
      <Button>
        <Link href="/nippou/date/">戻る</Link>
      </Button>
    </Box>
  )
}

export default Form