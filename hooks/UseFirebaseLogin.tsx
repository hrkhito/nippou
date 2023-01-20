import { useEffect, useState } from 'react'
import { collection, onSnapshot } from "firebase/firestore"
import firestore from '../firebase'
import { useRecoilState } from "recoil"
import { accountId } from '../states/accountId'
import { certification } from '../types/certification'

export const UseFireBaseLogin = (parent:string,data:string) => {

  const [login, setLogin] = useState<Array<certification>>([])

  // recoil
  const [aid,setAid]=useRecoilState<string>(accountId)

  useEffect(()=>{
    const docRef = collection(firestore,parent,aid,data)

    const unsub = onSnapshot(docRef, snapshot => {
      let results:Array<certification> = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setLogin(results)
    })
  
    return () => unsub()

  },[parent,data,aid])

  return {login}
}
