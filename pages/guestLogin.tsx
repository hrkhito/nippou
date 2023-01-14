import React from 'react'
import { useRecoilState } from 'recoil';
import { UseFireBaseLoginUser } from '../hooks/UseFirebaseUserLogin';
import { accountId } from '../states/accountId';
import { useRouter } from "next/router";
import Link from 'next/link';
import { Box, Button, Text } from '@chakra-ui/react';

const GuestLogin = () => {

  const router=useRouter();

  // 各ドキュメント
  const { loginUser }=UseFireBaseLoginUser("user");

  // recoil関係
  const [aid,setAid]:any=useRecoilState(accountId);

  // ユーザー選択時
  const onClickSelectUser=(id:any)=>{
    setAid(id);
    router.push({
      pathname:"/afterGuestSelectUser/"
    })
  }

  return (
    <Box
      bg="purple.50"
      w="100%"
      h='calc(100vh)'
      textAlign="center"
      pt="16"
    >
      <Text fontWeight="bold" mb="8">
        閲覧する日報を選択してください
      </Text>
      {loginUser.map((lu:any)=>{
        return (
          <Box 
            key={lu.id} 
            mb="8"
            mr="auto"
            ml="auto"
            p="4" 
            w="20%"
            borderWidth={2}
            borderRadius="base" 
            borderColor="blackAlpha.400"
          >
            <Text fontWeight="bold" mb="4">ユーザー名:{lu.userName}</Text>
            <Button onClick={()=>{onClickSelectUser(lu.id)}}>選択</Button>
          </Box>
        )
      })}
      <Button>
        <Link href="/">topへ</Link>
      </Button>
    </Box>
  )
}

export default GuestLogin