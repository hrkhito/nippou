import { addDoc, collection } from 'firebase/firestore';
import Link from 'next/link'
import React, { useState } from 'react'
import firestore from '../firebase';
import { useRouter } from "next/router";
import { UseFireBaseLoginUser } from '../hooks/UseFirebaseUserLogin';
import { Box, Button, Input, Text } from '@chakra-ui/react';

const CreateUser = () => {

  const router=useRouter();

  // 各ドキュメント
  const { loginUser }=UseFireBaseLoginUser("user");

  // state管理
  const [userName,setUserName]=useState("");
  const [userId,setUserId]=useState("");
  const [userPassword,setUserPassword]=useState("");
  const [isAdminUserName,setIsAdminUserName]=useState(false);
  const [isAdminUserId,setIsAdminUserId]=useState(false);
  const [isAdminUserPassword,setIsAdminUserPassword]=useState(false);

  // 新規作成時
  const onClickCreateUser= async ()=>{

    // ユーザー名とid,passwordが被らないようにする
    const target=loginUser.filter((lu:any)=>{
      return (
        lu.userName===userName || lu.userId===userId || lu.userPassword===userPassword
      )
    })

    if (target.length>0) {
      alert("同じユーザー名か同じid、もしくは同じpasswordが既に存在しているため被らないようにしてください")
      // ここまで警告しなくても良いかも
      // if(target[0].userName===userName) {
      //   alert("同じユーザー名が既に存在しているものです")
      // } else if (target[0].userId===userId) {
      //   alert("同じidが既に存在しているものです")
      // } else if (target[0].userPassword===userPassword) {
      //   alert("同じpasswordが既に存在しているものです")
      // }
    } else {
      try {
        const docRef=collection(firestore,"user")
        addDoc(docRef,{userName,userId,userPassword})
      } catch (e) {
        console.log(e);
      }
      router.push({
        pathname:"/loginUser/"
      })
      setUserName("");
      setUserId("");
      setUserPassword("");
    }
  }

  // 入力時に文字数が足らないと警告する
  const onChangeUserName=(e:any)=>{
    setUserName(e.target.value)
    if(e.target.value.length<5) {
      setIsAdminUserName(false);
    } else {
      setIsAdminUserName(true);
    }
  }
  const onChangeUserId=(e:any)=>{
    setUserId(e.target.value)
    if(e.target.value.length<5) {
      setIsAdminUserId(false);
    } else {
      setIsAdminUserId(true);
    }
  }
  const onChangeUserPassword=(e:any)=>{
    setUserPassword(e.target.value)
    if(e.target.value.length<5) {
      setIsAdminUserPassword(false);
    } else {
      setIsAdminUserPassword(true);
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
      {isAdminUserName && isAdminUserId && isAdminUserPassword ? (
        null
      ) : (
        <Text fontWeight="bold" mb="8">全て入力してください。又、ユーザー名・id・passwordは5文字以上でなければなりません。</Text>
      )}
      <Box>
        <Text fontWeight="bold" mb="2">ユーザー名</Text>
        <Input 
          w="20%"
          mb="4" 
          borderWidth={2}
          borderColor="blackAlpha.400"
          value={userName} 
          onChange={(e)=>onChangeUserName(e)} 
        />
        <Text fontWeight="bold" mb="2">ユーザーid</Text>
        <Input 
          w="20%" 
          mb="4" 
          borderWidth={2}
          borderColor="blackAlpha.400"
          value={userId} 
          onChange={(e)=>onChangeUserId(e)} 
        />
        <Text fontWeight="bold" mb="2">ユーザーパスワード</Text>
        <Input 
          w="20%" 
          mb="4" 
          borderWidth={2} 
          borderColor="blackAlpha.400"
          value={userPassword} 
          onChange={(e)=>onChangeUserPassword(e)} 
        />
      </Box>
      {isAdminUserName && isAdminUserId && isAdminUserPassword ? (
        <Button onClick={onClickCreateUser}>作成</Button>
      ) : (
        null
      )}
      <br />
      <Button>
        <Link href="/owner/">戻る</Link>
      </Button>
    </Box>
  )
}

export default CreateUser