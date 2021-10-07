import { useTranslation } from "react-i18next"
import React from "react";

export const healthHistoryValuesFunction = () => { 
    const { t } = useTranslation();
    return ([
        // {
        //     name:'heartDisease',
        //     value: 'heartDisease',
        //     label: t('label.heartDisease')
        // },
        {
            name:'heartAttack',
            value: 'heartAttack',
            label: t('label.heartAttack')
        },
        // {
        //     name:'stroke',
        //     value: 'stroke',
        //     label: t('label.stroke')
        // },
        {
            name:'highCholesterol',
            value: 'highCholesterol',
            label: t('label.highCholesterol')
        },
        // {
        //     name:'elevatedTriglycerides',
        //     value: 'elevatedTriglycerides',
        //     label: t('label.elevatedTriglycerides')
        // },
        {
            name:'diabetes',
            value: 'diabetes',
            label: t('label.diabetes')
        },
        {
            name:'hypertension',
            value: 'hypertension',
            label: t('label.hypertension')
        },
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
            "label": t('label.numberOfCigarettesPerDay', {'min': 1, 'max': 9}),
            "name": "cigarettesPerDay",
            "value": ["1", "9"]
        },
        {
            "label": t('label.numberOfCigarettesPerDay', {'min': 10, 'max': 19}),
            "name": "cigarettesPerDay",
            "value": ["10", "19"]
        },
        {
            "label": t('label.numberOfCigarettesPerDay', {'min': 20, 'max': 29}),
            "name": "cigarettesPerDay",
            "value": ["20", "29"]
        },
        {
            "label": t('label.numberOfCigarettesPerDay', {'min': 30, 'max': 39}),
            "name": "cigarettesPerDay",
            "value": ["30", "39"]
        },
        {
            "label": t('label.moreThanNumberOfCigarettes', {'min': 40, 'max': 40}),
            "name": "cigarettesPerDay",
            "value": ["40", "40"]
        }
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
            value: ["3"]
        },
        {
            label: t("label.nicotineAmt", {percentage: 6, amt: 0.6}),
            name: "nicotineAmt",
            value: ["6"]
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

export const alcoholTypesValuesFunction = () => {
    return [
        {
            label: "Beer (Ales, Wheat beer, Fruit beer - 2% to 12% ABV)",
            name: "beer",
            value: "Beer (Ales, Wheat beer, Fruit beer - 2% to 12% ABV)"
        },
        {
            label: "Cider (Apple wine - 2% to 8.5% ABV)",
            name: "cider",
            value: "Cider (Apple wine - 2% to 8.5% ABV)",
        },
        {
            label: "Wine (Red, Rose, White, Champagne, Fortified wine - 9% to 16% ABV)",
            name: "wine",
            value: "Wine (Red, Rose, White, Champagne, Fortified wine - 9% to 16% ABV)",
        },
        {
            label: "Spirits (Vodka, Whisky, Rum, Tequila, Gin - 20% to 80% ABV)",
            name: "spirits",
            value: "Spirits (Vodka, Whisky, Rum, Tequila, Gin - 20% to 80% ABV)",
        },
    ]
}

export const averageAlcoholConsumptionValuesFunction = () => {
    const { t } = useTranslation();
    return [
        {
            "label": t('label.noAlcoholConsumption', {'min': 0, 'max': 0}),
            "name": "avgAlcoholConsumption",
            "value": ["0", "0", "none"]
        },
        {
            "label": t('label.avgAlcoholConsumptionRange', {'min': 2, 'max': 3, 'period': 'month'}),
            "name": "avgAlcoholConsumption",
            "value": ["2", "3", "month"]
        },
        {
            "label": t('label.avgAlcoholConsumptionRange', {'min': 1, 'max': 2, 'period': 'day'}),
            "name": "avgAlcoholConsumption",
            "value": ["1", "2", "day"]
        },
        {
            "label": t('label.avgAlcoholConsumptionRange', {'min': 2, 'max': 3, 'period': 'week'}),
            "name": "avgAlcoholConsumption",
            "value": ["2", "3", "week"]
        },
        {
            "label": t('label.moreThanAvgAlcoholConsumption', {'min': 3, 'max': 3, 'period': 'day'}),
            "name": "avgAlcoholConsumption",
            "value": ["3", "3", "day"]
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
        console.log('BMIsssss', BMIWeight);
        console.log(bmi);
        if(BMIWeight >= bmi.min) {
            category = bmi.category;
        }
    });

    console.log('category', category);
    return category;
}