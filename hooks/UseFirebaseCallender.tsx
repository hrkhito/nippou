import { useEffect, useState } from 'react'
import { collection ,onSnapshot } from "firebase/firestore"
import firestore from '../firebase'
import { useRecoilState } from "recoil"
import { groupId } from '../states/groupId'
import { accountId } from '../states/accountId'
import { callender } from '../types/callender'

export const UseFireBaseCallender = (grandparents:string,parents:string,data:string) => {
  const [documents, setDocuments] = useState<Array<callender>>([]);
  const [gid,setGid]=useRecoilState<string>(groupId);
  const [aid,setAid]=useRecoilState<string>(accountId)

  useEffect(()=>{
    const docRef = collection(firestore,grandparents,aid,parents,gid,data)
    const unsub = onSnapshot(docRef, snapshot => {
      let results:Array<callender> = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setDocuments(results);
    })
    return () => unsub()
  },[grandparents,parents,data,gid,aid,setGid])
  return {documents}
}
