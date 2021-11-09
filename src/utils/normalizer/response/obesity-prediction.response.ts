import { omitBy, isNil, isUndefined, isEmpty } from 'lodash';
import { isEmptyBindingElement } from 'typescript';

const ObesityPredictionResponse = (data: any) => {
    console.log('data', data);
    console.log('data.activeScale', data.activeScale);
    return omitBy({
            gender : data.gender || undefined,
            race : data.race || undefined,
            bmi : data.healthAndFamilyHistory.BMI || undefined,
            "active-scale" : data.lifestyleInformation.activeScale || undefined,
            "family-history" : data.healthAndFamilyHistory.familyHistory || undefined,
            "smoke-freq" : data.lifestyleInformation.smokingFrequency || undefined,
            "alcohol-freq" : data.dietaryIntakeInformation.alcoholFrequency || undefined,
            "meat-freq" : data.dietaryIntakeInformation.meatFrequency || undefined,
            dairy : data.dietaryIntakeInformation.dairyFrequency || undefined, 
            "fried-food" : data.dietaryIntakeInformation.friedFoodFrequency || undefined,
            egg : data.dietaryIntakeInformation.eggFrequency || undefined,
            "meat-over-fried" : data.dietaryIntakeInformation.meatOverFriedFood || undefined,
            vegetarian : data.dietaryIntakeInformation.vegetarian || undefined,
            "milk-tea-coffee-lowfat" : data.dietaryIntakeInformation.milkTeaCoffeeLowfat || undefined,
            desserts : data.dietaryIntakeInformation.dessertFrequency || undefined,
            snacks : data.dietaryIntakeInformation.snacksFrequency || undefined,
            "soda-candy" : data.dietaryIntakeInformation.sodaCandyFrequency || undefined,
            vegetable : data.dietaryIntakeInformation.vegetableIntake || undefined,
            "grain-bean" : data.dietaryIntakeInformation.grainBeansIntake || undefined,
            fruits : data.dietaryIntakeInformation.fruitsIntake || undefined,
            "processed-food" : data.dietaryIntakeInformation.processedFoodIntake || undefined,
            "5-fruit" : data.dietaryIntakeInformation.fiveFruitFrequencyIntake || undefined,
            "4-citrus" : data.dietaryIntakeInformation.fourCitrusFrequencyIntake || undefined,
            "less-5-orange-yellow-fruit-vege" : data.dietaryIntakeInformation.lessFiveOrangeYellowFruitVegeFrequencyIntake || undefined,
            "cruciferous-vege" : data.dietaryIntakeInformation.cruciferousVegetablesFrequencyIntake || undefined,
            "smoked-meat-fish" : data.dietaryIntakeInformation.smokedMeatFishFrequencyIntake || undefined,
            "nitrate-salt-meat" : data.dietaryIntakeInformation.nitrateSaltMeatFrequencyIntake || undefined,
            "bbq" : data.dietaryIntakeInformation.bbqIntake || undefined,
            "more-3-coffee" : data.dietaryIntakeInformation.moreThreeCoffeeFrequencyIntake || undefined,
            "less-2-dairy-day" : data.dietaryIntakeInformation.lessThanTwoDairyServingsDailyIntake || undefined,
            "less-3-mamak-nasilemak-percik-week" : data.dietaryIntakeInformation.lessThanThreeTimesNLMGMRCAYWeeklyIntake || undefined,
            "ergo-workspace" : data.lifestyleInformation.ergonomicWorkspace || undefined,
            "computer-hours" : data.lifestyleInformation.computerHours || undefined,
            "seated-hours" : data.lifestyleInformation.seatedHours || undefined,
            sleep : data.lifestyleInformation.durationOfSleep || undefined,
            stress : data.lifestyleInformation.stress || undefined,
            "exercise-programme" : data.lifestyleInformation.exerciseProgramme || undefined,
            "personal-trainer" : data.lifestyleInformation.personalTrainer || undefined,
            "dietary-plan" : data.lifestyleInformation.dietaryPlan || undefined,
            occupation: data.lifestyleInformation.occupation || undefined
    }, (value)=> isUndefined(value))
}

export default ObesityPredictionResponse;