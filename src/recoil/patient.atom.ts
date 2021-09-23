import { atom } from 'recoil';

export type PatientInformationType = {
    fullName: string;
    profilePic: string;
    ic: string;
    gender: string;
    race: string;
    dateOfBirth: moment.Moment | undefined;
    educationLevel: string;
    address: {
        street1: string;
        street2: string;
        postcode: string;
        country: string;
        city: string;
        state: string;
    },
    reasonForConsultation: string;
    healthHistory: {
        heartDisease: boolean;
        heartAttack: boolean;
        stroke: boolean;
        elevatedCholesterol: boolean;
        elevatedTriglycerides: boolean;
        diabetes: boolean;
        hypertension: boolean;
        sleepingDisorder: boolean;
        otherVascularCondition: boolean;
        otherVascularConditionName?: string;
        otherVascularConditionYears?: string;
    },
    familyHistory: {
        heartDisease: boolean;
        heartAttack: boolean;
        stroke: boolean;
        elevatedCholesterol: boolean;
        elevatedTriglycerides: boolean;
        diabetes: boolean;
        hypertension: boolean;
        sleepingDisorder: boolean;
        otherVascularCondition: boolean;
        otherVascularConditionName?: string;
        otherVascularConditionYears?: string;
    },
    familyHasSmoker: string;
    smokingStatus: {
        status: string;
        cigarettesPerDay?: {
            min: number;
            max: number;
        }
        lastSmoked?: moment.Moment;
        yearsSmoked?: number;
        // familyHasSmoker: boolean;
        causeOfSmoking?: string;
        startedSmokingAge: number;
    }
    eCigaretteStatus: {
        status: string;
        nicotineAmt?: {
            amt: number;
        },
        lastSmoked?: moment.Moment;
        yearsSmoked?: number;
        // familyHasSmoker: boolean;
        causeOfSmoking?: string;
        startedSmokingAge: number;
    },
    alcoholStatus: {
        status: string;
        alcoholType: string;
    }
}

export const patientInformationAtom = atom<PatientInformationType>({
    key: 'patientInformationAtom',
    default: {
        fullName: '',
        profilePic: '',
        ic: '980819232122',
        gender: 'male',
        race: 'chinese',
        educationLevel: 'bachelors',
        dateOfBirth: undefined,
        address: {
            street1: '',
            street2: '',
            postcode: '',
            country: '',
            city: '',
            state: ''
        },
        reasonForConsultation: "",
        healthHistory: {
            heartDisease: true,
            heartAttack: true,
            stroke: true,
            elevatedCholesterol: true,
            elevatedTriglycerides: true,
            diabetes: true,
            hypertension: false,
            sleepingDisorder: true,
            otherVascularCondition: false,
            otherVascularConditionName: '',
            otherVascularConditionYears: ''
        },
        familyHistory: {
            heartDisease: false,
            heartAttack: false,
            stroke: true,
            elevatedCholesterol: false,
            elevatedTriglycerides: true,
            diabetes: true,
            hypertension: false,
            sleepingDisorder: true,
            otherVascularCondition: true,
            otherVascularConditionName: '',
            otherVascularConditionYears: ''
        },
        familyHasSmoker: '',
        smokingStatus: {
            status: '',
            cigarettesPerDay: {
                min: 1,
                max: 9
            },
            lastSmoked: undefined,
            yearsSmoked: 0,
            causeOfSmoking: '',
            startedSmokingAge: 0,
        },
        eCigaretteStatus: {
            status: '',
            nicotineAmt: {
                amt: 0,
            },
            lastSmoked: undefined,
            yearsSmoked: 0,
            causeOfSmoking: '',
            startedSmokingAge: 0,
        },
        alcoholStatus: {
            status: '',
            alcoholType: ''
        }
    }
})