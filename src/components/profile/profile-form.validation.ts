import * as Yup from 'yup';

export const ProfileFormValidation = Yup.object().shape({
    name: Yup.string().min(3).max(100).required(),
    phone: Yup.string().matches(/01(\d){8}/g).required(),
    email: Yup.string().min(3).max(100).matches(/(([\w0-9!@#$^&*]){0,100})[a-z]*mail.com/).required(),
    dob: Yup.string().matches(/\d{4}-\d{2}-\d{2}/).required(),
    ic: Yup.string().max(12).required(),
    gender: Yup.mixed().oneOf(['M', 'F']).required(),
    race: Yup.mixed().oneOf(['CH', 'MA', 'IN', 'OT']).required(),
})