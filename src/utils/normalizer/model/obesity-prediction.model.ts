import { omitBy, isNil, isUndefined, isEmpty } from 'lodash';

const ObesityPredictionModel = (data: any) => {
    return omitBy({
        // gender : data.gender,
        // race : data.race,
        healthAndFamilyHistory: {
            BMI : data.bmi,
            familyHistory : data["family-history"],
        },
        lifestyleInformation: {
            smokingFrequency : data["smoke-freq"],
            ergonomicWorkspace : data["ergo-workspace"],
            computerHours : data["computer-hours"],
            seatedHours : data["seated-hours"],
            activeScale : data["active-scale"],
            durationOfSleep : data.sleep,
            stress : data.stress,
            exerciseProgramme : data["exercise-programme"],
            personalTrainer : data["personal-trainer"],
            dietaryPlan : data["dietary-plan"],
            occupation: data["occupation"]
        },
        dietaryIntake: {
            alcoholFrequency : data["alcohol-freq"],
            meatFrequency : data["meat-freq"],
            dairyFrequency : data.dairy, 
            friedFoodFrequency : data["fried-food"],
            eggFrequency : data.egg,
            meatOverFriedFood : data["meat-over-fried"],
            vegetarian : data.vegetarian,
            milkTeaCoffeeLowfat : data["milk-tea-coffee-lowfat"],
            dessertFrequency : data.desserts,
            snacksFrequency : data.snacks,
            sodaCandyFrequency : data["soda-candy"],
            vegetableIntake : data.vegetable,
            grainBeansIntake : data["grain-bean"],
            fruitsIntake : data.fruits,
            processedFoodIntake : data["processed-food"],
            fiveFruitFrequencyIntake : data["5-fruit"],
            fourCitrusFrequencyIntake : data["4-citrus"],
            lessFiveOrangeYellowFruitVegeFrequencyIntake : data["less-5-orange-yellow-fruit-vege"],
            cruciferousVegetablesFrequencyIntake : data["cruciferous-vege"],
            smokedMeatFishFrequencyIntake : data["smoked-meat-fish"],
            nitrateSaltMeatFrequencyIntake : data["nitrate-salt-meat"],
            bbqIntake : data.bbq,
            moreThreeCoffeeFrequencyIntake : data["more-3-coffee"],
            lessThanTwoDairyServingsDailyIntake : data["less-2-dairy-day"],
            lessThanThreeTimesNLMGMRCAYWeeklyIntake : data["less-3-mamak-nasilemak-percik-week"],
        },
       
      
    }, (value)=> isUndefined(value) || isEmpty(value) || isNil(value));
}

export default ObesityPredictionModel;