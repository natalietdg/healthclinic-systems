import * as Yup from 'yup';
import moment from 'moment';

export const PatientInformationFormValidation = Yup.object().shape({
    weight: Yup.number().min(20).required(),
    height: Yup.number().min(1).required(),
    profilePic: Yup.string().optional(),
    fullName: Yup.string().min(3).max(100).required(),
    phoneNumber: Yup.string().matches(/01(\d){8}/).required(),
    // dateOfBirth: Yup.string().matches(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/).required(),
    ic: Yup.string().matches(/$dateOfBirth/),
    gender: Yup.mixed().oneOf(['M, F']).required(),
    race: Yup.mixed().oneOf(['CH', 'MA', 'IN', 'OT']).required(),
    // educationLevel: Yup.mixStomach pain is caused by bacterial infection in the coloned().oneOf(['SECONDARY SCHOOL', 'BACHELORS', 'MASTERS', 'PHD']).optional(),
    // state: Yup.string().required(),
    reasonForConsultation: Yup.string().min(3).max(1000).required(),
    // address: Yup.object().shape({
    //     street1: Yup.string().min(3).max(100).required(),
    //     street2: Yup.string().min(3).max(100).optional(),
    //     postcode: Yup.string().min(3).max(120).required(),
    //     country: Yup.string().min(3).max(100).required(),
    //     city: Yup.string().min(3).max(50).required(),
    //     state: Yup.string().required()
    // }).required(),
    healthHistory: Yup.object().shape({
        // heartDisease: Yup.boolean().required(),
        heartAttack: Yup.boolean().required(),
        // stroke: Yup.boolean().required(),
        highCholesterol: Yup.boolean().required(),
        // elevatedTriglycerides: Yup.boolean().required(),
        diabetes: Yup.boolean().required(),
        hypertension: Yup.boolean().required(),
        // sleepingDisorder: Yup.boolean().required(),
        // otherVascularCondition: Yup.boolean().required(),
        // otherVascularConditionName: Yup.mixed().when('otherVascularCondition', {
        //     is: true,
        //     then: Yup.string().max(100).required()
        // }),
        // otherVascularConditionYears: Yup.mixed().when('otherVascularCondition', {
        //     is: true,
        //     then: Yup.number().required()
        // })
    }).required(),
    familyHistory: Yup.object().shape({
        // heartDisease: Yup.boolean().required(),
        heartAttack: Yup.boolean().required(),
        // stroke: Yup.boolean().required(),
        highCholesterol: Yup.boolean().required(),
        // elevatedTriglyceries: Yup.boolean().required(),
        diabetes: Yup.boolean().required(),
        hypertension: Yup.boolean().required(),
        // sleepingDisorder: Yup.boolean().required(),
        // otherVascularCondition: Yup.boolean().required(),
        // otherVascularConditionName: Yup.mixed().when('otherVascularCondition', {
        //     is: true,
        //     then: Yup.string().max(100).required()
        // }),
        // otherVascularConditionYears: Yup.mixed().when('otherVascularCondition', {
        //     is: true,
        //     then: Yup.number().required()
        // })
    }).required(),
    lifestyleInformation: Yup.object().shape({
        eightHoursOfSleep: Yup.boolean().required(),
        stress: Yup.boolean().required(),
        meat: Yup.boolean().required(),
        exercise: Yup.boolean().required(),
        fruits: Yup.boolean().required(),
        friedFood: Yup.boolean().required(),
        processedFood: Yup.boolean().required(),
        vegetables: Yup.boolean().required(),
        smoking: Yup.boolean().required(),
        overweight: Yup.boolean().required()
    }).required()
    // dailyDietaryIntake: Yup.object().shape({
    //     coffeeIntake: Yup.object().shape({
    //         coffeeType: Yup.string().required(),
    //         noOfCups: Yup.number().required(),
    //     }).required(),
    //     cupsOfTea: Yup.number().required(),
    //     glassesOfSoda: Yup.number().required(),
    //     sugarAmt: Yup.number().max(4, "Not valid").required(),
    //     sweetsAmt: Yup.number().required(),
    //     chocolateAmt: Yup.number().required(),
    //     alcohol: Yup.number().required(),
    //     fruitsIntake: Yup.number().required(),
    //     vegetableIntake: Yup.number().required(),

    // })
    // smokingStatus: Yup.object().shape({
    //     status: Yup.mixed().oneOf(['true', 'false', 'Ex-Smoker']),
    //     cigarettesPerDay: Yup.mixed().when('status', {
    //         is: Yup.mixed().oneOf(['true', 'Ex-Smoker']),
    //         then: Yup.object().shape({
    //             min: Yup.number().required(),
    //             max: Yup.number().required()
    //         })
    //     }),
    //     lastSmoked: Yup.mixed().when('status', {
    //         is: 'Ex-Smoker',
    //         then: Yup.date()
    //     }),
    //     yearsSmoked: Yup.mixed().when('status', {
    //         is: Yup.mixed().oneOf(['true', 'Ex-Smoker']),
    //         then: Yup.number().required()
    //     }),
    //     familyHasSmoker: Yup.boolean().required(),
    //     causeOfSmoking: Yup.mixed().when('status', {
    //         is: Yup.mixed().oneOf(['true', 'Ex-Smoker']),
    //         then: Yup.mixed().oneOf(['Stress', 'Social', 'Friends/Family'])
    //     }),
    //     startedSmokingAge: Yup.number().required()
    // }),
    // eCigaretteStatus: Yup.object().shape({
    //     status: Yup.mixed().oneOf(['true', 'false', 'Ex-Smoker']),
    //     nicotineAmt: Yup.mixed().when('status', {
    //         is: Yup.mixed().oneOf(['true', 'Ex-Smoker']),
    //         then: Yup.object().shape({
    //             amt: Yup.number().required(),
    //         })
    //     }),
    //     lastSmoked: Yup.mixed().when('status', {
    //         is: 'Ex-Smoker',
    //         then: Yup.date().required()
    //     }),
    //     yearsSmoked: Yup.mixed().when('status', {
    //         is: Yup.mixed().oneOf(['true', 'Ex-Smoker']),
    //         then: Yup.number().required()
    //     }),
    //     familyHasSmoker: Yup.boolean().required(),
    //     causeOfSmoking: Yup.mixed().when('status', {
    //         is: Yup.mixed().oneOf(['true', 'Ex-Smoker']),
    //         then: Yup.mixed().oneOf(['Stress', 'Social', 'Friends/Family'])
    //     }),
    //     startedSmokingAge: Yup.number().required()
    // }),
    // alcoholStatus: Yup.object().shape({
    //     status: Yup.string().required(),
    //     alcoholType: Yup.mixed().when('status', {
    //         is: Yup.mixed().oneOf(['true', 'Reformed Alcoholic']),
    //         then: Yup.string().required()
    //     }),
    //     avgAlcoholConsumption: Yup.mixed().when('status', {
    //         is: Yup.mixed().oneOf(['true', 'Reformed Alcoholic']),
    //         then: Yup.object().shape({
    //             min: Yup.number().required(),
    //             max: Yup.number().required()
    //         })
    //     }),
    //     lastDrank: Yup.mixed().when('status', {
    //         is: 'Reformed Alcoholic',
    //         then: Yup.date().required()
    //     }),
    //     yearsConsumed: Yup.mixed().when('status', {
    //         is: Yup.mixed().oneOf(['true', 'Reformed Alcoholic']),
    //         then: Yup.number().required()
    //     }),
    //     familyAlcoholic: Yup.boolean().required(),
    //     causeOfDrinking: Yup.mixed().when('status', {
    //         is: Yup.mixed().oneOf(['true', 'Reformed Alcoholic']),
    //         then: Yup.mixed().oneOf(['Stress', 'Social', 'Friends/Family'])
    //     }),
    //     startedDrinkingAge: Yup.mixed().when('status', {
    //         is: Yup.mixed().oneOf(['true', 'Reformed Alcoholic']),
    //         then: Yup.number().required()
    //     }),
    // }),
    // dietaryInformation: Yup.object().shape({
    //     // diet: Yup.string().required(),
    //     vegetableServing: Yup.object().shape({
    //         min: Yup.number().required(),
    //         max: Yup.number().required(),
    //     }),
    //     carbsServing: Yup.object().shape({
    //         min: Yup.number().required(),
    //         max: Yup.number().required(),
    //     }),
    //     fruitServing: Yup.object().shape({
    //         min: Yup.number().required(),
    //         max: Yup.number().required(),
    //     }),
    //     avgEggConsumption: Yup.object().shape({
    //         min: Yup.number().required(),
    //         max: Yup.number().required(),
    //     }),
    //     egg: Yup.object().shape({
    //         type:Yup.mixed().oneOf(['Turkey', 'Duck', 'White Chicken', 'Brown Chicken', 'Goose', 'Quail']).required(),
    //         cookingMethod: Yup.mixed().oneOf(['Hardboiled', 'Softboiled', 'Scrambled', 'Omelet or Frittata', 'Sunny Side Up']).required(),
    //     }),
    //     friedFood: Yup.object().shape({
    //         avgConsumption: Yup.object().shape({
    //             min: Yup.number().required(),
    //             max: Yup.number().required(),
    //         }),
    //         sourceOfFriedFood: Yup.mixed().oneOf(['Cook', 'Buy']),
    //     }),
    //     oilUsedType: Yup.object().shape({
    //         oliveOil: Yup.boolean().required(),
    //         palmOil: Yup.boolean().required(),
    //         soybeanOil: Yup.boolean().required(),
    //         canolaOil: Yup.boolean().required(),
    //         cornOil: Yup.boolean().required(),
    //         peanutOil: Yup.boolean().required(),
    //         otherVegetableOils: Yup.boolean().required(),
    //         butter: Yup.boolean().required(),
    //         lard: Yup.boolean().required()
    //     }),
    //     optForFishAndPoultry: Yup.boolean().required(),
    //     avgConsumptionOfFriedAndRedMeat: Yup.object().shape({
    //         min: Yup.number().required(),
    //         max: Yup.number().required(),
    //     }).required(),
    //     avgConsumptionOfFastFood: Yup.object().shape({
    //         min: Yup.number().required(),
    //         max: Yup.number().required(),
    //     }).required(),
    //     lactoseIntolerant: Yup.boolean().required(),
    //     avgConsupmtionOfDairy: Yup.mixed().when('lactoseIntolerant', {
    //         is: false,
    //         then: Yup.object().shape({
    //             min: Yup.number().required(),
    //             max: Yup.number().required(),
    //         }).required(),
    //     }),
    //     avgConsumptionOfDrinks: Yup.object().shape({
    //         min: Yup.number().required(),
    //         max: Yup.number().required(),
    //     }).required(),
    //     avgConsumptionOfDesserts: Yup.object().shape({
    //         min: Yup.number().required(),
    //         max: Yup.number().required(),
    //     }).required(),
    //     avgConsumptionOfSnacks: Yup.object().shape({
    //         min: Yup.number().required(),
    //         max: Yup.number().required(),
    //     }).required(),
    //     avgConsumptionOfProcessedFoods: Yup.object().shape({
    //         min: Yup.number().required(),
    //         max: Yup.number().required(),
    //     }).required(),
    //     dailyDietaryIntake: Yup.object().shape({
    //         coffeeIntake: Yup.object().shape({
    //             coffeeType: Yup.string().required(),
    //             noOfCups: Yup.number().required(),
    //         }).required(),
    //         cupsOfTea: Yup.number().required(),
    //         glassesOfSoda: Yup.number().required(),
    //         sugarAmt: Yup.number().max(4, "Not valid").required(),
    //         sweetsAmt: Yup.number().required(),
    //         chocolateAmt: Yup.number().required(),
    //         alcohol: Yup.number().required(),
    //         fruitsIntake: Yup.number().required(),
    //         vegetableIntake: Yup.number().required(),

    //     })
    // })


})