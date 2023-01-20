import { useEffect, useState } from 'react'
import { collection, onSnapshot } from "firebase/firestore"
import firestore from '../firebase'
import { useRecoilState } from "recoil"
import { groupId } from '../states/groupId'
import { accountId } from '../states/accountId'
import { nippou } from '../types/nippou'

export const UseFireBaseNippou = (grandparents:string,parents:string,data:string) => {

  const [nippou,setNippou] = useState<Array<nippou>>([])
  const [gid,setGid]=useRecoilState<string>(groupId);
  const [aid,setAid]=useRecoilState<string>(accountId);

  useEffect(()=>{
    const docRef = collection(firestore,grandparents,aid,parents,gid,data)

    const unsub = onSnapshot(docRef, snapshot => {
      let results:Array<nippou> = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setNippou(results)
    })
  
    return () => unsub()

  },[grandparents,aid,gid,parents,data])

  return {nippou}
}
