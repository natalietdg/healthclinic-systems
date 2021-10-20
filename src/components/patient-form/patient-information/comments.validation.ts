import * as Yup from 'yup';

export const CommentsValidation = Yup.object().shape({
    comments: Yup.array().of(
        Yup.object().shape({
            id: Yup.string().optional(),
            diagnosis: Yup.string().min(3).max(1000).required(),
            comment: Yup.string().min(3).max(1000).required(),
            user: Yup.object().shape({
                url: Yup.string().required(),
                id: Yup.number().required(),
                username: Yup.string().required(),
            }),
            images: Yup.array().of(Yup.object().shape({

            }))
        })
    ).optional()
})