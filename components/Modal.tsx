import React from 'react'
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { isOwner } from '../states/isOwner';
import { deleteDoc, doc } from 'firebase/firestore';
import firestore from '../firebase';
import { accountId } from '../states/accountId';
import { groupId } from '../states/groupId';
import { Box, Button, Text } from '@chakra-ui/react';

type modal ={
  modal : boolean,
  closeModal : ()=> void,
  date : string,
  isDone : boolean,
  nippouId: string,
  dataId : string,
  password : string,
  callenderId : string,
};

const Modal = (props:modal) => {

  const {modal,closeModal,date,isDone,nippouId,dataId,password,callenderId}=props;
  
  const router = useRouter();

  // recoil関係
  const [owner,setOwner]=useRecoilState<boolean>(isOwner);
  const [aid,setAid]=useRecoilState<string>(accountId);
  const [gid,setGid]=useRecoilState<string>(groupId);

  // 日報作成時
  const onClickCreate=()=>{
    router.push({
      pathname: `/nippou/form/${date}/`,
      query: {date:date,dataId:dataId,password:password}
    })
  }

  // 日報編集時
  const onClickEdit=()=>{
    router.push({
      pathname: `/nippou/edit/${date}/`,
      query: {date:date,nippouId:nippouId}
    })
  }

  // 日報削除時
  const onClickDelete= async ()=>{
    const answer=window.confirm("本当に削除しますか");
    // 削除確認後の処理
    if (answer) {
      const docNippou = doc(firestore,"user",aid,"certification",gid,"nippou",nippouId);
      await deleteDoc(docNippou);
      const docCallender = doc(firestore,"user",aid,"certification",gid,"callender",callenderId);
      await deleteDoc(docCallender);
      closeModal();
    }
  }

  // 日報レビュー時
  const onClickReview=()=>{
    router.push({
      pathname: `/nippou/review/${date}/`,
      query: {date:date,nippouId:nippouId}
    })
  }

  // スタイル
  const overlay: { [key: string]: string | number }={
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
    height: "40%",
    padding: "1em",
    background:"#E9D8FD",
    borderRadius: "10%"
  }

  return (
    <Box>
      {
        modal ? (
          <Box style={overlay}>
            <Box style={content}>
              <Text
                textAlign="center"
                fontWeight="bold"
                fontSize="2xl"
                mb="4"
              >
                {date}
              </Text>
              {owner ? (
                isDone ? (
                    <Box textAlign="center">
                      <Button mb="4" size="lg" onClick={()=>{onClickEdit()}}>日報編集へ</Button>
                      <br />
                      <Button mb="4" size="lg" onClick={()=>{onClickDelete()}}>日報削除</Button>
                    </Box>
                ) : (
                  <Box textAlign="center">
                    <Button mb="4" size="lg" onClick={()=>{onClickCreate()}}>日報作成へ</Button>
                  </Box>
                )
              ) : (
                <Text
                  fontWeight="bold"
                  mb="8"
                  textAlign="center"
                >
                  ゲストはレビューのみしかできません。
                  <br />
                  日報作成したいのであればオーナーとしてログインしてください
                </Text>
              )}
              <Box textAlign="center">
                <Button mb="4" size="lg" onClick={()=>{onClickReview()}}>レビューへ</Button>
                <br />
                <Button size="lg" onClick={closeModal}>close</Button>
              </Box>
            </Box>
          </Box>
        ) : (
          null
        )
      }
    </Box>
  )
}

export default Modal