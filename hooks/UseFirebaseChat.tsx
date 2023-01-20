import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, } from "firebase/firestore"
import firestore from '../firebase'
import { useRecoilState } from "recoil"
import { groupId } from '../states/groupId'
import { accountId } from '../states/accountId'
import { chat } from '../types/chat'

export const UseFireBaseChat = (grandparents:string,parents:string,data:string) => {

  const [chat, setChat] = useState<Array<chat>>([])
  const [gid,setGid]=useRecoilState<string>(groupId);
  const [aid,setAid]=useRecoilState<string>(accountId);

  useEffect(()=>{
    const docRef = collection(firestore,grandparents,aid,parents,gid,data)
    const q = query(docRef,orderBy("timestamp","asc"))

    const unsub = onSnapshot(q, snapshot => {
      let results:Array<chat> = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setChat(results)
    })
  
    return () => unsub()

  },[grandparents,parents,data,aid,gid])

  return {chat}
}
