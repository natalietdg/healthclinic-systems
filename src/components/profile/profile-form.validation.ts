import * as Yup from 'yup';

export const ProfileFormValidation = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().matches(/^(?=.*[AZa-z])(?=.*\d+)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/).required(),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match").required()
})