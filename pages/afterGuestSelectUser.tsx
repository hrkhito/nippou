import Link from 'next/link';
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { UseFireBaseLogin } from '../hooks/UseFirebaseLogin';
import { groupId } from '../states/groupId';
import { useRouter } from "next/router";
import { isOwner } from '../states/isOwner';
import { Box, Button, Heading, Input, Text } from '@chakra-ui/react';

const AfterGuestSelectUser = () => {

  const router = useRouter();

  // 各ドキュメント
  const { login }:any=UseFireBaseLogin("user","certification");

  // recoil関係
  const [gid,setGid]:any=useRecoilState(groupId);
  const [owner,setOwner]:any=useRecoilState(isOwner);

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
      setOwner(false);
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
      pt="16"
    >
      <Heading 
        as="h3"
        w="72%"
        mr="auto"
        ml="auto"
        mb="16"
        fontSize="large"
      >
        閲覧したい日報のidとパスワードを入力してください
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
      <Button bg="purple.400" color="white" mb="8" onClick={onClickLogin}>ログイン</Button>
      <br />
      <Button>
        <Link href="/">topへ</Link>
      </Button>
    </Box>
  )
}

export default AfterGuestSelectUser