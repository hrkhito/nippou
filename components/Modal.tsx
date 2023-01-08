import React from 'react'
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { isOwner } from '../states/isOwner';

const Modal = (props:any) => {

  const {modal,closeModal,date,isDone,nippouId,dataId,password}=props;
  
  const router = useRouter();

  // recoil関係
  const [owner,setOwner]:any=useRecoilState(isOwner);
  console.log(owner);

  const onClickCreate=()=>{
    router.push({
      pathname: `/nippou/form/${date}/`,
      query: {date:date,dataId:dataId,password:password}
    })
  }

  const onClickEdit=()=>{
    router.push({
      pathname: `/nippou/edit/${date}/`,
      query: {date:date,nippouId:nippouId}
    })
  }

  const onClickReview=()=>{
    router.push({
      pathname: `/nippou/review/${date}/`,
      query: {date:date,nippouId:nippouId}
    })
  }

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
    background:"#fff"
  }

  return (
    <>
      {
        modal ? (
          <div style={overlay}>
            <div style={content}>
              <p>date:{date}</p>
              {owner ? (
                isDone ? (
                  <p><button onClick={()=>{onClickEdit()}}>日報編集へ</button></p>
                ) : (
                  <p><button onClick={()=>{onClickCreate()}}>日報作成へ</button></p>
                )
              ) : (
                <p>ゲストはレビューのみしかできません。日報作成したいのであればオーナーとしてログインしてください</p>
              )}
              <p><button onClick={()=>{onClickReview()}}>レビューへ</button></p>
              <p><button onClick={closeModal}>close</button></p>
            </div>
          </div>
        ) : (
          null
        )
      }
    </>
  )
}

export default Modal