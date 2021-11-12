import { useTranslation } from "react-i18next"
import React from "react";

export const healthHistoryValuesFunction = () => { 
    const { t } = useTranslation();
    return ([
        {
            name:'highCholesterol',
            value: 'High Cholesterol',
            label: t('label.highCholesterol')
        },
        {
            name:'heartAttack',
            value: 'Heart Attack',
            label: t('label.heartAttack')
        },
        {
            name: 'heartOperation',
            value: 'Heart Operation',
            label: "Heart Operation"
        },
        {
            name: 'congenitalHeartDisease',
            value: 'Congenital Heart Disease',
            label: 'Congenital Heart Disease'
        },
        {
            name:'noCondition',
            value: 'NO CONDITIONS',
            label: "No Conditions"
        },
        // {
        //     name:'heartDisease',
        //     value: 'heartDisease',
        //     label: t('label.heartDisease')
        // },
        // {
        //     name:'stroke',
        //     value: 'stroke',
        //     label: t('label.stroke')
        // },
        
        // {
        //     name:'elevatedTriglycerides',
        //     value: 'elevatedTriglycerides',
        //     label: t('label.elevatedTriglycerides')
        // },
        // {
        //     name:'diabetes',
        //     value: 'diabetes',
        //     label: t('label.diabetes')
        // },
        // {
        //     name:'hypertension',
        //     value: 'hypertension',
        //     label: t('label.hypertension')
        // },
        
        // {
        //     name:'sleepingDisorder',
        //     value: 'sleepingDisorder',
        //     label: t('label.sleepingDisorder')
        // },
        // {
        //     name:'otherVascularCondition',
        //     value: 'otherVascularCondition',
        //     label: t('label.otherVascularCondition')
        // },
    ])
}

export const lastHundredYearsFunction = () => {
    var lastHundredYears = [];

    for(let x = 0; x<= 100; x++) {
        var date = new Date();
        lastHundredYears.push((date.getFullYear()-x).toString());
    }
    return lastHundredYears;
}

export const weightFunction = () => {
    var weight = [];
    for(let x = 20; x<= 300; x++) {
        for (let y = 0; y < 10; y++) {
            let tempWeight = x.toString() + "." + y.toString();
            weight.push(tempWeight.toString());
        }
    }
    return weight;
}

export const heightFunction = () => {
    
    var height = [];

    for(let x = 100; x<= 250; x++) {
        height.push((x/100).toString());
    }
    

    return height;
}

export const yearFunction = () => {
    var yearsOption = [];
    for(let x = 1; x<=100; x++) {
        yearsOption.push(x.toString());   
    }

    return yearsOption;
}

export const cigarettesPerDayValuesFunction = () => { 
    const { t } = useTranslation();
    return ([
        {
            "label": 'Non-smoker',
            "name": "cigarettesPerDay",
            "value": 'NON SMOKER' //'1-9 cigarette sticks per day' //'NON-SMOKER','Non-Smoker', 'Non-smoker' training data does not have this label
        },  //try  or 
        {
            "label": t('label.numberOfCigarettesPerDay', {'min': 1, 'max': 9}),
            "name": "cigarettesPerDay",
            "value": '1-9 cigarette sticks per day' //has this label
        },
        {
            "label": t('label.numberOfCigarettesPerDay', {'min': 10, 'max': 19}),
            "name": "cigarettesPerDay",
            "value": '10-19 cigarette sticks per day' //has this label
        },
        {
            "label": t('label.numberOfCigarettesPerDay', {'min': 20, 'max': 29}),
            "name": "cigarettesPerDay",
            "value": '20-29 cigarette sticks per day' //has this label
        },
        // {
        //     "label": t('label.numberOfCigarettesPerDay', {'min': 30, 'max': 39}),
        //     "name": "cigarettesPerDay",
        //     "value": ["30", "39"]
        // },
        // {
        //     "label": t('label.moreThanNumberOfCigarettes', {'min': 40, 'max': 40}),
        //     "name": "cigarettesPerDay",
        //     "value": ["40", "40"]
        // }
     ])
}

export const  nicotineAmtValuesFunction = () => {
    const { t } = useTranslation();
    return ([
        {
            label: t("label.nicotineAmt", {percentage: 0, amt: 0}),
            name: "nicotineAmt",
            value: ["0"],
        },
        {
            label: t("label.nicotineAmt", {percentage: 3, amt: 0.3}),
            name: "nicotineAmt",
            value: [3]
        },
        {
            label: t("label.nicotineAmt", {percentage: 6, amt: 0.6}),
            name: "nicotineAmt",
            value: [6]
        },
        {
            label: t("label.nicotineAmt", {percentage: 12, amt: 1.2}),
            name: "nicotineAmt",
            value: ["12"]
        },
        {
            label: t("label.nicotineAmt", {percentage: 24, amt: 2.4}),
            name: "nicotineAmt",
            value: ["24"]
        },
        {
            label: t("label.nicotineAmt", {percentage: 36, amt: 3.6}),
            name: "nicotineAmt",
            value: ["36"]
        }
    ])
}

// export const alcoholTypesValuesFunction = () => {
//     return [
//         {
//             label: "Beer (Ales, Wheat beer, Fruit beer - 2% to 12% ABV)",
//             name: "beer",
//             value: "Beer (Ales, Wheat beer, Fruit beer - 2% to 12% ABV)"
//         },
//         {
//             label: "Cider (Apple wine - 2% to 8.5% ABV)",
//             name: "cider",
//             value: "Cider (Apple wine - 2% to 8.5% ABV)",
//         },
//         {
//             label: "Wine (Red, Rose, White, Champagne, Fortified wine - 9% to 16% ABV)",
//             name: "wine",
//             value: "Wine (Red, Rose, White, Champagne, Fortified wine - 9% to 16% ABV)",
//         },
//         {
//             label: "Spirits (Vodka, Whisky, Rum, Tequila, Gin - 20% to 80% ABV)",
//             name: "spirits",
//             value: "Spirits (Vodka, Whisky, Rum, Tequila, Gin - 20% to 80% ABV)",
//         },
//     ]
// }

export const averageAlcoholConsumptionValuesFunction = () => {
    const { t } = useTranslation();
    return [
        {
            "label": "Do not consume alcohol",
            "name": "avgAlcoholConsumption",
            "value": '2-3 drinks per month'// "DO NOT CONSUME ALCOHOL" do not have this label
        },
        // {
        //     "label": t('label.noAlcoholConsumption', {'min': 0, 'max': 0}),
        //     "name": "avgAlcoholConsumption",
        //     "value": ["0", "0", "none"]
        // },
        {
            "label": t('label.avgAlcoholConsumptionRange', {'min': 2, 'max': 3, 'period': 'month'}),
            "name": "avgAlcoholConsumption",
            "value": '2-3 drinks per month' //has this label
        },
        {
            "label": t('label.avgAlcoholConsumptionRange', {'min': 2, 'max': 3, 'period': 'week'}),
            "name": "avgAlcoholConsumption",
            "value": '2-3 drinks per week' //has this label
        },
        {
            "label": t('label.avgAlcoholConsumptionRange', {'min': 1, 'max': 2, 'period': 'day'}),
            "name": "avgAlcoholConsumption",
            "value": '1-2 drinks per day' //has this label
        },
        {
            "label": t('label.moreThanAvgAlcoholConsumption', {'min': 3, 'max': 3, 'period': 'day'}),
            "name": "avgAlcoholConsumption",
            "value": '3 or more drinks per day' //has this label
        },
    ]
}

export const BMIStatus = (BMIWeight: any) => {

    const BMIValues = [
        {
            category: 'severely-obese',
            min: 35.1,
            max: 100
        },
        {
            category: 'moderate-obese',
            min: 30.1,
            max: 35.0
        },
        {
            category: 'overweight',
            min: 25.1,
            max: 30,
        },
        {
            category: 'normal',
            min: 18.6,
            max: 25.0
        },
        {
            category: 'underweight',
            min: 16.1,
            max: 18.5
        },
        {
            category: 'severely-underweight',
            min: 0,
            max: 16.0
        },
    ]
    
    var category = '';
    BMIValues.map((bmi, index)=> {
        if(BMIWeight >= bmi.min && BMIWeight <= bmi.max) {
            category = bmi.category;
        }
    });
    if(BMIWeight> 100) {
        category = 'severely-obese';
    }
    return category;
}

export const meatFrequencyValuesFunction = () => {
    const { t } = useTranslation();
    return [
        {
            "label": "Once per week",
            "name": "meatFrequency",
            "value": "Once per week", //has this label
        },
        {
            "label": "1-2 times per week",
            "name": "meatFrequency",
            "value": "1-2 times per week" //has this label
        },
        {
            "label": "Daily",
            "name": "meatFrequency",
            "value": "Daily" //has this label
        },       
        {
            "label": "2-3 times per month",
            "name": "meatFrequency",
            "value": "2-3 times per month" //has this label
        },
        {
            "label": "Less than two times per month",
            "name": "meatFrequency",
            "value": "Less than two times per month" //has this label
        },
    ]
}

export const dairyFrequencyValuesFunction = () => {
    const { t } = useTranslation();
    return [
        {
            "label": "Once per week",
            "name": "dairyFrequency",
            "value": "Once per week", // has this value
        },
        {
            "label": "1-2 times per week",
            "name": "dairyFrequency",
            "value": "1-2 times per week" //has this value
        },
        {
            "label": "Daily",
            "name": "dairyFrequency",
            "value": "Daily" // has this value
        },
        {
            "label": "2-3 times per month",
            "name": "dairyFrequency",
            "value": "2-3 times per month" //has this label
        },
        {
            "label": "Less than two times per month",
            "name": "dairyFrequency",
            "value": "Less than two times per month" //has this label
        },
        {
            "label": "Never or once per month",
            "name": "dairyFrequency",
            "value": "Never or once per month" //has this label
        },
    ]
}

export const friedFoodFrequencyValuesFunction = () => {
    const { t } = useTranslation();
    return [
        {
            "label": "0-1 times per week",
            "name": "friedFoodFrequency",
            "value": "0-1 times per week" //has this label
        },
        {
            "label": "2-4 times per week",
            "name": "friedFoodFrequency",
            "value": "2-4 times per week" //has this label
        },
        {
            "label": "5-6 times per week",
            "name": "friedFoodFrequency",
            "value": "5-6 times per week", //has this label
        },
        // {
        //     "label": "7 or more times per week",
        //     "name": "friedFoodFrequency",
        //     "value": "5-6 times per week",// tested, dont have. "7 or more times per week" omitted because training data doesnt have this label
        // },
    ]
}

export const eggFrequencyValuesFunction = () => {
    const { t } = useTranslation();
    return [
        {
            "label": "0-1 eggs per week",
            "name": "eggFrequency",
            "value": "0-1 eggs per week" //has this label
        },
        {
            "label": "5-7 eggs per week",
            "name": "eggFrequency",
            "value": "5-7 eggs per week" //has this label
        },
        // {
        //     "label": "12 or more eggs per week",
        //     "name": "eggFrequency",
        //     "value": "12 or more eggs per week"
        // },
        {
            "label": "8-11 eggs per week",
            "name": "eggFrequency",
            "value": "8-11 eggs per week", //has this value
        },
       
        {
            "label": "2-4 eggs per week",
            "name": "eggFrequency",
            "value": "2-4 eggs per week" //has this label
        },
        //data has 'Less than two eggs per week', not included because it is the same with 0-1 eggs per week
    ]
}

export const milkTeaCoffeeLowfatValuesFunction = () => {
    const { t } = useTranslation();
    return [
        {
            "label": "7 or more times per week",
            "name": "milkTeaCoffeeLowfat",
            "value": "7 times per week" //has this label
        },
        {
            "label": "2-3 times per week",
            "name": "milkTeaCoffeeLowfat",
            "value": "2-3 times per week" //has this albel
        },
        {
            "label": "4-6 times per week",
            "name": "milkTeaCoffeeLowfat",
            "value": "4-6 times per week", //has this albel
        },
       
        {
            "label": "0-1 time per week",
            "name": "milkTeaCoffeeLowfat",
            "value": "0-1 time per week" //has this label
        }
    ]
}

export const dessertFrequencyValuesFunction = () => {
    const { t } = useTranslation();
    return [
        // {
        //     "label": "7 or more times per week",
        //     "name": "dessertFrequency",
        //     "value": "7 or more times per week"
        // },
        {
            "label": "4-6 times per week",
            "name": "dessertFrequency",
            "value": "4-6 times per week", //has this value
        },
        {
            "label": "2-3 times per week",
            "name": "dessertFrequency",
            "value": "2-3 times per week" //has this value
        },
        {
            "label": "0-1 times per week",
            "name": "dessertFrequency",
            "value": "0-1 times per week" // "0-1 time per week" does not have 0-1 time per week, but have 0-1 times per week
        }
    ]
}

export const snacksFrequencyValuesFunction = () => {
    const { t } = useTranslation();
    return [
        // {
        //     "label": "7 or more times per week",
        //     "name": "snacksFrequency",
        //     "value": "7 or more times per week"
        // },
        {
            "label": "2-3 times per week",
            "name": "snacksFrequency",
            "value": "2-3 more times per week"  //has this label, does not have 2-3 times per week
        },
        {
            "label": "4-6 times per week",
            "name": "snacksFrequency",
            "value": "4-6 times per week", //has this label
        },
        {
            "label": "0-1 time per week",
            "name": "snacksFrequency",
            "value": "0-1 time per week" //has this label
        }
    ]
}

export const sodaCandyFrequencyValuesFunction = () => {
    const { t } = useTranslation();
    return [
        {
            "label": "2-3 times per week",
            "name": "sodaCandyFrequency",
            "value": "2-3 times per week" //has this label
        },
        {
            "label": "4-6 times per week",
            "name": "sodaCandyFrequency",
            "value": "4-6 times per week", //has this label
        },
        
        {
            "label": "0-1 times per week",
            "name": "sodaCandyFrequency",
            "value": "0-1 times per week" //have 0-1 times per week not "0-1 time per week" //omitted because training data doesnt have
        }
    ]
}

export const vegetableIntakeValuesFunction = () => {
    const { t } = useTranslation();
    return [
        {
            "label": "0 servings per day",
            "name": "vegetableIntake",
            "value": "0 servings per day" //has this label
        },
        {
            "label": "1-2 servings per day",
            "name": "vegetableIntake",
            "value": "1-2 servings per day" //has this label
        },
        {
            "label": "3-4 servings per day",
            "name": "vegetableIntake",
            "value": "3-4 servings per day", //has this label
        },
        {
            "label": "5 or more servings per day",
            "name": "vegetableIntake",
            "value": "5 or more servings per day" //has this label
        },
    ]
}

export const grainBeansIntakeValuesFunction = () => {
    const { t } = useTranslation();
    return [
        {
            "label": "0 servings per day",
            "name": "grainBeansIntake",
            "value": "0 servings per day" //has this albel
        },
        {
            "label": "1-2 servings per day",
            "name": "grainBeansIntake",
            "value": "1-2 servings per day" //has this label
        },
        {
            "label": "3-4 servings per day",
            "name": "grainBeansIntake",
            "value": "3-4 servings per day", //has this label
        },
        // {
        //     "label": "5 or more servings per day",
        //     "name": "grainBeansIntake",
        //     "value": "5 or more servings per day" //do not have this label
        // }
        //tried 5 servings per day
    ]
}

export const fruitsIntakeValuesFunction = () => {
    const { t } = useTranslation();
    return [
        // {
        //     "label": "5 or more servings per day",
        //     "name": "fruitsIntake",
        //     "value": "5 or more servings per day" // do not have this label
        // },
        {
            "label": "3-4 servings per day",
            "name": "fruitsIntake",
            "value": "3-4 servings per day", //has this label
        },
        {
            "label": "1-2 servings per day",
            "name": "fruitsIntake",
            "value": "1-2 servings per day" //has this label
        },
        {
            "label": "0 servings per day",
            "name": "fruitsIntake",
            "value": "0 servings per day" //has this albel
        }

        //no 5 servings per day
    ]
}

export const processedFoodIntakeValuesFunction = () => {
    const { t } = useTranslation();
    return [
        // {
        //     "label": "3 or more per day",
        //     "name": "processedFoodIntake",
        //     "value": "3 or more per day"
        // },
        {
            "label": "1-2 per day",
            "name": "processedFoodIntake",
            "value": "1-2 per day", //has this label
        },
        {
            "label": "2-3 per week",
            "name": "processedFoodIntake",
            "value": "2-3 per week" //has this label
        },
        {
            "label": "Once per week or less",
            "name": "processedFoodIntake",
            "value": "Once per week or less" //has this label
        }
    ]
}

export const occupationValuesFunction = () => {
    const { t } = useTranslation();
    return [
        {
            "label": "Housewife",
            "name": "occupation",
            "value": 0
        },
        {
            "label": "Manager",
            "name": "occupation",
            "value": 1,
        },
        {
            "label": "Director",
            "name": "occupation",
            "value": 1
        },
        {
            "label": "Officer",
            "name": "occupation",
            "value": 1
        },
        {
            "label": "Retired",
            "name": "occupation",
            "value": 2
        }
        ,
        {
            "label": "Medical Field",
            "name": "occupation",
            "value": 3
        },
        {
            "label": "Engineer",
            "name": "occupation",
            "value": 3
        }
        ,
        {
            "label": "Architect",
            "name": "occupation",
            "value": 3
        },
        {
            "label": "Science Field",
            "name": "occupation",
            "value": 3
        },
        {
            "label": "Teacher",
            "name": "occupation",
            "value": 4
        },
        {
            "label": "Professor",
            "name": "occupation",
            "value": 4
        },
        {
            "label": "Postman",
            "name": "occupation",
            "value": 5
        },
        {
            "label": "Security Guard",
            "name": "occupation",
            "value": 5
        }
        ,
        {
            "label": "Delivery",
            "name": "occupation",
            "value": 5
        },
        {
            "label": "Accountant",
            "name": "occupation",
            "value": 6
        },
        {
            "label": "Clerk",
            "name": "occupation",
            "value": 6
        },
        {
            "label": "Secretary",
            "name": "occupation",
            "value": 6
        },
        {
            "label": "General Worker",
            "name": "occupation",
            "value": 6
        },
        {
            "label": "Businessman",
            "name": "occupation",
            "value": 7
        },
        {
            "label": "Priest",
            "name": "occupation",
            "value": 8
        }
    ]
}

export const computerHoursValuesFunction = () => {
    const { t } = useTranslation();

    return [
        {
            label: "More than 6 hours",
            name: "computerHours",
            value: "More than 6 hours" //has this label
        },
        {
            label: "4 to 6 hours",
            name: "computerHours",
            value: "Less than 6 hours" //has this value
        },
        {
            label: "1 to 3 hours",
            name: "computerHours",
            value: "Less than 4 hours" //has this value
        },
        {
            label: "Do not use the computer",
            name: "computerHours",
            value: "Less than 4 hours" //has this value
        }
        //does not have 4 hours
        
    ]
}

export const seatedHoursValuesFunction = () => {
    const { t } = useTranslation();

    return [
        {
            label: "More than 8 hours",
            name: "computerHours",
            value: "More than 8 hours" //has this label
        },
        {
            label: "4 to 7 hours",
            name: "computerHours",
            value: "Less than 6 hours" //has this albel
        },
        {
            label: "1 to 3 hours",
            name: "computerHours",
            value: "Less than 4 hours" //has this label
        },
        {
            label: "Less than an hour",
            name: "computerHours",
            value: "Less than 4 hours" //has this label
        }
        //no 4 hours
    ]
}

export const sleepHoursValuesFunction = () => {
    const { t } = useTranslation();

    return [
        {
            label: "More than 10 hours",
            name: "computerHours",
            value: "More than 10 hours" //has this label
        },
        {
            label: "7 to 8 hours",
            name: "computerHours",
            value: "Less than 8 hours" //has this label
        },
        {
            label: "Less than 6 hours",
            name: "computerHours",
            value: "Less than 6 hours", //has this label
        },
        // {
        //     label: "Less than an hour",
        //     name: "computerHours",
        //     value: "Less than 4 hours"
        // }
    ]
}