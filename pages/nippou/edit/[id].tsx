import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from "next/router";
import firestore from '../../../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore"
import Link from 'next/link';
import { useRecoilState } from "recoil"
import { groupId } from '../../../states/groupId';
import { accountId } from '../../../states/accountId';
import { Box, Button, Heading, Text, Textarea } from '@chakra-ui/react';

const Edit = () => {

  // useRouter
  const router = useRouter();

  // state管理
  const [nippou,setNippou]:any=useState({});
  const [textSurveillance,setTextSurveillance]=useState(false);
  const [goodSurveillance,setGoodSurveillance]=useState(false);
  const [badSurveillance,setBadSurveillance]=useState(false);

  // ref管理
  const gyomuText=useRef(null);
  const goodText=useRef(null);
  const badText=useRef(null);

  // データ取得
  const date=router.query.date;
  const nippouId:any=router.query.nippouId;

  // recoil関係
  const [gid,setGid]:any=useRecoilState(groupId);
  const [aid,setAid]:any=useRecoilState(accountId);

  // マウント時に編集したい日報をセット
  useEffect(()=>{
    if(nippouId===undefined) return
    const data=async()=>{
      try {
        const docRef = doc(firestore, "user", aid, "certification",gid,"nippou", nippouId);
        const docSnap:any = await getDoc(docRef);
        const data=docSnap.data();
        setNippou(data);
      } catch(e) {
        console.log(e);
      }
    }
    data();
  },[aid,gid,nippouId])

  // 更新ボタンクリック時
  const onClickUpdate= async ()=>{
    const docRef = doc(firestore, "user", aid, "certification",gid,"nippou", nippouId);
    updateDoc(docRef,{
      gyomu:nippou.gyomu,
      good:nippou.good,
      bad:nippou.bad,
      date:date
    })
  }

  // 空のままで更新できないようにする
  const onChangeGyomu=(e:any)=>{
    setNippou({...nippou,gyomu:e.target.value});
    if (gyomuText.current.value==="") {
      setGoodSurveillance(true);
      setBadSurveillance(true);
    } else {
      setGoodSurveillance(false);
      setBadSurveillance(false);
    }
  }

  const onChangeGood=(e:any)=>{
    setNippou({...nippou,good:e.target.value});
    if (goodText.current.value==="") {
      setTextSurveillance(true);
      setBadSurveillance(true);
    } else {
      setTextSurveillance(false);
      setBadSurveillance(false);
    }
  }

  const onChangeBad=(e:any)=>{
    setNippou({...nippou,bad:e.target.value});
    if (badText.current.value==="") {
      setTextSurveillance(true);
      setGoodSurveillance(true);
    } else {
      setTextSurveillance(false);
      setGoodSurveillance(false);
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
      <Box mb="8">
        <Heading fontSize="3xl" mb="8">{date}</Heading>
        <Text fontWeight="bold" mb="2">業務内容</Text>
        <Textarea
          w="50%"
          mb="4" 
          borderWidth={2} 
          borderColor="blackAlpha.400" 
          disabled={textSurveillance} 
          ref={gyomuText} 
          value={nippou.gyomu} 
          onChange={(e)=>{onChangeGyomu(e)}}
        >
        </Textarea>
        <br />
        <Text fontWeight="bold" mb="2">good news</Text>
        <Textarea
          w="50%"
          mb="4" 
          borderWidth={2} 
          borderColor="blackAlpha.400"  
          disabled={goodSurveillance} 
          ref={goodText} 
          value={nippou.good} 
          onChange={(e)=>{onChangeGood(e)}}
        >
        </Textarea>
        <br />
        <Text fontWeight="bold" mb="2">bad news</Text>
        <Textarea
          w="50%"
          mb="4" 
          borderWidth={2} 
          borderColor="blackAlpha.400"  
          disabled={badSurveillance} 
          ref={badText} 
          value={nippou.bad} 
          onChange={(e)=>{onChangeBad(e)}}
        >
        </Textarea>
      </Box>
      {textSurveillance || goodSurveillance || badSurveillance ? (
        <Text>空では更新できません</Text>
      ) : (
        <Button mb="8" bg="purple.400" color="white">
          <Link href="/nippou/date/" onClick={onClickUpdate}>更新</Link>
        </Button>
      )}
      <br />
      <Button>
        <Link href="/nippou/date/">戻る</Link>
      </Button>
    </Box>
  )
}

export default Edit