import { Timestamp } from "firebase/firestore"

export type nippou={
  id: number,
  date: string,
  gyomu: string,
  good: string,
  bad: string,
  timestamp: Timestamp
}