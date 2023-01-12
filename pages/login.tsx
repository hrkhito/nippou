import Link from 'next/link'
import React, { useState } from 'react'
import { UseFireBaseLogin } from '../hooks/UseFirebaseLogin';
import { useRouter } from "next/router";
import { useRecoilState } from "recoil"
import { groupId } from '../states/groupId';
import { isOwner } from '../states/isOwner';
import { Box, Heading, Input, Text, Button } from '@chakra-ui/react';

const Login = () => {

  const router = useRouter();

  // 各ドキュメント
  const { login }=UseFireBaseLogin("user","certification");

  // recoil関係
  const [gid,setGid]:any=useRecoilState(groupId);
  const [owner,setOwner]:any=useRecoilState(isOwner);

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
        setGid(t.id)
      )
    })

    if (target.length > 0) {
      setOwner(true);
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
    <Box
      bg="purple.50"
      w="100%"
      h='calc(100vh)'
      textAlign="center"
      pt="40"
    >
      <Heading
        as="h3"
        w="72%"
        mr="auto"
        ml="auto"
        mb="16"
        fontSize="large"
      >
        ログインしてください
      </Heading>
      <Box mb="8">
        <Text fontWeight="bold" mb="2">日報id</Text>
        <Input
          w="20%" 
          mb="4" 
          borderWidth={2} 
          borderColor="blackAlpha.400"
          value={textId} 
          onChange={(e)=>setTextId(e.target.value)} 
        />
        <Text fontWeight="bold" mb="2">日報password</Text>
        <Input
          w="20%" 
          mb="4" 
          borderWidth={2} 
          borderColor="blackAlpha.400"
          value={textPassword} 
          onChange={(e)=>setTextPassword(e.target.value)} 
        />
      </Box>
      {textId==="" || textPassword==="" ? (
        <Text fontWeight="bold" mb="8">全て入力してください</Text>
      ) : (
        <Button bg="purple.400" color="white" mb="8" onClick={onClickLogin}>ログイン</Button>
      )}
      <br />
      <Link href="/afterUserLogin">戻る</Link>
    </Box>
  )
}

export default Login