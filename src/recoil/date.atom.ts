import { atom } from 'recoil';

export type DateType = {
    todaysDate: string;
    expiryDate: string;
};

export const dateAtom = atom <DateType>({
    key: 'dateAtom',
    default: {
        todaysDate: '',
        expiryDate: ''
    }
})