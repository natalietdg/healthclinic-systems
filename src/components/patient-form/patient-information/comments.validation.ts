import * as Yup from 'yup';

export const CommentsValidation = Yup.object().shape({
    diagnosis: Yup.string().min(3).max(1000).required(),
    comment: Yup.string().min(3).max(1000).required(),
})