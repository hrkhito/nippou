import React, { useEffect, useState } from 'react'
import { collection ,onSnapshot } from "firebase/firestore"
import firestore from '../firebase'
import { useRecoilState } from "recoil"
import { groupId } from '../states/groupId'

export const UseFireBaseCallender = (parents:any,data:any) => {
  const [documents, setDocuments] = useState([]);
  const [id,setId]:any=useRecoilState(groupId);

  useEffect(()=>{

    const docRef:any = collection(firestore,parents,id,data)
    const unsub = onSnapshot(docRef, snapshot => {
      let results:any = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setDocuments(results);
    })
    return () => unsub()
  },[parents,data,id,setId])
  return {documents}
}
