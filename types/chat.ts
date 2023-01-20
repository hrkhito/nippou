import { Timestamp } from "firebase/firestore"

export type chat={
  message?: string,
  date?: string,
  isowner?: boolean,
  timestamp?: Timestamp,
  id?: string
}