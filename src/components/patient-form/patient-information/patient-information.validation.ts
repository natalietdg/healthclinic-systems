import * as Yup from 'yup';
import moment from 'moment';

export const PatientInformationFormValidation = Yup.object().shape({
    fullName: Yup.string().min(3).max(100).required(),
    dateOfBirth: Yup.string().matches(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/).required(),
    ic: Yup.string().matches(/$dateOfBirth/),
    gender: Yup.mixed().oneOf(['MALE, FEMALE']).required(),
    race: Yup.mixed().oneOf(['CHINESE', 'MALAY', 'INDIAN', 'OTHERS']).required(),
    educationLevel: Yup.mixed().oneOf(['SECONDARY SCHOOL', 'BACHELORS', 'MASTERS', 'PHD']).optional(),
    state: Yup.string().required(),
    reasonForConsultation: Yup.string().required(),
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
    familyHistory: Yup.object().shape({
        heartDisease: Yup.boolean().required(),
        heartAttack: Yup.boolean().required(),
        stroke: Yup.boolean().required(),
        elevatedCholesterol: Yup.boolean().required(),
        elevatedTriglyceries: Yup.boolean().required(),
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
    }),
    smokingStatus: Yup.object().shape({
        status: Yup.mixed().oneOf([true, false, 'Ex-Smoker']),
        cigarettesPerDay: Yup.mixed().when('status', {
            is: Yup.mixed().oneOf([true, 'Ex-Smoker']),
            then: Yup.object().shape({
                min: Yup.number().required(),
                max: Yup.number().required()
            })
        }),
        lastSmoked: Yup.mixed().when('status', {
            is: 'Ex-Smoker',
            then: Yup.date()
        }),
        yearsSmoked: Yup.mixed().when('status', {
            is: Yup.mixed().oneOf([true, 'Ex-Smoker']),
            then: Yup.number().required()
        }),
    }),
    eCigaretteStatus: Yup.object().shape({
        status: Yup.mixed().oneOf([true, false, 'Ex-Smoker']),
        nicotineAmt: Yup.mixed().when('status', {
            is: Yup.mixed().oneOf([true, 'Ex-Smoker']),
            then: Yup.object().shape({
                amt: Yup.number().required(),
            })
        }),
        lastSmoked: Yup.mixed().when('status', {
            is: 'Ex-Smoker',
            then: Yup.date().required()
        }),
        yearsSmoked: Yup.mixed().when('status', {
            is: Yup.mixed().oneOf([true, 'Ex-Smoker']),
            then: Yup.number().required()
        }),
        familyHasSmoker: Yup.boolean().required(),
        causeOfSmoking: Yup.mixed().when('status', {
            is: Yup.mixed().oneOf([true, 'Ex-Smoker']),
            then: Yup.string().required()
        }),
        ageOfSmoking: Yup.number().required()
    })

})