import * as Yup from 'yup';

export const PersonalInformationFormValidation = Yup.object().shape({
    profilePicBlob: Yup.string().optional(),
    fullName: Yup.string().min(3).max(100).required(),
    phoneNumber: Yup.string().matches(/01(\d){8}/g).required(),
    email: Yup.string().min(3).max(100).matches(/(([\w0-9!@#$^&*]){0,100})[a-z]*mail.com/).required(),
    dateOfBirth: Yup.string().matches(/\d{4}-\d{2}-\d{2}/).required(),
    ic: Yup.string().max(12).required(),
    gender: Yup.mixed().oneOf(['M', 'F']).required(),
    race: Yup.mixed().oneOf(['CH', 'MA', 'IN', 'OT']).required(),
    // reasonForConsultation: Yup.string().min(3).max(1000).required(),
})