import Link from 'next/link'
import React, { useState } from 'react'
import { UseFirebaseUserLogin } from '../hooks/UseFirebaseUserLogin';
import { useRecoilState } from "recoil"
import { accountId } from '../states/accountId';
import { useRouter } from "next/router";
import { Box, Button, Input, Text, Heading } from '@chakra-ui/react';
import { user } from '../types/user';

const LoginUser = () => {

  const router = useRouter();

  // 各ドキュメント
  const { loginUser }=UseFirebaseUserLogin("user");

  // recoil関係
  const [aid,setAid]=useRecoilState<string>(accountId)

  // state管理
  const [userName,setUserName]=useState<string>("");
  const [userId,setUserId]=useState<string>("");
  const [userPassword,setUserPassword]=useState<string>("");

  // ログイン時
  const onClickLoginUser=()=>{
  
    if(loginUser===undefined) return
  
    // 該当データの取得
    const target:Array<user>= loginUser.filter((t:user)=>{
      return (
        t.userName===userName && t.userId===userId && t.userPassword===userPassword
      )
    })

    target.map((t:user)=>{
      return (
        setAid(t.id)
      )
    })

    if (target.length > 0) {
      router.push({
        pathname:"/afterUserLogin/"
      })
    } else {
      alert("ユーザー名、id又はpasswordが異なります。もしくはユーザーが存在しない可能性があります。");
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
        <Text fontWeight="bold" mb="2">ユーザー名</Text>
        <Input 
          w="20%" 
          mb="4" 
          borderWidth={2} 
          borderColor="blackAlpha.400"
          value={userName} 
          onChange={(e)=>setUserName(e.target.value)} 
        />
        <Text fontWeight="bold" mb="2">ユーザーid</Text>
        <Input
          w="20%" 
          mb="4" 
          borderWidth={2} 
          borderColor="blackAlpha.400"
          value={userId} 
          onChange={(e)=>setUserId(e.target.value)} 
        />
        <Text fontWeight="bold" mb="2">ユーザーパスワード</Text>
        <Input
          w="20%" 
          mb="4" 
          borderWidth={2} 
          borderColor="blackAlpha.400"
          value={userPassword}
          onChange={(e)=>setUserPassword(e.target.value)} 
        />
      </Box>
      {userName!=="" && userId!=="" && userPassword!=="" ? (
        <Button bg="purple.400" color="white" mb="8" onClick={onClickLoginUser}>ログイン</Button>
      ) : (
        <Text fontWeight="bold" mb="8">全て入力してください</Text>
      )}
      <br />
      <Button>
        <Link href="/owner/">戻る</Link>
      </Button>
    </Box>
  )
}

export default LoginUser