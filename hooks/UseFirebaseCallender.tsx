import React, { useEffect, useState } from 'react'
import { collection ,onSnapshot } from "firebase/firestore"
import firestore from '../firebase'
import { useRecoilState } from "recoil"
import { groupId } from '../states/groupId'
import { accountId } from '../states/accountId'

export const UseFireBaseCallender = (grandparents:any,parents:any,data:any) => {
  const [documents, setDocuments] = useState([]);
  const [gid,setGid]:any=useRecoilState(groupId);
  const [aid,setAid]:any=useRecoilState(accountId)

  useEffect(()=>{

    const docRef:any = collection(firestore,grandparents,aid,parents,gid,data)
    const unsub = onSnapshot(docRef, snapshot => {
      let results:any = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setDocuments(results);
    })
    return () => unsub()
  },[grandparents,parents,data,gid,aid,setGid])
  return {documents}
}
