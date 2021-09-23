import { useTranslation } from "react-i18next"
import React from "react";

export const healthHistoryValues = [
        {
            name:'heartDisease',
            value: 'heartDisease',
            label: `t('label.heartDisease')`
        },
        {
            name:'heartAttack',
            value: 'heartAttack',
            label: `t('label.heartAttack')`
        },
        {
            name:'stroke',
            value: 'stroke',
            label: `t('label.stroke')`
        },
        {
            name:'elevatedCholesterol',
            value: 'elevatedCholesterol',
            label: `t('label.elevatedCholesterol')`
        },
        {
            name:'elevatedTriglycerides',
            value: 'elevatedTriglycerides',
            label: `t('label.elevatedTriglycerides')`
        },
        {
            name:'diabetes',
            value: 'diabetes',
            label: `t('label.diabetes')`
        },
        {
            name:'hypertension',
            value: 'hypertension',
            label: `t('label.hypertension')`
        },
        {
            name:'sleepingDisorder',
            value: 'sleepingDisorder',
            label: `t('label.sleepingDisorder')`
        },
        {
            name:'otherVascularCondition',
            value: 'otherVascularCondition',
            label: `t('label.otherVascularCondition')`
        },
    ]

export const cigarettesPerDayValues = 
[
    {
        "label": `t('label.numberOfCigarettesPerDay', {'min': 1, 'max': 9})`,
        "name": "cigarettesPerDay",
        "value": ["1", "9"]
    },
    {
        "label": `t('label.numberOfCigarettesPerDay', {'min': 10, 'max': 19})`,
        "name": "cigarettesPerDay",
        "value": ["10", "19"]
    },
    {
        "label": `t('label.numberOfCigarettesPerDay', {'min': 20, 'max': 29})`,
        "name": "cigarettesPerDay",
        "value": ["20", "29"]
    },
    {
        "label": `t('label.numberOfCigarettesPerDay', {'min': 30, 'max': 39})`,
        "name": "cigarettesPerDay",
        "value": ["30", "39"]
    },
    {
        "label": `t('label.moreThanNumberOfCigarettes', {'max': 40})`,
        "name": "cigarettesPerDay",
        "value": ["40"]
    }
]

export const  nicotineAmtValues = [
    {
        label: `t("label.nicotineAmt", {percentage: 0, amt: 0})`,
        name: "nicotineAmt",
        value: ["0"],
    },
    {
        label: `t("label.nicotineAmt", {percentage: 3, amt: 0.3})`,
        name: "nicotineAmt",
        value: ["3"]
    },
    {
        label: `t("label.nicotineAmt", {percentage: 6, amt: 0.6})`,
        name: "nicotineAmt",
        value: ["6"]
    },
    {
        label: `t("label.nicotineAmt", {percentage: 12, amt: 1.2})`,
        name: "nicotineAmt",
        value: ["12"]
    },
    {
        label: `t("label.nicotineAmt", {percentage: 24, amt: 2.4})`,
        name: "nicotineAmt",
        value: ["24"]
    },
    {
        label: `t("label.nicotineAmt", {percentage: 36, amt: 3.6})`,
        name: "nicotineAmt",
        value: ["36"]
    }
]