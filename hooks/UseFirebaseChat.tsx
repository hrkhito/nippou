import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, } from "firebase/firestore"
import firestore from '../firebase'
import { useRecoilState } from "recoil"
import { groupId } from '../states/groupId'
import { accountId } from '../states/accountId'

export const UseFireBaseChat = (grandparents:any,parents:any,data:any) => {

  const [chat, setChat] = useState([])
  const [gid,setGid]:any=useRecoilState(groupId);
  const [aid,setAid]:any=useRecoilState(accountId);

  useEffect(()=>{
    const docRef = collection(firestore,grandparents,aid,parents,gid,data)
    const q = query(docRef,orderBy("timestamp","asc"))

    const unsub = onSnapshot(q, snapshot => {
      let results:any = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setChat(results)
    })
  
    return () => unsub()

  },[grandparents,parents,data,aid,gid])

  return {chat}
}
