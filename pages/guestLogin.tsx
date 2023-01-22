import React from 'react'
import { useRecoilState } from 'recoil';
import { UseFirebaseUserLogin } from '../hooks/UseFirebaseUserLogin';
import { accountId } from '../states/accountId';
import { useRouter } from "next/router";
import Link from 'next/link';
import { Box, Button, Text } from '@chakra-ui/react';
import { user } from '../types/user';

const GuestLogin = () => {

  const router=useRouter();

  // 各ドキュメント
  const { loginUser }=UseFirebaseUserLogin("user");

  // recoil関係
  const [aid,setAid]=useRecoilState<string>(accountId);

  // ユーザー選択時
  const onClickSelectUser=(id:string)=>{
    setAid(id);
    router.push({
      pathname:"/afterGuestSelectUser/"
    })
  }

  return (
    <Box
      bg="purple.50"
      w="100%"
      minHeight='calc(100vh)'
      pt="16"
      textAlign="center"
    >
      <Text fontWeight="bold" mb="8">
        閲覧する日報を選択してください
      </Text>
      {loginUser.map((lu:user)=>{
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