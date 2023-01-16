import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: typeof window === "undefined" ? undefined : sessionStorage
});

export const accountName=atom<any>({
  key: "accountName",
  default: "",
  effects_UNSTABLE: [persistAtom]
});