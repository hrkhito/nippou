import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: typeof window === "undefined" ? undefined : sessionStorage
});

export const isOwner=atom<boolean>({
  key: "isOwner",
  default: false,
  effects_UNSTABLE: [persistAtom]
});