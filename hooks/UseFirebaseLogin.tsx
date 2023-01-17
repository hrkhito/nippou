import { useEffect, useState } from 'react'
import { collection, onSnapshot } from "firebase/firestore"
import firestore from '../firebase'
import { useRecoilState } from "recoil"
import { accountId } from '../states/accountId'

export const UseFireBaseLogin = (parent:any,data:any) => {

  const [login, setLogin] = useState([])

  // recoil
  const [aid,setAid]=useRecoilState(accountId)

  useEffect(()=>{
    const docRef = collection(firestore,parent,aid,data)

    const unsub = onSnapshot(docRef, snapshot => {
      let results:any = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setLogin(results)
    })
  
    return () => unsub()

  },[parent,data,aid])

  return {login}
}
