import React, { useEffect, useState } from 'react'
import { collection, onSnapshot } from "firebase/firestore"
import firestore from '../firebase'
import { useRecoilState } from "recoil"
import { groupId } from '../states/groupId'

export const UseFireBaseNippou = (parents:any,data:any) => {

  const [nippou,setNippou] = useState([])
  const [id,setId]:any=useRecoilState(groupId);

  useEffect(()=>{
    const docRef = collection(firestore,parents,id,data)

    const unsub = onSnapshot(docRef, snapshot => {
      let results:any = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setNippou(results)
    })
  
    return () => unsub()

  },[id,parents,data])

  return {nippou}
}