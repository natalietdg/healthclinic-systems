import { atom } from 'recoil';

type Status = 'idle' | 'loading' | 'success' | 'error';

export type authActionStatusType = {
    login: Status;
    logout: Status;
    patientInfo: Status;
}

export const AuthActionStatusAtom = atom<authActionStatusType>({
    key: 'authActionStatusAtom',
    default: {
        login: 'idle',
        logout: 'idle',
        patientInfo: 'idle'
    }
});