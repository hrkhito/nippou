import { addDoc, collection } from 'firebase/firestore';
import Link from 'next/link'
import React, { useState } from 'react'
import firestore from '../firebase';
import { useRouter } from "next/router";
import { useRecoilState } from "recoil"
import { accountId } from '../states/accountId';
import { UseFireBaseLogin } from '../hooks/UseFirebaseLogin';
import { Box, Input, Button, Text } from '@chakra-ui/react';
import { certification } from '../types/certification';

const CreateNippou = () => {

  const router = useRouter();

  // ドキュメント関係
  const { login }=UseFireBaseLogin("user","certification");

  // recoil
  const [aid,setAid]=useRecoilState<string>(accountId)

  // state管理
  const [dataId,setDataId]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [isAdminDataId,setIsAdminDataId]=useState<boolean>(false);
  const [isAdminPassword,setIsAdminPassword]=useState<boolean>(false);

  // 作成時
  const onClickCreate= async ()=>{
    const target:Array<certification>=login.filter((l:certification)=>{
      return (
        l.dataId===dataId || l.password===password
      )
    })
    if (target.length>0) {
      alert("同じid又は同じpasswordが既に存在しています")
    } else {
      try {
        const docRef=collection(firestore,"user",aid,"certification")
        addDoc(docRef,{dataId,password})
      } catch (e) {
        console.log(e);
      }
      setDataId("");
      setPassword("");
      router.push({
        pathname: "/login/",
      })
    }
  }

  // 入力時に文字数が足らないと警告する
  const onChangeUserName=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setDataId(e.target.value)
    if(e.target.value.length<5) {
      setIsAdminDataId(false);
    } else {
      setIsAdminDataId(true);
    }
  }
  const onChangeUserId=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value)
    if(e.target.value.length<5) {
      setIsAdminPassword(false);
    } else {
      setIsAdminPassword(true);
    }
  }

  return (
    <Box
      bg="purple.50"
      w="100%"
      h='calc(100vh)'
      textAlign="center"
      pt="40"
    >
      {isAdminDataId && isAdminPassword ? (
        null
      ) : (
        <Text fontWeight="bold" mb="8">全て入力してください。またidとpasswordは5文字以上でなければいけません。</Text>
      )}
      <Box mb="8">
        <Text fontWeight="bold" mb="2">日報id</Text>
        <Input
          w="20%"
          mb="4" 
          borderWidth={2}
          borderColor="blackAlpha.400"
          value={dataId}
          onChange={(e)=>onChangeUserName(e)}
        />
        <Text fontWeight="bold" mb="2">日報password</Text>
        <Input
          w="20%"
          mb="4" 
          borderWidth={2}
          borderColor="blackAlpha.400"
          value={password}
          onChange={(e)=>onChangeUserId(e)}
        />
      </Box>
      {isAdminDataId && isAdminPassword ? (
        <Button mb="8" bg="purple.400" color="white" onClick={onClickCreate}>作成</Button>
      ) : (
        null
      )}
      <br />
      <Button>
        <Link href="/afterUserLogin">戻る</Link>
      </Button>
    </Box>
  )
}

export default CreateNippou