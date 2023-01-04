import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, } from "firebase/firestore"
import firestore from '../firebase'

export const UseFireBaseChat = (data:any) => {

  const [chat, setChat] = useState([])

  useEffect(()=>{
    const docRef = collection(firestore, data)
    const q = query(docRef,orderBy("timestamp","asc"))

    const unsub = onSnapshot(q, snapshot => {
      let results:any = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setChat(results)
    })
  
    return () => unsub()

  },[data])

  return {chat}
}
