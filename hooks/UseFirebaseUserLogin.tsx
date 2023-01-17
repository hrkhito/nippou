import { useEffect, useState } from 'react'
import { collection, onSnapshot } from "firebase/firestore"
import firestore from '../firebase'

export const UseFireBaseLoginUser = (data:any) => {

  const [loginUser, setLoginUser] = useState([])

  useEffect(()=>{
    const docRef = collection(firestore, data)

    const unsub = onSnapshot(docRef, snapshot => {
      let results:any = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setLoginUser(results)
    })
  
    return () => unsub()

  },[data])

  return {loginUser}
}
