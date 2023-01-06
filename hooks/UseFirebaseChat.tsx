import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, } from "firebase/firestore"
import firestore from '../firebase'
import { useRecoilState } from "recoil"
import { groupId } from '../states/groupId'

export const UseFireBaseChat = (parents:any,data:any) => {

  const [chat, setChat] = useState([])
  const [id,setId]:any=useRecoilState(groupId);

  useEffect(()=>{
    const docRef = collection(firestore,parents,id,data)
    const q = query(docRef,orderBy("timestamp","asc"))

    const unsub = onSnapshot(q, snapshot => {
      let results:any = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setChat(results)
    })
  
    return () => unsub()

  },[parents,data,id])

  return {chat}
}
