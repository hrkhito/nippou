import React, { useEffect, useState } from 'react'
import { collection, onSnapshot } from "firebase/firestore"
import firestore from '../firebase'

export const UseFireBaseNippou = (data:any) => {

  const [nippou,setNippou] = useState([])

  useEffect(()=>{
    const docRef = collection(firestore, data)

    const unsub = onSnapshot(docRef, snapshot => {
      let results:any = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setNippou(results)
    })
  
    return () => unsub()

  },[data])

  return {nippou}
}
