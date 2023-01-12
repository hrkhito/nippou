import { ChakraProvider, Box, Heading, Text, Button, Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ExplanatoryModal from '../components/ExplanatoryModal'

const Home: NextPage = () => {

  const [modal,setModal]=useState(false);

  // マウント時に実行したい処理
  useEffect(()=>{
    const explanatoryText = ()=>{
      setModal(true);
    }
    window.setTimeout(explanatoryText,2000);
  },[]);

  // モーダルを閉じる時
  const onClickCloseModal=()=>{
    setModal(false);
  }

  return (
    <>
      {modal ? (
        <ExplanatoryModal modal={modal} onClickCloseModal={onClickCloseModal} />
      ) : (
        null
      )}
      <Box
        bg="purple.50"
        w="100%"
        h='calc(100vh)'
        textAlign="center"
        pt="48"
      >
        <Heading
          as="h1"
          w="88%"
          mr="auto"
          ml="auto"
          mb="24"
          rounded="md"
        >
          日報管理アプリを始めましょう
        </Heading>
        <Text fontWeight="bold" mb="16">
          オーナーアカウントを作成して日報アプリを利用するかゲストとして日報を閲覧するかを選択してください。
        </Text>
        {modal ? (
          null
        ) : (
          <Flex justifyContent="center">
            <Button bg="purple.400" color="white" mr="8">
              <Link href="/owner/">オーナーとして入室する</Link>
            </Button>
            <Button bg="purple.400" color="white">
              <Link href="/guestLogin/">ゲストとして入室する</Link>
            </Button>
          </Flex>
        )}
      </Box>
    </>
  )
}

export default Home
