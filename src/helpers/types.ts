import { 
    Gender, 
    Race, 
    State, 
    EducationLevel, 
    CigaretteSmoker, 
    SmokingCauses, 
    AlcoholConsumer,
    AlcoholType
} from "./enum";
import { NumberLiteralType } from "typescript";

export type HealthHistory = {
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
}

export type FamilyHistory = {
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
}

export type SmokingStatus = {
    cigaretteSmoker: {
        status: CigaretteSmoker;
        numberOfCigarettes?: {
            min: number;
            max: number;
        };
        // lastSmoker?: moment.Moment;
        yearsSmoked?: number;
        pastNumberofCigarettesSmoked?: {
            min:number;
            max: number;
        };
    };
    eCigarreteSmoker: {
        status: CigaretteSmoker;
        yearsSmoked?: number;
        percentageofNicotine?: number;
    };
    familySmoker: boolean;
    smokingCause?: SmokingCauses;
    startAge?: number;
}

export type AlcoholStatus = {
    status: AlcoholConsumer;
    alcoholType?: AlcoholType;
    averageAlcoholConsumption?:{
        min?: number;
        
    }

}

export type PatientInformation = {
    fullName: string;
    age: number;
    gender: Gender;
    race: Race;
    state: State;
    educationLevel: EducationLevel;

}