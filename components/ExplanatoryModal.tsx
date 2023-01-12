import React from 'react'
import { Box, Text, Button, Flex } from '@chakra-ui/react'

const ExplanatoryModal = (props:any) => {

  const {modal,onClickCloseModal}=props;

  // スタイル
  const overlay:any={
    /* 画面全体を覆う設定 */
    position:"fixed",
    top:0,
    left:0,
    width:"100%",
    height:"100%",
    backgroundColor:"rgba(0,0,0,0.5)",
    /* 画面の中央に要素を表示させる設定 */
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const content={
    zIndex:2 ,
    width:"50%",
    padding: "1em",
    backgroundColor:"#FAF5FF"
  }

  return (
    <Box style={overlay}>
      <Box style={content}>
        <Text fontWeight="bold" mb="2">
          この日報管理アプリではオーナーとして日報を作成することができ、ゲストとして他のオーナーの日報を閲覧することもできます。
        </Text>
        <Text fontWeight="bold" mb="2">
          なお、オーナーになるにはusername,userid,userpasswordを作成しなければなりません。
        </Text>
        <Text fontWeight="bold" mb="2">
          また日報作成にあたってもnippouid,nippoupasswordを作成しなければなりません。
        </Text>
        <Text fontWeight="bold" mb="2">
          ゲストとして入出する際も、閲覧したい日報のnippouid,nippoupasswordを入力しなければなりません。
        </Text>
        <Text fontWeight="bold" mb="2">またチャットツールを用いて日報について直接やり取りも行えます！</Text>
        <Flex justifyContent="center">
          <Button bg="purple.400" color="white" onClick={onClickCloseModal}>close</Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default ExplanatoryModal