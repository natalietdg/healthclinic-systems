import * as Yup from 'yup';

export const LoginFormValidation = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
})