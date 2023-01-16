import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import firestore from '../../../firebase';
import { UseFireBaseChat } from '../../../hooks/UseFirebaseChat';
import { UseFireBaseLoginUser } from "../../../hooks/UseFirebaseUserLogin"
import Link from 'next/link';
import { useRecoilState } from "recoil"
import { groupId } from '../../../states/groupId';
import { accountId } from '../../../states/accountId';
import { isOwner } from '../../../states/isOwner';
import { Button, Input, Text, Box, Flex, Heading } from '@chakra-ui/react';

const Review = () => {

  // 各document
  const { chat }=UseFireBaseChat("user","certification","chats");
  const { loginUser }=UseFireBaseLoginUser("user");
  
  // router
  const router=useRouter();

  // state管理
  const [nippou,setNippou]:any=useState({});
  const [message,setMessage]=useState("");
  const [targetChat,setTargetChat]=useState([]);
  const [targetUserName,setTargetUserName]=useState("");

  // recoil
  const [gid,setGid]:any=useRecoilState(groupId);
  const [aid,setAid]:any=useRecoilState(accountId);
  const [isowner,setIsowner]:any=useRecoilState(isOwner);

  // データ取得
  const date=router.query.date;
  const nippouId:any=router.query.nippouId;

  // マウント時に該当の日報を取得し、ユーザー名も取得
  useEffect(()=>{
    if(nippouId===undefined) return
    const data=async()=>{
      try {
        const docRef = doc(firestore,"user",aid,"certification",gid,"nippou",nippouId)
        const docSnap:any = await getDoc(docRef);
        const data=docSnap.data();
        setNippou(data);
      } catch(e) {
        console.log(e);
      }
    }
    data();

    const target=chat.filter((c)=>{
      return (
        c.date===date
      )
    })
    setTargetChat(target);

    const targetUser=loginUser.filter((lg)=>{
      return (
        lg.id===aid
      )
    })
    targetUser.map((tu)=>{
      return (
        setTargetUserName(tu.userName)
      )
    })
  },[aid,nippouId,chat,loginUser,date,gid,setTargetUserName])

  // チャット送信時
  const onClickChat= async ()=>{
    if (message!==""){
      try {
        const docRef=collection(firestore,"user",aid,"certification",gid,"chats")
        await addDoc(docRef,{message,date,isowner,timestamp:serverTimestamp()})
      } catch (e) {
        console.log(e);
      }
      setMessage("");
    } else {
      alert("文字を入力してください")
    }
  }

  return (
    <Flex
      bg="purple.50"
      w="100%"
      minHeight='calc(100vh)'
      pt="16"
      textAlign="center"
    >
      <Box mb="8" ml="24" w="40%">
        <Box
          p="8"
          mb="16"
          bg="white"
          borderRadius="3xl"
        >
          <Heading fontSize="3xl" mb="8">{date}</Heading>
          <Text fontWeight="bold" mb="2">業務内容</Text>
          <Text
            borderWidth={2}
            borderRadius="base"
            borderColor="blackAlpha.400"
            mb="8"
          >
            {nippou.gyomu}
          </Text>
          <Text fontWeight="bold" mb="2">good news</Text>
          <Text
            borderWidth={2}
            borderRadius="base"
            borderColor="blackAlpha.400"
            mb="8"
          >
            {nippou.good}
          </Text>
          <Text fontWeight="bold" mb="2">bad news</Text>
          <Text
            borderWidth={2}
            borderRadius="base"
            borderColor="blackAlpha.400"
            mb="24"
          >
            {nippou.bad}
          </Text>
          {isowner ? (
            <Text mb="4" fontWeight="bold">編集は編集ページでお願いします</Text>
          ) : (
            null
          )}
          <Button bg="purple.400" color="white">
            <Link href="/nippou/date/">戻る</Link>
          </Button>
        </Box>
        <Text
          bg="white"
          borderRadius="3xl"
          fontWeight="bold" 
          mb="8"
          p="2"
        >
          右側にチャット内容が表示されます。
          <br />
          緑の背景色がオーナー側で灰色の背景色がゲスト側のチャット内容です。
        </Text>
      </Box>
      <Box
        id="top"
        bg="white"
        borderRadius="3xl"
        p="8"
        mr="24"
        ml="24"
        overflowY="auto"
      >
        <Text fontWeight="bold" mb="4">
          <Link href="#submit">チャットを送信する</Link>
        </Text>
        {targetChat.map((c:any)=>{
          return (
            <Box w="100%" mb="4" key={c.id}>
              <Flex
                justifyContent={c.isowner ? "end" : "start"}
              >
                <Text
                  bg={c.isowner ? "green.400" : "gray.400"}
                  borderRadius="3xl"
                  p="2"
                  w="20%"
                  wordBreak="break-word"
                >
                  {c.message}
                </Text>
              </Flex>
            </Box>
          )
        })}
        <Box
          p="8"
          bg="white"
          borderRadius="3xl"
        >
          <Flex id="submit" mb="8">
            <Input mr="2" value={message} onChange={(e)=> setMessage(e.target.value)} />
            <Button bg="purple.400" color="white" onClick={onClickChat}>送信</Button>
          </Flex>
          <Text fontWeight="bold">
            <Link href="#top">上に戻る</Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  )
}

export default Review