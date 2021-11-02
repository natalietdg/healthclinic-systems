import { omitBy, isNil, isUndefined, isEmpty } from 'lodash';
import { isEmptyBindingElement } from 'typescript';

const ObesityPredictionResponse = (data: any) => {
    console.log('data', data);
    console.log('data.activeScale', data.activeScale);
    return omitBy({
            gender : data.gender || undefined,
            race : data.race || undefined,
            bmi : data.BMI || undefined,
            "active-scale" : 3,
            "family-history" : data.familyHistory || undefined,
            "smoke-freq" : data.smokingFrequency || undefined,
            "alcohol-freq" : data.alcoholFrequency || undefined,
            "meat-freq" : data.meatFrequency || undefined,
            dairy : data.dairyFrequency || undefined, 
            "fried-food" : data.friedFoodFrequency || undefined,
            egg : data.eggFrequency || undefined,
            "meat-over-fried" : data.meatOverFriedFood || undefined,
            vegetarian : data.vegetarian || undefined,
            "milk-tea-coffee-lowfat" : data.milkTeaCoffeeLowfat || undefined,
            desserts : data.dessertFrequency || undefined,
            snacks : data.snacksFrequency || undefined,
            "soda-candy" : data.sodaCandyFrequency || undefined,
            vegetable : data.vegetableIntake || undefined,
            "grain-bean" : data.grainBeansIntake || undefined,
            fruits : data.fruitsIntake || undefined,
            "processed-food" : data.processedFoodIntake || undefined,
            "5-fruit" : data.fiveFruitFrequencyIntake || undefined,
            "4-citrus" : data.fourCitrusFrequencyIntake || undefined,
            "less-5-orange-yellow-fruit-vege" : data.lessFiveOrangeYellowFruitVegeFrequencyIntake || undefined,
            "cruciferous-vege" : data.cruciferousVegetablesFrequencyIntake || undefined,
            "smoked-meat-fish" : data.smokedMeatFishFrequencyIntake || undefined,
            "nitrate-salt-meat" : data.nitrateSaltMeatFrequencyIntake || undefined,
            "bbq" : data.bbqIntake || undefined,
            "more-3-coffee" : data.moreThreeCoffeeFrequencyIntake || undefined,
            "less-2-dairy-day" : data.lessThanTwoDairyServingsDailyIntake || undefined,
            "less-3-mamak-nasilemak-percik-week" : data.lessThanThreeTimesNLMGMRCAYWeeklyIntake || undefined,
            "ergo-workspace" : data.ergonomicWorkspace || undefined,
            "computer-hours" : data.computerHours || undefined,
            "seated-hours" : data.seatedHours || undefined,
            sleep : data.durationOfSleep || undefined,
            stress : data.stress || undefined,
            "exercise-programme" : data.exerciseProgramme || undefined,
            "personal-trainer" : data.personalTrainer || undefined,
            "dietary-plan" : data.dietaryPlan || undefined,
            occupation: data.occupation || undefined
    }, (value)=> isUndefined(value))
}

export default ObesityPredictionResponse;