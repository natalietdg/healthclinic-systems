import { atom } from "recoil"

type Type = 'errors' | 'success' | ''

export type ToasterAtomType = {
    message: string;
    type: Type;
}

export const toasterAtom = atom<ToasterAtomType>({
    key: 'toasterAtom',
    default: {
        message: '',
        type: ''
    }
})