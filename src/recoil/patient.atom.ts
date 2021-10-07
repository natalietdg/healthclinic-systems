import { atom } from 'recoil';
import { string } from 'yup/lib/locale';

export type PatientInformationType = {
    weight: number;
    height: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    // fullName: string;
    profilePicBlob: object;
    ic: string;
    gender: string;
    race: string;
    dateOfBirth: moment.Moment | undefined;
    // educationLevel: string;
    // address: {
    //     street1: string;
    //     street2: string;
    //     postcode: string;
    //     country: string;
    //     city: string;
    //     state: string;
    // },
    reasonForConsultation: string;
    healthHistory: {
        // heartDisease: boolean;
        heartAttack: boolean;
        // stroke: boolean;
        highCholesterol: boolean;
        // elevatedTriglycerides: boolean;
        diabetes: boolean;
        hypertension: boolean;
        // sleepingDisorder: boolean;
        // otherVascularCondition: boolean;
        // otherVascularConditionName?: string;
        // otherVascularConditionYears?: string;
    },
    familyHistory: {
        // heartDisease: boolean;
        heartAttack: boolean;
        // stroke: boolean;
        highCholesterol: boolean;
        // elevatedTriglycerides: boolean;
        diabetes: boolean;
        hypertension: boolean;
        // sleepingDisorder: boolean;
        // otherVascularCondition: boolean;
        // otherVascularConditionName?: string;
        // otherVascularConditionYears?: string;
    },
    lifestyleInformation: {
        eightHoursOfSleep: boolean;
        stress: boolean;
        meat: boolean;
        exercise: boolean;
        fruits: boolean;
        friedFood: boolean;
        processedFood: boolean;
        vegetables: boolean;
        smoking: boolean;
        overweight: boolean;
    },
    comments: {
        created: string;
        diagnosis: string;
        comments: string;
    }[],
    // smoking: boolean;
    // familyHasSmoker: string;
    // smokingStatus: {
    //     status: string;
    //     cigarettesPerDay?: {
    //         min: number;
    //         max: number;
    //     };
    //     lastSmoked?: moment.Moment;
    //     yearsSmoked?: number;
    //     // familyHasSmoker: boolean;
    //     causeOfSmoking?: string;
    //     startedSmokingAge: number;
    // }
    // eCigaretteStatus: {
    //     status: string;
    //     nicotineAmt?: {
    //         amt: number;
    //     };
    //     lastSmoked?: moment.Moment;
    //     yearsSmoked?: number;
    //     // familyHasSmoker: boolean;
    //     causeOfSmoking?: string;
    //     startedSmokingAge: number;
    // },
    // alcoholStatus: {
    //     status: string;
    //     alcoholType?: string;
    //     avgAlcoholConsumption?: {
    //         min: number;
    //         max: number;
    //     };
    //     lastDrank?: moment.Moment;
    //     yearsConsumed?: number;
    //     familyAlcoholic: boolean;
    //     causeOfDrinking: string;
    //     startedDrinkingAge: number;
    // },
    // dietaryInformation: {
    //     diet: string;
    //     vegetableServing: {
    //         min: number;
    //         max: number;
    //     };
    //     carbsServing: {
    //         min: number;
    //         max: number;
    //     };
    //     fruitServing: {
    //         min: number;
    //         max: number;
    //     };
    //     avgEggConsumption: {
    //         min: number;
    //         max: number;
    //     };
    //     egg: {
    //         type: string;
    //         cookingMethod: string;
    //     };
    //     friedFood: {
    //         avgConsumption: {
    //             min: number;
    //             max: number;
    //         };
    //         sourceOfFriedFood: string;
    //     };
    //     oilUsedType: {
    //         oliveOil: boolean;
    //         palmOil: boolean;
    //         soybeanOil: boolean;
    //         canolaOil: boolean;
    //         cornOil: boolean;
    //         peanutOil: boolean;
    //         otherVegetableOils: boolean;
    //         butter: boolean;
    //         lard: boolean;
    //     };
    //     optForFishAndPoultry: boolean;
    //     avgConsumptionOfFriedAndRedMeat: {
    //         min: number;
    //         max: number;
    //     };
    //     avgConsumptionOfFastFood: {
    //         min: number;
    //         max: number;
    //     };
    //     lactoseIntolerant: boolean;
    //     avgConsupmtionOfDairy?: {
    //         min: number;
    //         max: number;
    //     };
    //     avgConsumptionOfDrinks: {
    //         min: number;
    //         max: number;
    //     };
    //     avgConsumptionOfDesserts: {
    //         min: number;
    //         max: number;
    //     };
    //     avgConsumptionOfSnacks: {
    //         min: number;
    //         max: number;
    //     };
    //     avgConsumptionOfProcessedFoods: {
    //         min: number;
    //         max: number;
    //     };
    //     dailyDietaryIntake: {
    //         coffeeIntake: {
    //             coffeeType: string;
    //             noOfCups: number;
    //         };
    //         cupsOfTea: number;
    //         glassesOfSoda: number;
    //         sugarAmt: number;
    //         sweetsAmt: number;
    //         chocolateAmt: number;
    //         alcohol: number;
    //         fruitsIntake: number;
    //         vegetableIntake: number;
    //     }
    // }
}

export const patientInformationAtom = atom<PatientInformationType>({
    key: 'patientInformationAtom',
    default: {
        weight: 0,
        height: 0,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        profilePicBlob: {},
        ic: '',
        gender: '',
        race: '',
        // educationLevel: 'bachelors',
        dateOfBirth: undefined,
        // address: {
        //     street1: '',
        //     street2: '',
        //     postcode: '',
        //     country: '',
        //     city: '',
        //     state: ''
        // },
        reasonForConsultation: "",
        healthHistory: {
            // heartDisease: false,
            heartAttack: false,
            // stroke: false,
            highCholesterol: false,
            // elevatedTriglycerides: false,
            diabetes: false,
            hypertension:  false,
            // sleepingDisorder: false,
            // otherVascularCondition: false,
            // otherVascularConditionName: '',
            // otherVascularConditionYears: ''
        },
        familyHistory: {
            // heartDisease: false,
            heartAttack: false,
            // stroke: false,
            highCholesterol: false,
            // elevatedTriglycerides: false,
            diabetes: false,
            hypertension: false,
            // sleepingDisorder: false,
            // otherVascularCondition: false,
            // otherVascularConditionName: '',
            // otherVascularConditionYears: ''
        },
        lifestyleInformation: {
            eightHoursOfSleep: false,
            stress: false,
            meat: false,
            exercise: false,
            fruits: false,
            friedFood: false,
            processedFood: false,
            vegetables: false,
            smoking: false,
            overweight: false,
        },
        comments: [
            {
                created: '',
                diagnosis: '',
                comments:''
            },
        ]
        // familyHasSmoker: '',
        // smokingStatus: {
        //     status: '',
        //     cigarettesPerDay: {
        //         min: 1,
        //         max: 9
        //     },
        //     lastSmoked: undefined,
        //     yearsSmoked: 0,
        //     causeOfSmoking: '',
        //     startedSmokingAge: 0,
        // },
        // eCigaretteStatus: {
        //     status: '',
        //     nicotineAmt: {
        //         amt: 0,
        //     },
        //     lastSmoked: undefined,
        //     yearsSmoked: 0,
        //     causeOfSmoking: '',
        //     startedSmokingAge: 0,
        // },
        // alcoholStatus: {
        //     status: '',
        //     alcoholType: '',
        //     avgAlcoholConsumption: {
        //         min: 0,
        //         max: 0
        //     },
        //     lastDrank: undefined,
        //     yearsConsumed: 0,
        //     familyAlcoholic: false,
        //     causeOfDrinking: '',
        //     startedDrinkingAge:0,
        // },
        // dietaryInformation: {
        //     diet: '',
        //     vegetableServing: {
        //         min: 0,
        //         max: 0,
        //     },
        //     carbsServing: {
        //         min: 0,
        //         max: 0,
        //     },
        //     fruitServing: {
        //         min: 0,
        //         max: 0,
        //     },
        //     avgEggConsumption: {
        //         min: 0,
        //         max: 0,
        //     },
        //     egg: {
        //         type: '',
        //         cookingMethod: '',
        //     },
        //     friedFood: {
        //         avgConsumption: {
        //             min: 0,
        //             max: 0,
        //         },
        //         sourceOfFriedFood: '',
        //     },
        //     oilUsedType: {
        //         oliveOil: false,
        //         palmOil:  false,
        //         soybeanOil:false,
        //         canolaOil: false,                
        //         cornOil: false, 
        //         peanutOil: false, 
        //         otherVegetableOils: false, 
        //         butter: false, 
        //         lard: false, 
        //     },
        //     optForFishAndPoultry: false, 
        //     avgConsumptionOfFriedAndRedMeat: {
        //         min: 0,
        //         max: 0,
        //     },
        //     avgConsumptionOfFastFood: {
        //         min: 0,
        //         max: 0,
        //     },
        //     lactoseIntolerant: false,
        //     avgConsupmtionOfDairy: {
        //         min: 0,
        //         max: 0,
        //     },
        //     avgConsumptionOfDrinks: {
        //         min: 0,
        //         max: 0,
        //     },
        //     avgConsumptionOfDesserts: {
        //         min: 0,
        //         max: 0,
        //     },
        //     avgConsumptionOfSnacks: {
        //         min: 0,
        //         max: 0,
        //     },
        //     avgConsumptionOfProcessedFoods: {
        //         min: 0,
        //         max: 0,
        //     },
        //     dailyDietaryIntake: {
        //         coffeeIntake: {
        //             coffeeType: '',
        //             noOfCups: 0,
        //         },
        //         cupsOfTea: 0,
        //         glassesOfSoda: 0,
        //         sugarAmt: 0,
        //         sweetsAmt: 0,
        //         chocolateAmt: 0,
        //         alcohol: 0,
        //         fruitsIntake: 0,
        //         vegetableIntake: 0,
        //     }
        // }
    }
})