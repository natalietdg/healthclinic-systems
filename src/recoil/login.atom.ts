import { atom } from "recoil";

export type LoginAtomType = {
    state: 'success' | 'error' | 'idle',
}

export const loginAtom = atom<LoginAtomType>({
    key: 'loginAtom',
    default: {
        state: 'idle'
    },
});
