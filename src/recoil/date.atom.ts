import { atom } from 'recoil';
import { string } from 'yup/lib/locale';

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