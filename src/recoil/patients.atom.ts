import { atom } from 'recoil';

export type createdPatientIDListType = string;

export const createdPatientIDListAtom = atom<createdPatientIDListType[]>({
    key: 'createdPatientIDList',
    default: ['']
})





