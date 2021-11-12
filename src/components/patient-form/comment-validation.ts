import * as Yup from 'yup';

export const CommentValidation = Yup.object().shape({
    // id: Yup.string().optional(),
    diagnosis: Yup.string().min(3).max(1000).required(),
    comment: Yup.string().min(3).max(1000).required(),
    // user: Yup.object().shape({
    //     url: Yup.string().required(),
    //     id: Yup.number().required(),
    //     username: Yup.string().required(),
    // }).required()
})