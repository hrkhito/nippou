import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import firestore from '../firebase'

export const UseFireBase = (data:any) => {

  const [documents, setDocuments] = useState([])

  useEffect(()=>{
    const docRef = collection(firestore, data)

    const unsub = onSnapshot(docRef, snapshot => {
      let results:any = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setDocuments(results)
    })
  
    return () => unsub()

  },[data])

  return {documents}
}
