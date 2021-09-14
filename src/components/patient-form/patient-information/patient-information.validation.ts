import * as Yup from 'yup';

export const PatientInformationFormValidation = Yup.object().shape({
    fullName: Yup.string().min(3).max(100).required(),
    gender: Yup.mixed().oneOf(['MALE, FEMALE']).required(),
    race: Yup.mixed().oneOf(['CHINESE', 'MALAY', 'INDIAN', 'OTHERS']).required(),
    educationLevel: Yup.mixed().oneOf(['SECONDARY SCHOOL', 'BACHELORS', 'MASTERS', 'PHD']).optional(),
    state: Yup.string().required(),
    address: Yup.object().shape({
        street1: Yup.string().min(3).max(100).required(),
        street2: Yup.string().min(3).max(100).optional(),
        postcode: Yup.string().min(3).max(120).required(),
        country: Yup.string().min(3).max(100).required(),
        city: Yup.string().min(3).max(50).required(),
        state: Yup.string().min(3).max(100).required()
    }).required(),
    healthHistory: Yup.object().shape({
        heartDisease: Yup.boolean().required(),
        heartAttack: Yup.boolean().required(),
        stroke: Yup.boolean().required(),
        elevatedCholesterol: Yup.boolean().required(),
        elevatedTriglycerides: Yup.boolean().required(),
        diabetes: Yup.boolean().required(),
        hypertension: Yup.boolean().required(),
        sleepingDisorder: Yup.boolean().required(),
        otherVascularCondition: Yup.boolean().required(),
        otherVascularConditionName: Yup.mixed().when('otherVascularCondition', {
            is: true,
            then: Yup.string().max(100).required()
        }),
        otherVascularConditionYears: Yup.mixed().when('otherVascularCondition', {
            is: true,
            then: Yup.number().required()
        })
    }).required(),
    // familyHistory: Yup.object().shape({
    //     heartDisease: Yup.boolean().required(),
    //     heartAttack: Yup.boolean().required(),
    //     stroke: Yup.boolean().required(),
    //     elevatedCholesterol: Yup.boolean().required(),
    //     elevatedTriglyceries: Yup.boolean().required(),
    //     diabetes: Yup.boolean().required(),
    //     hypertension: Yup.boolean().required(),
    //     sleepingDisorder: Yup.boolean().required(),
    //     otherVascularCondition: Yup.boolean().required(),
    //     otherVascularConditionName: Yup.mixed().when('otherVascularCondition', {
    //         is: true,
    //         then: Yup.string().max(100).required()
    //     }),
    //     otherVascularConditionYears: Yup.mixed().when('otherVascularCondition', {
    //         is: true,
    //         then: Yup.number().required()
    //     })
    // }).optional(),
    // smokingStatus: Yup.object().shape({
    //     status: Yup.mixed().oneOf([true, false, 'Ex-Smoker']),
    //     cigarettesPerDay: Yup.
    // })
})