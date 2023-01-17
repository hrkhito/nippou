import { useEffect, useState } from 'react'
import { collection, onSnapshot } from "firebase/firestore"
import firestore from '../firebase'
import { useRecoilState } from "recoil"
import { groupId } from '../states/groupId'
import { accountId } from '../states/accountId'

export const UseFireBaseNippou = (grandparents:any,parents:any,data:any) => {

  const [nippou,setNippou] = useState([])
  const [gid,setGid]:any=useRecoilState(groupId);
  const [aid,setAid]:any=useRecoilState(accountId);

  useEffect(()=>{
    const docRef = collection(firestore,grandparents,aid,parents,gid,data)

    const unsub = onSnapshot(docRef, snapshot => {
      let results:any = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setNippou(results)
    })
  
    return () => unsub()

  },[grandparents,aid,gid,parents,data])

  return {nippou}
}
