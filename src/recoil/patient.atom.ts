import { atom } from 'recoil';

export type CommentType = {
    id: number;
    created: string;
    diagnosis: string;
    comment: string;
    image: object;
    updated: string;
    user: object;
}

export const commentAtom = atom<CommentType[]>({
    key: 'commentAtom',
    default: [{
        id: -1,
        diagnosis: '',
        comment: '',
        image: [],
        user: {},
        created: '',
        updated: '',
    }]
})


