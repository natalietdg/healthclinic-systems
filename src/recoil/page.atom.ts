import { atom } from "recoil";

export type PageAtomType = {
    page: number;
    error: object;
}

export const pageAtom = atom<PageAtomType>({
    key: 'pageAtom',
    default: {
        page: 0,
        error: {}
    },
});
