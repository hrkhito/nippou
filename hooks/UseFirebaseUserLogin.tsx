import { useEffect, useState } from 'react'
import { collection, onSnapshot } from "firebase/firestore"
import firestore from '../firebase'
import { user } from '../types/user'

export const UseFirebaseUserLogin = (data:string) => {

  const [loginUser, setLoginUser] = useState<Array<user>>([])

  useEffect(()=>{
    const docRef = collection(firestore, data)

    const unsub = onSnapshot(docRef, snapshot => {
      let results:Array<user> = [];
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setLoginUser(results)
    })
  
    return () => unsub()

  },[data])

  return {loginUser}
}
