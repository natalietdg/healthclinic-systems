import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { styles } from 'Components/shared/animation';
import { useTranslation } from 'react-i18next';
import Radium from 'radium';
import { encode } from 'Helpers/';
import { ToasterAtomType, toasterAtom } from 'Recoil/toaster.atom';
import { PatientInformationType, CommentType, commentAtom} from 'Recoil/patient.atom';
import { uploadImage } from 'Services/patient.services';
import './patient-information.scss';
import { sleepHoursValuesFunction, seatedHoursValuesFunction, computerHoursValuesFunction, sodaCandyFrequencyValuesFunction, occupationValuesFunction, processedFoodIntakeValuesFunction, fruitsIntakeValuesFunction, grainBeansIntakeValuesFunction, vegetableIntakeValuesFunction, snacksFrequencyValuesFunction, dessertFrequencyValuesFunction, milkTeaCoffeeLowfatValuesFunction, eggFrequencyValuesFunction, friedFoodFrequencyValuesFunction, dairyFrequencyValuesFunction, meatFrequencyValuesFunction, healthHistoryValuesFunction, cigarettesPerDayValuesFunction, BMIStatus, nicotineAmtValuesFunction, heightFunction, weightFunction, yearFunction, lastHundredYearsFunction, alcoholTypesValuesFunction, averageAlcoholConsumptionValuesFunction } from 'Data/patientInformationValues';
import { Container, Page, Row, Col, ImageUpload, Modal, Toaster } from 'Components/shared';
import errorHandler from 'Utils/error-handler';
import _, { omitBy, isEmpty, isUndefined, isEqual } from 'lodash';
import moment from 'moment';
import PagePane from 'Components/shared/page/page-pane'
import { TextInput, AlertBox, RadioInput, SelectInput, ProgressBar, TextArea, Checkbox, AddressInput, DateInput, SearchInput, Table } from 'Components/shared';
import { PatientInformationFormValidation } from './patient-information.validation';
import { PersonalInformationFormValidation } from './personal-information.validation';
import patientInformation from '.';

interface PatientInformationProps {
    onSubmit: (data: any, type: string) => void;
    page: any;
    data: any;
    comments: any;
}

const PatientInformation:React.FC<PatientInformationProps> = ({onSubmit, page, data, comments})=> {
    let history = useHistory();
    const { t } = useTranslation();
    const [ toaster, setToaster ] = useState<any>({
        message: '',
        type: ''
    });
    const [ weightStatus, setWeightStatus ] = useState('');
    const [clinicComments, setClinicComments ] = useRecoilState<CommentType[]>(commentAtom);
    const [ commentModal, setCommentModal ] = useState<boolean>(false);
    const [modalComment, setModalComment] = useState<any>({
        id:-1,
        diagnosis: '',
        comment: '',
        created:'',
        image: [],
        arrayIndex: -1,
    })

    const defaultPersonalInformation = {
        patientID: -1,
        fullName: '',
        phoneNumber: '',
        email: '',
        profilePicBlob: {},
        ic: '',
        gender: "",
        race: '',
        dateOfBirth: '',
        reasonForConsultation: ""        
    };

    const defaultHealthAndFamilyHistory = {
        weight: -1,
        height: -1,
        BMI: -1,
        // healthHistory: {
        //     heartAttack: false,
        //     highCholesterol: false,
        //     heartOperation: false,
        //     congenitalHeartDisease: false,
        //     noCondition: false, //if this is true, then healthHistory is false
        //     // diabetes: false,
        //     // hypertension:  false,
        // },
        familyHistory: { 
            heartAttack: '',
            highCholesterol: '',
            heartOperation: '',
            congenitalHeartDisease: '',
            noCondition: '', //if this is true, then healthHistory is false
            // heartAttack: 'No',
            // highCholesterol: 'No',
            // heartOperation: 'No',
            // congenitalHeartDisease: 'No',
            // noCondition: 'No', //if this is true, then healthHistory is false
            // diabetes: false,
            // hypertension:  false,
        },
    }

    const defaultDietaryIntakeInformation = {
        alcoholFrequency: '',
        meatFrequency: '',
        dairyFrequency: '',
        friedFoodFrequency: '',
        eggFrequency: '',
        meatOverFriedFood: '',
        vegetarian: '',
        milkTeaCoffeeLowfat: '', 
        dessertFrequency: '',
        snacksFrequency: '',
        sodaCandyFrequency: '',
        vegetableIntake: '',
        grainBeansIntake: '',
        fruitsIntake: '',
        processedFoodIntake: '',
        fiveFruitFrequencyIntake: '',
        fourCitrusFrequencyIntake: '',
        lessFiveOrangeYellowFruitVegeFrequencyIntake: '',
        cruciferousVegetablesFrequencyIntake: '',
        smokedMeatFishFrequencyIntake: '',
        nitrateSaltMeatFrequencyIntake: '',
        bbqIntake: '',
        moreThreeCoffeeFrequencyIntake: '',
        lessThanTwoDairyServingsDailyIntake: '',
        lessThanThreeTimesNLMGMRCAYWeeklyIntake: '' //NL- Nasi Lemak, MGM - Mee Goreng Mamak, RC - Roti Canai, AP - Ayam Percik

        // alcoholFrequency: "2-3 drinks per month",
        // bbqIntake: "Yes",
        // cruciferousVegetablesFrequencyIntake: "Yes",
        // dairyFrequency: "1-2 times per week",
        // dessertFrequency: "2-3 times per week",
        // eggFrequency: "5-7 eggs per week",
        // fiveFruitFrequencyIntake: "Yes",
        // fourCitrusFrequencyIntake: "No",
        // friedFoodFrequency: "2-4 times per week",
        // fruitsIntake: "3-4 servings per day",
        // grainBeansIntake: "3-4 servings per day",
        // lessFiveOrangeYellowFruitVegeFrequencyIntake: "No",
        // lessThanThreeTimesNLMGMRCAYWeeklyIntake: "No",
        // lessThanTwoDairyServingsDailyIntake: "Yes",
        // meatFrequency: "Once per week",
        // meatOverFriedFood: "No",
        // milkTeaCoffeeLowfat: "2-3 times per week",
        // moreThreeCoffeeFrequencyIntake: "No",
        // nitrateSaltMeatFrequencyIntake: "No",
        // processedFoodIntake: "2-3 per week",
        // smokedMeatFishFrequencyIntake: "Yes",
        // snacksFrequency: "4-6 times per week",
        // sodaCandyFrequency: "0-1 time per week",
        // vegetableIntake: "1-2 servings per day",
        // vegetarian: "Yes"
    }

    const defaultLifestyleInformation = {
        occupation: -1,
        smokingFrequency: '',
        ergonomicWorkspace: false,
        computerHours: '',
        seatedHours: '',
        activeScale: '',
        durationOfSleep: '',
        stress: false,
        exerciseProgramme: false,
        personalTrainer: false,
        dietaryPlan: false
    }

    const [ error, setError ] = useState<any>({});
    const [ pageVisibility, setPageVisibility ] = useState(-1);
    const healthHistoryValues: any = healthHistoryValuesFunction();
    const cigarettesPerDayValues: any = cigarettesPerDayValuesFunction();
    const nicotineAmtValues: any = nicotineAmtValuesFunction();
    const alcoholTypeValues: any = alcoholTypesValuesFunction();
    const height: any = heightFunction();
    const weight: any = weightFunction();
    const yearsOption: any = yearFunction();
    const seatedHoursValues = seatedHoursValuesFunction();
    const computerHoursValues = computerHoursValuesFunction();
    const lastHundredYears = lastHundredYearsFunction();
    const occupationValues = occupationValuesFunction();
    const snacksFrequencyValues = snacksFrequencyValuesFunction();
    const meatFrequencyValues = meatFrequencyValuesFunction();
    const dairyFrequencyValues = dairyFrequencyValuesFunction();
    const friedFoodFrequencyValues = friedFoodFrequencyValuesFunction();
    const dessertFrequencyValues = dessertFrequencyValuesFunction();
    const vegetableIntakeValues = vegetableIntakeValuesFunction();
    const fruitsIntakeValues = fruitsIntakeValuesFunction();
    const durationOfSleepValues = sleepHoursValuesFunction();
    const eggFrequencyValues = eggFrequencyValuesFunction();
    const sodaCandyFrequencyValues = sodaCandyFrequencyValuesFunction();
    const processedFoodIntakeValues = processedFoodIntakeValuesFunction();
    const grainBeansIntakeValues = grainBeansIntakeValuesFunction();
    const milkTeaCoffeeLowfatValues = milkTeaCoffeeLowfatValuesFunction();
    const averageAlcoholConsumptionValues: any = averageAlcoholConsumptionValuesFunction();
    const [maxSize, setMaxSize] = useState(0);
    const [ personalInformation, setPersonalInformation ] = useState<any>(defaultPersonalInformation);
    const [ healthAndFamilyHistory, setHealthAndFamilyHistory ] = useState<any>(defaultHealthAndFamilyHistory);
    const [ dietaryIntake, setDietaryIntake ] = useState<any>(defaultDietaryIntakeInformation);
    const [ lifestyleInformation, setLifestyleInformation ] = useState<any>(defaultLifestyleInformation);

    const pages = [
        {
            name: 'personalInformation',
            index: 0,
            fields: [
                "firstName",
                "lastName",
                "ic",
                "race",
                "gender",
                "reasonForConsultation",
                "profilePicBlob",
                "phoneNumber"
            ]
        },
        {
            name: 'healthHistory',
            index: 1,
            fields: [
                "weight",
                "height",
                "healthHistory",
                "familyHistory",
            ]
        },
        {
            name: 'dietaryIntake',
            index: 2,
            fields: [
                "eightHoursOfSleep",
                "stress",
                "exercise",
                "smoking",
                "friedFood",
                "meat",
                "fruits",
                "vegetables",
                "processedFood",
            ]
        },
        {
            name: 'lifestyleInformation',
            index: 3,
            fields: [
                "eightHoursOfSleep",
                "stress",
                "exercise",
                "smoking",
                "friedFood",
                "meat",
                "fruits",
                "vegetables",
                "processedFood",
            ]
        },
        {
            name: 'comments',
            index: 4,
            fields: [
                "comments",
                "diagnosis"
            ]
        }
    ]

    useEffect(()=> {

        if(!isEmpty(data) && !data.error) {
            setPersonalInformation(data);
        } 
        else if(localStorage.getItem('patient')) {
            var patientData = JSON.parse(localStorage.getItem('patient')||'');
         
            setPersonalInformation(patientData);
        }
    },[data]);

    useEffect(()=> {
        console.log('page', page);
        if (page != null && page != -1) setPageVisibility(parseInt(page));
    },[page]);

    useEffect(()=> {
        console.log('comments', comments);
        setClinicComments(comments);
    },[comments])

    useEffect(()=> {
        if(healthAndFamilyHistory.weight> 0 && healthAndFamilyHistory.height > 0) {
            const BMI = Math.trunc(healthAndFamilyHistory.weight/(healthAndFamilyHistory.height * healthAndFamilyHistory.height));
            console.log('BMI', BMI);
            console.log('typeof(BMI)', typeof(BMI));
            const status = BMIStatus(BMI);
            // console.log('status', status);
            setHealthAndFamilyHistory({...healthAndFamilyHistory, BMI: BMI})
            setWeightStatus(status);
        }
    },[healthAndFamilyHistory.weight || healthAndFamilyHistory.height])


    useEffect(()=> {
        console.log('healthAndFamilyHistory', healthAndFamilyHistory);
    },[healthAndFamilyHistory])

    useEffect(()=> {
        console.log('lifestyleInformation', lifestyleInformation);
    },[lifestyleInformation])

    useEffect(()=> {
        console.log('dietaryIntake', dietaryIntake);
    },[dietaryIntake])


    const nextPage = () => {
       
        if (pageVisibility < maxSize - 1) {
            console.log('pageVisibility', pageVisibility);
            setPageVisibility(pageVisibility + 1);
        }
    }

    const saveAndContinue = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try{
           
            const value = PatientInformationFormValidation.validateSync(omitBy({
                ...personalInformation,
            }, (value)=> isEmpty(value) || value==='' || isUndefined(value)), {
                strict: true,
                abortEarly: false,
                stripUnknown: false
            });
            // console.log(moment(personalInformation.dateOfBirth));
            // console.log('value', value);
    
            onSubmit(value, 'save');

        }
        catch(err) {
            let { path, value }:any = errorHandler.validation(err);
            console.log('err', err);
            var subPath = '';

            if (path.indexOf('.')!==-1) {
                const str = path.split('.');
                path = str[0];
                subPath = str[1];
                setError({...error, [path]: {[subPath]: t(`${value}`, { field: t(`label.${subPath}`)})} });
            }
            else {
                setError({...error, [path]: t(`${value}`, { field: t(`label.${path}`)}) });
            }
           
            // pages.map((page, index)=> {
               
            //     if(page.fields.includes(path) || page.fields.includes(subPath)) {
            //         // console.log('page', page);
            //         setPageVisibility(page.index);
            //     }
            // })

            if (document.querySelector(`input[name=${path}]`)) {
                (document.querySelector(`input[name=${path}]`) as HTMLInputElement).focus();

            }
            else if (document.querySelector(`div[name=${path}]`)) {
                (document.querySelector(`div[name=${path}]`) as HTMLInputElement).focus();
            }
        }
    }

    const submitObesityPredictionData = () => {
        let tempHealthAndFamilyHistory:any = _.omit(healthAndFamilyHistory, ['height', 'weight']);
        var tempFamilyHistory:any = "";
        let familyHistoryKeys = Object.keys(tempHealthAndFamilyHistory.familyHistory);

        console.log(familyHistoryKeys);
        familyHistoryKeys.map((key)=> {
            if(tempHealthAndFamilyHistory.familyHistory[key]==true)
            // tempFamilyHistory.push(key);
            tempFamilyHistory = key;
        });
        console.log(tempFamilyHistory);
        tempHealthAndFamilyHistory.familyHistory = tempFamilyHistory;
        console.log(tempHealthAndFamilyHistory);  
        const fullData = {
            ...lifestyleInformation,
            activeScale: parseInt(lifestyleInformation.activeScale),
            BMI: parseInt(lifestyleInformation.BMI),
            ...dietaryIntake,
            ...tempHealthAndFamilyHistory,
            gender: t(`label.${personalInformation.gender.toLowerCase()}`),
            race: t(`label.${personalInformation.race.toLowerCase()}`)
        }

        onSubmit(fullData, "prediction");
    }

    const createPatient = async(event: React.MouseEvent<HTMLButtonElement> , action: string) => {
        event.preventDefault();
     
        let tempData = (personalInformation.dateOfBirth.split('-')).join('');

        tempData = tempData.slice(2, tempData.length);

        let tempIC = personalInformation.ic.slice(0, 6);
        
        if(tempIC!==tempData) {
            setError({
                ic: 'IC must match date of birth',
                dateOfBirth: 'IC must match date of birth',
            })

            return;
        }
        
        try{
           let patientData = {
               fullName: personalInformation.fullName,
               ic: personalInformation.ic,
               phoneNumber: personalInformation.phoneNumber,
               email: personalInformation.email,
               race: personalInformation.race,
               gender: personalInformation.gender,
               dateOfBirth: personalInformation.dateOfBirth,
               reasonForConsultation: personalInformation.reasonForConsultation
           }
           
            const value = await PersonalInformationFormValidation.validateSync(omitBy({
                ...patientData,
            }, (value)=> isEmpty(value) || value==='' || isUndefined(value)), {
                strict: true,
                abortEarly: false,
                stripUnknown: false
            });
            console.log('value', value);
            // console.log(moment(personalInformation.dateOfBirth));

            let newAction = '';

            if(action=='create') newAction = 'create';
           else newAction = 'save'
            
           onSubmit(value, newAction);

        }
        catch(err: any) {
            console.log('err', err);
            console.log('err.inner', err?.inner);
            var tempErrors:any = {};

            err?.inner.map((error: any, index: number)=> {
                let { path, value }:any = errorHandler.validation(error);

                if(value.includes('required')) {
                    const [ first, ...last] = value.split(' ');
                    console.log(last);
                    value = t(`label.${path}`) + " " + last.join(' ') + '.';
                }

                if (path.indexOf('.')!==-1) {
                    const str = path.split('.');
                    path = str[0];
                    subPath = str[1];
                    // setError({...error, [path]: {[subPath]: t(`${value}`, { field: t(`label.${subPath}`)})} });
                }
                // else {
                //     setError({...error, [path]: t(`${value}`, { field: t(`label.${path}`)}) });
                // }
               
                pages.map((page, index)=> {
                   
                    if(page.fields.includes(path) || page.fields.includes(subPath)) {
                        // console.log('page', page);
                        setPageVisibility(page.index);
                    }
                })
    
                if (document.querySelector(`input[name=${path}]`)) {
                    (document.querySelector(`input[name=${path}]`) as HTMLInputElement).focus();
    
                }
                else if (document.querySelector(`div[name=${path}]`)) {
                    (document.querySelector(`div[name=${path}]`) as HTMLInputElement).focus();
                }
                
                tempErrors[path]= value;
                console.log('tempErrors', tempErrors);
            })
            console.log('tempErrors', tempErrors);
            setError(tempErrors);
            var subPath = '';

            
        }
    }


    const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        
    }


    const prevPage = () => {
        if (pageVisibility > 0) {
            setPageVisibility(pageVisibility - 1);
        }
    }


    const handleTextChange = (name: string, value: any) => {
        console.log('name', name);
        console.log('value', value);
        setToaster({ type:'success', message: value});
        // let tempProps: any = {
        //     type: 'success', message: value
        // }

        // Toaster(tempProps, styles.fadeInRight);
        let tempError = error;
        if(tempError.hasOwnProperty(name)) tempError = _.omit(tempError, [name]);

        setError(tempError);
        if(name.indexOf('.')!==-1) {
            let subName = name.split('.')[1]
            name = name.split('.')[0];

            if (name.includes('personalInformation')) {
                // setPersonalInformation({...personalInformation, [name]: {
                //     ...personalInformation[name],
                //     [subName]: value
                // }});

                setPersonalInformation({...personalInformation, [subName]: value});
            }

            if(name.includes('healthAndFamilyHistory')) {
                setHealthAndFamilyHistory({
                    ...healthAndFamilyHistory, 
                    [subName]: value
                });
            }

            if (name.includes('dietaryIntake')) {
                setDietaryIntake({
                    ...dietaryIntake,
                    [subName]: value
                });
            }

            if (name.includes('lifestyleInformation')) {
                setLifestyleInformation({
                    ...lifestyleInformation,
                    [subName]: value
                });
            }
            

            return;
        }
        // else 
        // setPersonalInformation({...personalInformation, [name]: value });

        // if(name=='ic' && value.length > 5 && personalInformation.dateOfBirth != '') {
        //     if(personalInformation.dateOfBirth!='') {
        //         let tempData = (personalInformation.dateOfBirth.split('-')).join('');
        //         console.log('tempData', tempData);
        //         tempData = tempData.slice(2, tempData.length);

        //         value = value.slice(0, 6);
        //         console.log('tempData', tempData);
        //         if(value.includes(tempData)) {
        //             console.log('tempData', tempData);
        //         }
        //         if(value!==tempData) {
        //             setError({
        //                 [name]: 'IC must match date of birth'
        //             })
        //         }
        //     }
            
        // }
    }

     const handleCommentChange = (name: string, value: any) => {
      
        let tempError = error;
        if(tempError.hasOwnProperty(name)) tempError = _.omit(tempError, [name]);

        setError(tempError);
        if(name.indexOf('.')!==-1) {
            let subName = (name.split('.')[1]).toString();
            console.log('subName', subName);
            // let index = parseInt((name.split('[')[1]).split(']')[0]);
            // console.log('index', index);
            // subName = subName.split('[')[0];
            name = name.split('.')[0];
            
            // let tempArray = [...clinicComments];
            // let item: any = {...tempArray[index]};
            // item[subName] = value;
            // tempArray[index] = item;

            // setClinicComments(tempArray);

            setModalComment({...modalComment, [subName]: value})
        }
    }


    const handleSearchChange = (name: string, value: any) => {
        let tempError = error;
        if(tempError.hasOwnProperty(name)) tempError = _.omit(tempError, [name]);

        setError(tempError);
        value = parseFloat(value) ? parseFloat(value): value;
  
        if(name.indexOf('.')!==-1) {
            let subName = name.split('.')[1]
        
            name = name.split('.')[0];
            if (name.includes('personalInformation')) {
                setPersonalInformation({...personalInformation, [name]: {
                    ...personalInformation[name],
                    [subName]: value
                }});
            }

            if(name.includes('healthAndFamilyHistory')) {
                setHealthAndFamilyHistory({
                    ...healthAndFamilyHistory, 
                    [subName]: value
                });
            }

            if (name.includes('dietaryIntake')) {
                setDietaryIntake({
                    ...dietaryIntake,
                    [subName]: value
                });
            }

            if (name.includes('lifestyleInformation')) {
                setLifestyleInformation({
                    ...lifestyleInformation,
                    [subName]: value
                });
            }
            

            return;
        }
        
        // setPersonalInformation({...personalInformation, [name]: value });
    }

    const handleSelectRadio = (name: string, value: any) => {
        value = (value=='true' || value=='false')? (value==='true'): value;
        let tempError = error;
        if(tempError.hasOwnProperty(name)) tempError = _.omit(tempError, [name]);

        setError(tempError);

        if(name.indexOf('.')!==-1) {
            let subName = name.split('.')[1]
        
            name = name.split('.')[0];
            if (name.includes('personalInformation')) {
                setPersonalInformation({...personalInformation, [name]: {
                    ...personalInformation[name],
                    [subName]: value
                }});
            }

            if(name.includes('healthAndFamilyHistory')) {

                if (subName=='noCondition' && value==true) {

                }
                else {
                    setHealthAndFamilyHistory({
                        ...healthAndFamilyHistory, 
                        [subName]: value
                    });
                }
                
            }

            if (name.includes('dietaryIntake')) {
                setDietaryIntake({
                    ...dietaryIntake,
                    [subName]: value
                });
            }

            if (name.includes('lifestyleInformation')) {
                setLifestyleInformation({
                    ...lifestyleInformation,
                    [subName]: value
                });
            }
            

            return;
        }
        // setPersonalInformation({...personalInformation, [name]: value});
     
    }

    const handleChecked = (name: string, subName: string, value: any) => {
        let tempError = error;
        if(tempError.hasOwnProperty(name)) tempError = _.omit(tempError, [name]);

        setError(tempError);
        console.log('name', name);
        console.log('subName', subName);
        console.log("value", value);

        // if(healthAndFamilyHistory.healthHistory.noCondition==true) {
        //     setHealthAndFamilyHistory({
        //         ...healthAndFamilyHistory,
        //         healthHistory: {
        //             ...healthAndFamilyHistory.healthHistory,
        //             highCholesterol: false,
        //             heartAttack: false,
        //             congenitalHeartDisease: false,
                    
        //         }
        //     })
        // }

        // if(healthAndFamilyHistory.familyHistory.noCondition==true) {
        //     setHealthAndFamilyHistory({
        //         ...healthAndFamilyHistory,
        //         familyHistory: {
        //             highCholesterol: false,
        //             heartAttack: false,
        //             congenitalHeartDisease: false
        //         }
        //     })
        // }
        let tempSubName = '';

        if (name.indexOf('.') !== -1) {
            tempSubName = name.split('.')[1];
            name = name.split('.')[0];
        }

        if (name.includes('personalInformation')) {

            if (tempSubName != '') {
                setPersonalInformation({
                    ...personalInformation, 
                    [tempSubName]: {
                        ...personalInformation[tempSubName],
                        [subName]: value,
                    }}
                );
            }
            else {
                setPersonalInformation({
                    ...personalInformation, 
                    [name]: {
                        ...personalInformation[name],
                        [subName]: value,
                    }}
                );
            }
        }

        if (name.includes('healthAndFamilyHistory')) {
            console.log('tempSubName', tempSubName);
            console.log('subName', subName);
            if (tempSubName != ''){
                if(subName=='noCondition' && value == true) {
                    setHealthAndFamilyHistory({
                        ...healthAndFamilyHistory,
                        [tempSubName]: {
                            congenitalHeartDisease: false,
                            heartOperation: false,
                            heartAttack: false,
                            highCholesterol: false,
                            [subName]: value
                        }
                    });
                }
                else {
                    setHealthAndFamilyHistory({
                        ...healthAndFamilyHistory,
                        [tempSubName]: {
                            ...healthAndFamilyHistory[tempSubName],
                            [subName]: value
                        }
                    });
                }
                
            }
            else {
                setHealthAndFamilyHistory({
                    ...healthAndFamilyHistory,
                    [name]: {
                        ...healthAndFamilyHistory[name],
                        [subName]: value
                    }
                });
            }
            
        }

        if (name.includes('dietaryIntake')) {

            if(tempSubName != '') {
                setDietaryIntake({
                    ...dietaryIntake,
                    [tempSubName]: {
                        ...dietaryIntake[tempSubName],
                        [subName]: value
                    }
                });
            }
            else {
                setDietaryIntake({
                    ...dietaryIntake,
                    [name]: {
                        ...dietaryIntake[name],
                        [subName]: value
                    }
                });
            }
            
        }

        if (name.includes('lifestyleInformation')) {

            if(tempSubName != '') {
                setLifestyleInformation({
                    ...lifestyleInformation,
                    [tempSubName]: {
                        ...lifestyleInformation[tempSubName],
                        [subName]: value
                    }
                });
            }
            else {
                setLifestyleInformation({
                    ...lifestyleInformation,
                    [name]: {
                        ...lifestyleInformation[name],
                        [subName]: value
                    }
                });
            }
            
        }

    }

    const handleSelectChange = (name: string, value: any) => {
        let tempError = error;
        if(tempError.hasOwnProperty(name)) tempError = _.omit(tempError, [name]);

        setError(tempError);
        console.log('name', name);
        console.log('value', value);
        if(name.indexOf('.')!==-1) {
            const str = name;
            name = str.split('.')[0];
            let subName = str.split('.')[1];
            console.log('subName', subName);
            if (name.includes('personalInformation')) {
                setPersonalInformation({...personalInformation, [name]: {
                    ...personalInformation[name],
                    [subName]: value
                }});
            }

            if(name.includes('healthAndFamilyHistory')) {
                setHealthAndFamilyHistory({
                    ...healthAndFamilyHistory, 
                    [subName]: value
                });
            }

            if (name.includes('dietaryIntake')) {
                setDietaryIntake({
                    ...dietaryIntake,
                    [subName]: value
                });
            }

            if (name.includes('lifestyleInformation')) {
                setLifestyleInformation({
                    ...lifestyleInformation,
                    [subName]: value
                });
            }
            

            return;
        }
        // setPersonalInformation({...personalInformation, [name]: value})
    }

    const handleAddressChange = (name: string, value: any) => {
        let tempError = error;
        if(tempError.hasOwnProperty(name)) tempError = _.omit(tempError, [name]);

        setError(tempError);
        setPersonalInformation({...personalInformation, address: {
                ...personalInformation.address,
                [name]: value
            }
        });
    }

    const handleImageChange = (action: string = 'add', name: string, blob: any) => {
        // const response: any = upload(blob);
        // console.log('blob', blob);
        // console.log('name', name);
        // console.log('blob', blob);
        if(name.toLowerCase().includes('comment')){
            let subName = name.split('.')[1];
            if(modalComment[subName].length > 0 && action=='add') {
                setModalComment({...modalComment, [subName]: [blob]});
                // if (blob instanceof Blob) {
                //     setModalComment({...modalComment, [subName]: [...modalComment[subName], blob]});
                // }
                // else {
                //     setModalComment({...modalComment, [subName]: [...modalComment[subName], ...blob]});
                // }
               

            }
            else {
                if (blob instanceof Blob) {
                    setModalComment({...modalComment, [subName]: [blob]});
                }
                // else {
                //     setModalComment({...modalComment, [subName]: [...blob]});
                // }
            }
           
            // let subName = name.split('.')[1];
         
            // let index = parseInt((name.split('[')[1]).split(']')[0]);
       
            // name = name.split('[')[0];
            // var tempArray:any = [...clinicComments];
            // if(clinicComments[index][subName].length > 0 && action == 'add') {
            //     // console.log('1');
            //     let item: any = {...tempArray[index]};
            //     let subItem = item[subName];
            //     // item[subName] = blob;
            //     subItem = subItem.concat([...blob]);
            //     // console.log('subItem', subItem);
            //     item[subName] = subItem;
            //     tempArray[index] = item;
            // }
            // else {
            //     // console.log('1');
            //     if(blob instanceof Blob) {
            //         let item = {...tempArray[index]};
            //         item[subName] = [blob];
            //         // tempArray[index][subName].push(blob);
            //         tempArray[index] = item;
            //     }
            //     else {
            //         let item = {...tempArray[index]};
            //         item[subName] = [...blob];
            //         tempArray[index] = item;  
            //     }

                
            // }
       
            // setClinicComments(tempArray);
        }
        else {
                setPersonalInformation({
                ...personalInformation, [name]: blob
            })
        }
    }

    const newComment = () => {
        const newcomment: any = {
            id: -1,
            diagnosis: 'Bone pain.',
            comment: 'Bone pain in pelvic area. Will refer to bone specialist.',
            user: {},
            image: []
        }

        setClinicComments([
        ...clinicComments, newcomment
        ]);
        
        
    }

    const createEditComment = (e: any) => {
  
        const index = modalComment.arrayIndex;
        // console.log('clinicComment', clinicComments[index])
     
        var user:any = localStorage.getItem('username')|| '';
        if(user!='') {
        
            user = {
                username: user
            }
        }
        else {
            user= {
                username: 'admin2'
            }
        }
        // let tempComment = omitBy({
        //     patientID: personalInformation.patientID,
        //     id: clinicComments[index].id || undefined,
        //     diagnosis: clinicComments[index].diagnosis,
        //     comment: clinicComments[index].comment,
        //     user: user,
        //     image: clinicComments[index].image || undefined
        // }, isUndefined);
        // let tempImg = modalComment?.image.filter((img:any, index: any)=> {
        //     return !isUndefined(img) && img != null
        // });

        // console.log('tempImg', tempImg);
        var image:any = [];
        if(_.isEqual(clinicComments[index]?.image, modalComment?.image)) {
            // tempComment = _.omit(tempComment, ['image']);
            image = undefined;
        }
        else {
            image = Array.isArray(modalComment?.image)?  modalComment?.image.filter((img:any, index: any)=> {
                
                return !isUndefined(img) && img != null && typeof(img)!='string'
            }) : modalComment?.image ? modalComment?.image : undefined 
        }
        console.log('imagesss', image);
        let tempComment = omitBy({
            id: modalComment?.id > -1 ? modalComment.id : undefined,
            patientID: personalInformation.patientID,
            diagnosis: modalComment?.diagnosis,
            comment: modalComment?.comment,
            user: user,
            image: image,
        }, isUndefined);
       
       
        
        let action = tempComment?.id > -1? 'edit comment': 'create comment';
        onSubmit(tempComment, action);
    }

    const editComment = (e: any) => {
      
        const index = parseInt(e.target.id);

        // console.log('clinicComment', clinicComments[index])
        // console.log('index', e.target.id);
        // console.log('localStorage', localStorage);
        // var user:any = localStorage.getItem('user')|| '';
        // console.log('user', user);
        // if(user!='') {
        //     user = localStorage.getItem('user');
        //     user = {
        //         username: user
        //     }
        // }
        // else {
        //     user= {
        //         username: 'admin1'
        //     }
        // }
        // let tempComment = omitBy({
        //     patientID: personalInformation.patientID,
        //     id: clinicComments[index].id || undefined,
        //     diagnosis: clinicComments[index].diagnosis,
        //     comment: clinicComments[index].comment,
        //     image: clinicComments[index].image || undefined,
        //     user: user,
        // }, isUndefined);
       
        // onSubmit(tempComment, 'edit comment');
    
        // ...clinicComments[index]
        let tempComment:any = {
            id: clinicComments[index].id,
            diagnosis: clinicComments[index].diagnosis,
            comment: clinicComments[index].comment,
            image: clinicComments[index].image,
            created: clinicComments[index].created,
            arrayIndex: index,
        }
     
        setModalComment({
            ...modalComment, ...tempComment
        });
        toggleCommentModalVisibility(true, index);
    }

    const removeComment = (e: any) => {
        console.log(e);
        let index = parseInt(e.target.id);
        let tempComments = [...clinicComments];
        tempComments.splice(index, 1);
        setClinicComments([
            ...tempComments
        ])   
    }

    const toggleCommentModalVisibility = (visible: boolean, index:number=-1) => {
        if(index == -1) {
            setModalComment({
                id:-1,
                diagnosis: '',
                comment: '',
                image: []
            })
        }
        // else {
        //     setModalComment({...clinicComments[index]});
        // }

        setCommentModal(visible);
    }

    return (
        <div className="patient-info">
             <Modal visible={commentModal} onClose={toggleCommentModalVisibility}>
                    <Row>
                    
                        <Col>
                            <Row>
                                <div style={{width: 'inherit'}}>
                                    <TextInput  key={modalComment?.id} value={modalComment?.diagnosis} required error={!!error?.modalComment?.diagnosis} name="modalComment.diagnosis" label={`${t('label.diagnosis')}` + (modalComment?.created!=undefined? `  Date: ${modalComment?.created}`: '')} onChange={handleCommentChange} />      
                                    <AlertBox error={error?.modalComment?.diagnosis} name={t('label.diagnosis')} />
                                </div>
                            </Row>

                            <Row>
                                <div style={{width: 'inherit'}}>
                                    <TextArea  key={modalComment?.id} value={modalComment?.comment} required error={!!error?.modalComment?.comment} name="modalComment.comment" label={t('label.comment')} onChange={handleCommentChange} />
                                    <AlertBox error={error?.modalComment?.comment} name={t('label.comment')} />
                                </div>
                            </Row>
                        </Col>
                        <Col>
                            <ImageUpload comment={true} onChangeImg={handleImageChange} name="modalComment.image" blob={modalComment?.image}/>
                        </Col>
                    
                    </Row>
                    <Row> 
                        <button className="standard" id={modalComment.arrayIndex} onClick={createEditComment}>{modalComment?.id == -1? 'New Comment': <><img style={{width: '20px', height: '20px'}} src="/assets/images/edit.png" /> 'Edit Comment'</>}</button>
                    </Row>

                </Modal>
                { personalInformation.patientID !==-1 && 
                    <div className="back"><button className="back--button" onClick={()=> {history.push(`/patient/view/${encode(personalInformation.patientID)}`)}}>Go back to {personalInformation?.fullName}'s view</button></div> 
                }
            {/* {
                personalInformation.patientID !== -1 &&
        
                <ProgressBar  
                currentPage={pageVisibility}
                maxSize = {maxSize}
                onClick={setPageVisibility}
                pages={[
                    {
                        name: 'new-patient',
                        index: 0
                    },
                    {
                        name: 'health-history',
                        index: 1
                    },
                    {
                        name: 'dietary-intake',
                        index: 2
                    },
                    {
                        name: 'lifestyle-information',
                        index: 3
                    },
                    {
                        name: 'diagnosis-comments',
                        index: 4
                    }
                ]}
                />
            } */}
         
            <Page visibility= {pageVisibility} numOfChildren={setMaxSize}>
                <PagePane index={0}>
                    <div className="division">
                        <div className="header">   
                            <h2>Personal Information</h2>
                        </div>
                        <div className="content">                            
                            <div className="divider--fifty">
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <TextInput value={personalInformation?.fullName} required error={!!error?.fullName} name='personalInformation.fullName' label={t('label.fullName')} onChange={handleTextChange} />
                                        <AlertBox error={error?.fullName} name={t('label.fullName')} />
                                    </div>
                                    {/* <div style={{width: 'inherit'}}>
                                        <TextInput value={personalInformation?.lastName} required error={!!error?.lastName} name='lastName' label={t('label.lastName')} onChange={handleTextChange} />
                                        <AlertBox error={error?.lastName} name={t('label.lastName')} />
                                    </div> */}
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <TextInput value={personalInformation?.ic} required error={!!error?.ic} name='personalInformation.ic' label={t('label.ic')} onChange={handleTextChange} />
                                        <AlertBox error={error?.ic} name={t('label.ic')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <TextInput value={personalInformation?.phoneNumber} required error={!!error?.phoneNumber} name='personalInformation.phoneNumber' label={t('label.phoneNumber')} onChange={handleTextChange} />
                                        <AlertBox error={error?.phoneNumber} name={t('label.phoneNumber')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <TextInput disabled={false} value={personalInformation?.email} required error={!!error?.email} name='personalInformation.email' label={t('label.email')} onChange={handleTextChange} />
                                        <AlertBox error={error?.email} name={t('label.email')} />
                                    </div>
                                </Row>
                                <Row>
                                <div style={{width: 'inherit'}}>
                                        <DateInput value={personalInformation?.dateOfBirth} required error={!!error?.dateOfBirth} name='personalInformation.dateOfBirth' label={t('label.dateOfBirth')} onChange={handleTextChange} />
                                        <AlertBox error={error?.dateOfBirth} name={t('label.dateOfBirth')} />
                                    </div>
                                </Row>
                                <Row>
                                    <Col style={{width: 'inherit'}}>
                                        <RadioInput values={[
                                            {
                                                name: 'chinese',
                                                label: t('option.chinese'),
                                                value: 'CH'
                                            },
                                            {
                                                name: 'malay',
                                                label: t('option.malay'),
                                                value: 'MA'
                                            },
                                            {
                                                name: 'indian',
                                                label: t('option.indian'),
                                                value: 'IN'
                                            },
                                            {
                                                name: 'other',
                                                label: t('option.other'),
                                                value: 'OT'
                                            }
                                        ]} 
                                            multiple = {false}
                                            defaultValue={personalInformation.race}
                                            required 
                                            error={error?.race} 
                                            name='personalInformation.race' 
                                            label={t('label.race')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.race} name={t('label.race')} />
                                    </Col>
                                    <Col style={{width: 'inherit'}}>
                                        <RadioInput 
                                            multiple={false}
                                            values={[
                                                {
                                                    name: 'male',
                                                    label: t('option.male'),
                                                    value: 'M'
                                                },
                                                {
                                                    name: 'female',
                                                    label: t('option.female'),
                                                    value: 'F'
                                                }
                                            ]} 
                                            defaultValue={personalInformation.gender}
                                            required
                                            error={!!error?.gender} 
                                            name='personalInformation.gender' 
                                            label={t('label.gender')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.gender} name={t('label.gender')} />
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SelectInput 
                                            name="educationLevel"
                                            label={t('label.educationLevel')}
                                            required
                                            defaultValue={personalInformation.educationLevel}
                                            error={!!error.educationLevel}
                                            selectOptions={[
                                                {
                                                    name: "bachelors",
                                                    label: t('label.bachelors'),
                                                    value: t('label.bachelors')
                                                },
                                                {
                                                    name: "secondarySchool",
                                                    label: t('label.secondarySchool'),
                                                    value: t('label.secondarySchool')
                                                },
                                                {
                                                    name: "masters",
                                                    label: t('label.masters'),
                                                    value: t('label.masters')
                                                },
                                                {
                                                    name: 'phd',
                                                    label: t('label.phd'),
                                                    value: t('label.phd')
                                                }
                                            ]}
                                            onSelect={handleSelectChange}
                                        />
                                        <AlertBox error={error?.educationLevel} name={t('label.educationLevel')} />
                                    </div>
                                </Row> */}
                                {/* <Row>
                                    <div style={{width: 'inherit'}}>
                                        <AddressInput 
                                            addressInput={personalInformation.address}
                                            error={error?.address}
                                            onChange={handleAddressChange}
                                        />  
                                    </div>
                                </Row> */}
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <TextArea value={personalInformation.reasonForConsultation} required error={error?.reasonForConsultation} name='reasonForConsultation' label={t('label.reasonForConsultation')} onChange={handleTextChange} />
                                        <AlertBox error={error?.reasonForConsultation} name={t('label.reasonForConsultation')} />
                                    </div>
                                </Row>
                            </div>
                            <div className="divider--fifty">
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <ImageUpload onChangeImg={handleImageChange} name="personalInformation.profilePicBlob" blob={personalInformation?.profilePicBlob}/>
                                    </div>
                                </Row>
                            </div>
                            
                        </div>
                        <div style={{width: '80%', display: 'flex'}}> 
                            <div style={{ justifyContent: 'flex-start', float: 'right', width: '100%', alignSelf: 'flex-start', display: 'flex'}}>
                                {/* {
                                    pageVisibility > 0 && personalInformation.patientID!== -1 && <button className="standard" onClick={prevPage}>Prev</button>
                                }   */}
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end'}}>
                                {/* {
                                    pageVisibility < (maxSize - 1 ) && personalInformation.patientID!== -1 && <button className="standard" onClick={nextPage}>Next</button>
                                } */}
                                {
                                    personalInformation.patientID!== -1 ?
                                    <button className="save" onClick={saveAndContinue}>{'Save and Continue'}</button>
                                    :<Row>
                                        <button className="save" onClick={(event)=>createPatient(event, 'save')}>{'Save Patient'}</button>
                                        <button className="save" onClick={(event)=>createPatient(event, 'add another')}>{'Save Patient and Add Another'}</button>
                                    </Row>
                                }
                            </div>
                        </div>
                    </div>
                    
                </PagePane>
                {/*<PagePane index={2}>
                     <div className="content">
                        <div className="header">   
                            <h3>Smoking Status</h3>
                        </div>
                        
                        <div className="divider">
                            <Row>
                                <div style={{width: 'inherit'}}>
                                    <RadioInput 
                                        multiple={false}
                                        values={[
                                            {
                                                name: 'yes',
                                                label: t('option.yes'),
                                                value: 'true'
                                            },
                                            {
                                                name: 'no',
                                                label: t('option.no'),
                                                value: 'false'
                                            },
                                            {
                                                name: 'exSmoker',
                                                label: t('option.exSmoker'),
                                                value: 'Ex-Smoker'
                                            }
                                        ]} 
                                        defaultValue={personalInformation.smokingStatus.status}
                                        required 
                                        error={!!error?.smokingStatus?.status} 
                                        name='smokingStatus.status' 
                                        label={t('question.smokingStatus', {smoking: 'cigarettes'})} 
                                        onSelect={handleSelectRadio} 
                                    />
                                    <AlertBox error={error?.smokingStatus?.status} name={t('label.smokingStatus')} />
                                </div>
                                
                            </Row>
                            {   personalInformation.smokingStatus.status != 'false' &&
                                <Row>
                                <div style={{width: 'inherit'}}>
                                    <SelectInput 
                                        name="smokingStatus.cigarettesPerDay"
                                        label={t('label.cigarettesPerDay')}
                                        required
                                        value={personalInformation.smokingStatus.cigarettesPerDay}
                                        error={!!error?.smokingStatus?.cigarettesPerDay}
                                        selectOptions={cigarettesPerDayValues}
                                        onSelect={handleSelectChange}
                                    />
                                    <AlertBox error={error?.smokingStatus?.cigarettesPerDay} name={t('label.educationLevel')} />
                                </div>
                                </Row>
                            }
                            { 
                                personalInformation.smokingStatus.status=='Ex-Smoker' && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={lastHundredYears || []} value={personalInformation?.smokingStatus?.lastSmoked} required error={!!error?.smokingStatus?.lastSmoked} name='smokingStatus.lastSmoked' label={t('question.lastSmoked')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.smokingStatus?.lastSmoked} name={t('label.lastSmoked')} />
                                    </div>
                                </Row>
                            }
                            { 
                                (personalInformation.smokingStatus.status=='Ex-Smoker'|| personalInformation.smokingStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={personalInformation?.smokingStatus?.startedSmokingAge} required error={!!error?.startedSmokingAge} name='smokingStatus.startedSmokingAge' label={t('question.startedSmokingAge')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.smokingStatus?.startedSmokingAge} name={t('label.startedSmokingAge')} />
                                    </div>
                                </Row>
                            }
                            
                            { 
                                (personalInformation.smokingStatus.status=='Ex-Smoker'|| personalInformation.smokingStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={personalInformation?.smokingStatus?.yearsSmoked} required error={!!error?.smokingStatus?.yearsSmoked} name='smokingStatus.yearsSmoked' label={t('question.yearsSmoked')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.smokingStatus?.yearsSmoked} name={t('label.yearsSmoked')} />
                                    </div>
                                </Row>
                            }
                            {
                                (personalInformation.smokingStatus.status == 'true' || personalInformation.smokingStatus.status == 'Ex-Smoker') &&
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <Checkbox
                                            input={personalInformation.smokingStatus.causeOfSmoking}
                                            name="smokingStatus.causeOfSmoking" 
                                            label={t('question.causeOfSmoking')}
                                            error={!!error?.smokingStatus?.causeOfSmoking}
                                            values={
                                                [
                                                    {
                                                        name:'stress',
                                                        value: 'stress',
                                                        label: t('label.stress')
                                                    },
                                                    {
                                                        name:'friendsFamily',
                                                        value: 'friends/family',
                                                        label: t('label.friendsFamily')
                                                    },
                                                    {
                                                        name:'social',
                                                        value: 'social',
                                                        label: t('label.social')
                                                    },
                                                ]
                                            }
                                            required
                                            onCheck={handleChecked}
                                        />
                                        <AlertBox error={error?.smokingStatus?.causeOfSmoking} name={t('label.causeOfSmoking')}/>
                                    </div>
                                </Row>
                            }
                            <Row>
                                <div style={{width: 'inherit'}}>
                                    <RadioInput 
                                        multiple={false}
                                        values={[
                                            {
                                                name: 'cigarettes',
                                                label: t('option.cigarettes'),
                                                value: "Cigarettes"
                                            },
                                            {
                                                name: 'eCigarettes',
                                                label: t('option.eCigarettes'),
                                                value: "E-Cigarettes"
                                            },
                                            {
                                                name: 'no',
                                                label: t('option.no'),
                                                value: false
                                            },
                                            {
                                                name: 'exSmoker',
                                                label: t('option.exSmoker'),
                                                value: 'Ex-Smoker'
                                            }
                                        ]} 
                                        defaultValue={personalInformation.familyHasSmoker}
                                        required 
                                        error={error?.familyHasSmoker} 
                                        name='familyHasSmoker' 
                                        label={t('question.familyHasSmoker')} 
                                        onSelect={handleSelectRadio} 
                                    />
                                    <AlertBox error={error?.familyHasSmoker} name={t('label.familyHasSmoker')} />
                                </div>
                                
                            </Row>
                            
                        </div>
                        <div className="divider">
                            <Row>
                                <div style={{width: 'inherit'}}>
                                    <RadioInput 
                                        multiple={false}
                                        values={[
                                            {
                                                name: 'yes',
                                                label: t('option.yes'),
                                                value: 'true'
                                            },
                                            {
                                                name: 'no',
                                                label: t('option.no'),
                                                value: 'false'
                                            },
                                            {
                                                name: 'exSmoker',
                                                label: t('option.exSmoker'),
                                                value: 'Ex-Smoker'
                                            }
                                        ]} 
                                        defaultValue={personalInformation.eCigaretteStatus.status}
                                        required 
                                        error={error?.eCigaretteStatus?.status} 
                                        name='eCigaretteStatus.status' 
                                        label={t('question.smokingStatus', {smoking: 'e-cigarettes'})} 
                                        onSelect={handleSelectRadio} 
                                    />
                                    <AlertBox error={error?.eCigaretteStatus?.status} name={t('label.eCigaretteStatus')} />
                                </div>
                                
                            </Row>
                            {   personalInformation.eCigaretteStatus.status != 'false' &&
                                <Row>
                                <div style={{width: 'inherit'}}>
                                    <SelectInput 
                                        name="eCigaretteStatus.nicotineAmt"
                                        label={t('question.nicotineAmt')}
                                        required
                                        value={personalInformation.eCigaretteStatus.nicotineAmt}
                                        error={!!error?.eCigaretteStatus?.nicotineAmt}
                                        selectOptions={nicotineAmtValues}
                                        onSelect={handleSelectChange}
                                    />
                                    <AlertBox error={error?.eCigaretteStatus?.nicotineAmt} name={t('label.eCigaretteStatus.nicotineAmt')} />
                                </div>
                                </Row>
                            }
                            { 
                                (personalInformation.smokingStatus.status=='Ex-Smoker'|| personalInformation.smokingStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={personalInformation?.smokingStatus.startedSmokingAge} required error={!!error?.startedSmokingAge} name='startedSmokingAge' label={t('question.startedSmokingAge')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.smokingStatus?.startedSmokingAge} name={t('label.yearsSmoked')} />
                                    </div>
                                </Row>
                            }
                            
                            { 
                                personalInformation.eCigaretteStatus.status=='Ex-Smoker' && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={lastHundredYears || []} value={personalInformation?.eCigaretteStatus?.lastSmoked} required error={!!error?.eCigaretteStatus?.lastSmoked} name='eCigaretteStatus.lastSmoked' label={t('question.lastSmoked')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.eCigaretteStatus?.lastSmoked} name={t('label.lastSmoked')} />
                                    </div>
                                </Row>
                            }
                            { 
                                (personalInformation.eCigaretteStatus.status=='Ex-Smoker'|| personalInformation.eCigaretteStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={personalInformation.eCigaretteStatus?.yearsSmoked} required error={!!error?.eCigaretteStatus?.yearsSmoked} name='eCigaretteStatus.yearsSmoked' label={t('question.yearsSmoked')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.eCigaretteStatus?.yearsSmoked} name={t('label.yearsSmoked')} />
                                    </div>
                                </Row>
                            }
                            {
                                (personalInformation.eCigaretteStatus.status == 'true' || personalInformation.eCigaretteStatus.status == 'Ex-Smoker') &&
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <Checkbox
                                            input={personalInformation.eCigaretteStatus.causeOfSmoking}
                                            name="eCigaretteStatus.causeOfSmoking" 
                                            label={t('question.causeOfSmoking')}
                                            error={!!error?.eCigaretteStatus?.causeOfSmoking}
                                            values={
                                                [
                                                    {
                                                        name:'stress',
                                                        value: 'stress',
                                                        label: t('label.stress')
                                                    },
                                                    {
                                                        name:'friendsFamily',
                                                        value: 'friends/family',
                                                        label: t('label.friendsFamily')
                                                    },
                                                    {
                                                        name:'social',
                                                        value: 'social',
                                                        label: t('label.social')
                                                    },
                                                ]
                                            }
                                            required
                                            onCheck={handleChecked}
                                        />
                                        <AlertBox error={error?.eCigaretteStatus?.causeOfSmoking} name={t('label.causeOfSmoking')}/>
                                    </div>
                                </Row>
                            }
                            
                        </div>
                        
                    </div>
                    <div className="content">
                            <div className="header">
                                <h3>Alcohol Status</h3>
                            </div>
                            <div className="divider">
                                <Row>
                                   
                                        <RadioInput 
                                            multiple={false}
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: 'true'
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: 'false'
                                                },
                                                {
                                                    name: 'reformedAlcoholic',
                                                    label: t('option.reformedAlcoholic'),
                                                    value: 'Reformed Alcoholic'
                                                }
                                            ]} 
                                            defaultValue={personalInformation.alcoholStatus.status}
                                            required 
                                            error={error?.alcoholStatus?.status} 
                                            name='alcoholStatus.status' 
                                            label={t('question.alcoholStatus')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.alcoholStatus?.status} name={t('label.alcoholStatus')} />
                                    
                                   
                                    
                                </Row>
                                {   (personalInformation.alcoholStatus.status == 'true' || personalInformation.alcoholStatus.status == 'Reformed Alcoholic') &&
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <SelectInput 
                                                name="alcoholStatus.alcoholType"
                                                label={t('label.alcoholType')}
                                                required
                                                value={personalInformation?.alcoholStatus?.alcoholType}
                                                error={!!error?.alcoholStatus?.alcoholType}
                                                selectOptions={alcoholTypeValues}
                                                onSelect={handleSelectChange}
                                            />
                                            <AlertBox error={error?.alcoholStatus?.alcoholType} name={t('label.alcoholType')} />
                                        </div>
                                    </Row>
                                }
                                 {    (personalInformation.alcoholStatus.status == 'true' || personalInformation.alcoholStatus.status == 'Reformed Alcoholic') &&
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <SelectInput 
                                                name="alcoholStatus.avgAlcoholConsumption"
                                                label={personalInformation.alcoholStatus.status=='true'?t('label.avgAlcoholConsumption'): t('label.avgAlcoholConsumptionEx')}
                                                required
                                                value={personalInformation?.alcoholStatus?.avgAlcoholConsumption}
                                                error={!!error?.alcoholStatus?.avgAlcoholConsumption}
                                                selectOptions={averageAlcoholConsumptionValues}
                                                onSelect={handleSelectChange}
                                            />
                                            <AlertBox error={error?.alcoholStatus?.avgAlcoholConsumption} name={t('label.avgAlcoholConsumption')} />
                                        </div>
                                    </Row>
                                }
                                 { 
                                personalInformation.alcoholStatus.status=='Reformed Alcoholic' && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={lastHundredYears || []} value={personalInformation?.alcoholStatus?.lastDrank} required error={!!error?.alcoholStatus?.lastDrank} name='alcoholStatus.lastDrank' label={t('question.lastDrank')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.alcoholStatus?.lastDrank} name={t('label.lastDrank')} />
                                    </div>
                                </Row>
                            }
                            { 
                                (personalInformation.alcoholStatus.status=='Reformed Alcoholic'|| personalInformation.alcoholStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={personalInformation?.alcoholStatus?.startedDrinkingAge} required error={!!error?.startedDrinkingAge} name='alcoholStatus.startedDrinkingAge' label={t('question.startedDrinkingAge')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.alcoholStatus?.startedDrinkingAge} name={t('label.startedDrinkingAge')} />
                                    </div>
                                </Row>
                            }
                            
                            { 
                                (personalInformation.alcoholStatus.status=='Reformed Alcoholic'|| personalInformation.alcoholStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={personalInformation?.alcoholStatus?.yearsConsumed} required error={!!error?.alcoholStatus?.yearsConsumed} name='alcoholStatus.yearsConsumed' label={t('question.yearsConsumed')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.alcoholStatus?.yearsConsumed} name={t('label.yearsConsumed')} />
                                    </div>
                                </Row>
                            }
                            {
                                (personalInformation.alcoholStatus.status=='Reformed Alcoholic' || personalInformation.alcoholStatus.status == 'Ex-Smoker') &&
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <Checkbox
                                            input={personalInformation.alcoholStatus.causeOfDrinking}
                                            name="alcoholStatus.causeOfDrinking" 
                                            label={t('question.causeOfDrinking')}
                                            error={!!error?.alcoholStatus?.causeOfDrinking}
                                            values={
                                                [
                                                    {
                                                        name:'stress',
                                                        value: 'stress',
                                                        label: t('label.stress')
                                                    },
                                                    {
                                                        name:'friendsFamily',
                                                        value: 'friends/family',
                                                        label: t('label.friendsFamily')
                                                    },
                                                    {
                                                        name:'social',
                                                        value: 'social',
                                                        label: t('label.social')
                                                    },
                                                ]
                                            }
                                            required
                                            onCheck={handleChecked}
                                        />
                                        <AlertBox error={error?.alcoholStatus?.causeOfDrinking} name={t('label.causeOfDrinking')}/>
                                    </div>
                                </Row>
                            }
                            </div>
                            <div className="divider"></div>
                    </div> 
                    <div style={{width: '80%', display: 'flex'}}> 
                        <div style={{ justifyContent: 'flex-end', float: 'right', width: '43%', alignSelf: 'flex-start', display: 'flex'}}>
                        {
                            pageVisibility > 0 && <button className="standard" onClick={prevPage}>Prev</button>
                        }
                            
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'flex-end'}}>
                            {
                                pageVisibility < (maxSize-1) &&  <button className="standard" onClick={nextPage}>Next</button>
                            }
                            <button className="save" onClick={saveAndContinue}>Save and Continue</button>
                        </div>
                    </div>
                </PagePane>*/}
                {personalInformation.patientID !== -1 && 
                <PagePane index={1}>
                    <div className="division">
                        <div className="header">    
                            <h2>Health History</h2>
                        </div>
                        <div className="content">                        
                            <div className="divider--fifty">
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={height || []} value={healthAndFamilyHistory?.height} required error={!!error?.height} name='healthAndFamilyHistory.height' label={t('question.height')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.height} name={t('label.height')}/>
                                    </div>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={weight || []} value={healthAndFamilyHistory?.weight} required error={!!error?.weight} name='healthAndFamilyHistory.weight' label={t('question.weight')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.weight} name={t('label.weight')}/>
                                    </div>
                                </Row>
                                {/* <Row>
                                    <div style={{width: 'inherit'}}>
                                        <Checkbox
                                            input={healthAndFamilyHistory.healthHistory}
                                            name="healthAndFamilyHistory.healthHistory" 
                                            label={t('question.healthHistory')}
                                            error={!!error.healthHistory}
                                            values={healthHistoryValues}
                                            required
                                            onCheck={handleChecked}
                                        />
                                        <AlertBox error={error?.healthHistory} name={t('label.healthHistory')}/>
                                    </div>
                                </Row> */}
                                    {/* {
                                        
                                        personalInformation.healthHistory.otherVascularCondition && 

                                        <Row>
                                            <div style={{width: 'inherit'}}>
                                                <h5>If you have selected 'Other Vascular Condition', please state the name of the condition.</h5>
                                                <TextInput value={personalInformation.healthHistory.otherVascularConditionName} required error={error?.otherVascularConditionName} name='healthHistory.otherVascularConditionName' label={t('label.otherVascularConditionName')} onChange={handleTextChange} />
                                                <AlertBox  error={error?.otherVascularConditionName} name={t('label.otherVascularConditionName')}/>
                                            </div>
                                        </Row>
                                    }
                                        {
                                        personalInformation.healthHistory.otherVascularCondition && 

                                        <Row>
                                            <div style={{width: 'inherit'}}>
                                                <h5>If you have selected 'Other Vascular Condition', please state how long you have been living with this condition.</h5>
                                                <SearchInput searchOptions={yearsOption || []} value={personalInformation.healthHistory.otherVascularConditionYears} required error={!!error?.healthHistory.otherVascularConditionYears} name='healthHistory.otherVascularConditionYears' label={t('label.otherVascularConditionYears')} onSearch={handleSearchChange} />
                                                <AlertBox  error={error?.otherVascularConditionYears} name={t('label.otherVascularConditionYears')}/>
                                            </div>
                                        </Row>
                                    } */}
                            </div>
                            <div className="divider--fifty">
                                {/* <Row>
                                    <div  style={{display: 'flex', width: 'inherit', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>   
                                        <div></div>
                                        <div className="scale">
                                            <span className="severely-underweight"></span> 
                                            <span className="underweight"></span>
                                            <span className="normal"></span>
                                            <span className="overweight"></span>
                                            <span className="moderate-obese"></span>
                                            <span className="severely-obese"></span>
                                        </div>
                                    </div>
                                   
                                </Row> */}
                                
                                {
                                    weightStatus &&
                                    <Row>
                                        <div style={{display: 'flex', width: 'inherit', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                                        <h3>BMI</h3>
                                             <div className="board">
                                                
                                                <h4>{healthAndFamilyHistory.BMI}</h4>
                                                <div className="scale">
                                                    <h4 className={weightStatus}>{t(`label.${weightStatus}`)}</h4>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        
                                    </Row>
                                }
                            </div>
                        </div>
                        <div className="header">    
                            <h2>Family History</h2>
                        </div>
                        <div className="content">                        
                            <div className="divider--fifty">
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <Checkbox
                                            input={healthAndFamilyHistory.familyHistory}
                                            name="healthAndFamilyHistory.familyHistory" 
                                            label={t('question.familyHistory')}
                                            error={!!error.familyHistory}
                                            values={healthHistoryValues}
                                            required
                                            onCheck={handleChecked}
                                        />
                                        <AlertBox error={error?.familyHistory} name={t('label.familyHistory')}/>
                                    </div>
                             </Row>
                            </div>
                        </div>
                        <div style={{width: '100%', display: 'flex'}}> 
                            <div style={{ justifyContent: 'flex-start', float: 'right', width: '100%', alignSelf: 'flex-start', display: 'flex'}}>
                                {/* {
                                    pageVisibility > 0 && <button className="standard" onClick={prevPage}>Prev</button>
                                }   */}
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end'}}>
                                {
                                    pageVisibility < (maxSize - 1 ) &&  <button className="standard" onClick={nextPage}>Next</button>
                                }
                                    {/* <button className="save" onClick={saveAndContinue}>Save and Continue</button> */}
                            </div>
                        </div>
                    </div>
                    
                </PagePane>
                }
                {/* <PagePane index={2}>
                    <div className="content">
                        <div className="header">    
                            <h3>Family History</h3>
                        </div>
                    
                        <div className="divider">
                            <Row>
                                <div style={{width: 'inherit'}}>
                                    <Checkbox
                                        input={personalInformation.familyHistory}
                                        name="familyHistory" 
                                        label={t('question.familyHistory')}
                                        error={!!error.familyHistory}
                                        values={healthHistoryValues}
                                        required
                                        onCheck={handleChecked}
                                    />
                                    <AlertBox error={error?.familyHistory} name={t('label.familyHistory')}/>
                                </div>
                            </Row>
                                {/* {
                                    
                                    personalInformation.familyHistory.otherVascularCondition && 

                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <h5>If you have selected 'Other Vascular Condition', please state the name of the condition.</h5>
                                            <TextInput value={personalInformation.familyHistory?.otherVascularConditionName} required error={error?.familyHistory?.otherVascularConditionName} name='familyHistory.otherVascularConditionName' label={t('label.otherVascularConditionName')} onChange={handleTextChange} />
                                            <AlertBox  error={error?.familyHistory?.otherVascularConditionName} name={t('label.otherVascularConditionName')}/>
                                        </div>
                                    </Row>
                                }
                                {
                                    personalInformation.familyHistory.otherVascularCondition && 

                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <h5>If you have selected 'Other Vascular Condition', please state how long you have been living with this condition.</h5>
                                            <SearchInput searchOptions={yearsOption || []} value={personalInformation.familyHistory?.otherVascularConditionYears} required error={!!error?.familyHistory?.otherVascularConditionYears} name='familyHistory.otherVascularConditionYears' label={t('label.otherVascularConditionYears')} onSearch={handleSearchChange} />
                                            <AlertBox  error={error?.familyHistory?.otherVascularConditionYears} name={t('label.otherVascularConditionYears')}/>
                                        </div>
                                    </Row>
                                } 
                        </div>
                        <div className="divider">
                        </div>
                    </div>
                    <div style={{width: '80%', display: 'flex'}}> 
                        <div style={{ justifyContent: 'flex-end', float: 'right', width: '43%', alignSelf: 'flex-start', display: 'flex'}}>
                            {
                                pageVisibility > 0 && <button className="standard" onClick={prevPage}>Prev</button>
                            }  
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'flex-end'}}>
                            {
                                pageVisibility < (maxSize - 1 ) &&  <button className="standard" onClick={nextPage}>Next</button>
                            }
                                <button className="save" onClick={saveAndContinue}>Save and Continue</button>
                        </div>
                    </div>
                </PagePane> */}
                {personalInformation.patientID !== -1 && 
                <PagePane index={2}>
                    <div className="division">
                        <div className="header">   
                            <h2>Dietary Information</h2>
                        </div>
                        <div className="content">                        
                            <div className="divider--seventy">
                                 {/* {    (personalInformation.alcoholStatus.status == 'true' || personalInformation.alcoholStatus.status == 'Reformed Alcoholic') && */}
                                 <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SelectInput 
                                            name="dietaryIntake.alcoholFrequency"
                                            label={t('question.avgAlcoholConsumption')}
                                            required
                                            value={dietaryIntake?.alcoholFrequency}
                                            error={!!error?.alcoholFrequency}
                                            selectOptions={averageAlcoholConsumptionValues}
                                            onSelect={handleSelectChange}
                                        />
                                        <AlertBox error={error?.avgAlcoholConsumption} name={t('label.avgAlcoholConsumption')} />
                                    </div>
                                </Row>
                                {/* } */}
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SelectInput 
                                            name="dietaryIntake.meatFrequency"
                                            label={t('question.meatFrequency')}
                                            required
                                            subtitle="Ground beef, spare ribs, chicken wings, burgers, processed luncheon meats"
                                            value={dietaryIntake?.meatFrequency}
                                            error={!!error?.meatFrequency}
                                            selectOptions={meatFrequencyValues}
                                            onSelect={handleSelectChange}
                                        />
                                        <AlertBox error={error?.meatFrequency} name={t('label.meatFrequency')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SelectInput 
                                            name="dietaryIntake.dairyFrequency"
                                            label={t('question.dairyFrequency')}
                                            required
                                            subtitle="Cheese, Homogenized milk, Yogurt - high fat variety, Ice cream"
                                            value={dietaryIntake?.dairyFrequency}
                                            error={!!error?.dairyFrequency}
                                            selectOptions={dairyFrequencyValues}
                                            onSelect={handleSelectChange}
                                        />
                                        <AlertBox error={error?.dairyFrequency} name={t('label.dairyFrequency')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SelectInput 
                                            subtitle="Fried Rice, Pisang goreng, Fried Chicken"
                                            name="dietaryIntake.friedFoodFrequency"
                                            label={t('question.friedFoodFrequency')}
                                            required
                                            value={dietaryIntake?.friedFoodFrequency}
                                            error={!!error?.friedFoodFrequency}
                                            selectOptions={friedFoodFrequencyValues}
                                            onSelect={handleSelectChange}
                                        />
                                        <AlertBox error={error?.friedFoodFrequency} name={t('label.friedFoodFrequency')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SelectInput 
                                            name="dietaryIntake.eggFrequency"
                                            label={t('question.eggFrequency')}
                                            required
                                            value={dietaryIntake?.eggFrequency}
                                            error={!!error?.eggFrequency}
                                            selectOptions={eggFrequencyValues}
                                            onSelect={handleSelectChange}
                                        />
                                        <AlertBox error={error?.eggFrequency} name={t('label.eggFrequency')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: 'Yes'
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: 'No'
                                                }
                                            ]} 
                                                multiple = {false}
                                                defaultValue={dietaryIntake.meatOverFriedFood}
                                                required 
                                                error={error?.meatOverFriedFood} 
                                                name='dietaryIntake.meatOverFriedFood' 
                                                label={t('question.meatOverFriedFood')} 
                                                onSelect={handleSelectRadio}
                                        />
                                        <AlertBox error={error?.meatOverFriedFood} name={t('label.meatOverFriedFood')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: 'Yes'
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: 'No'
                                                }
                                            ]} 
                                                multiple = {false}
                                                defaultValue={dietaryIntake.vegetarian}
                                                required 
                                                error={error?.vegetarian} 
                                                name='dietaryIntake.vegetarian' 
                                                label={t('question.vegetarian')} 
                                                onSelect={handleSelectRadio}
                                        />
                                        <AlertBox error={error?.vegetarian} name={t('label.vegetarian')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SelectInput 
                                            name="dietaryIntake.milkTeaCoffeeLowfat"
                                            label={t('question.milkTeaCoffeeLowfat')}
                                            required
                                            subtitle="Milk alone or with tea, coffee; Low fat sour cream, Yogurt, Margarine"
                                            value={dietaryIntake?.milkTeaCoffeeLowfat}
                                            error={!!error?.milkTeaCoffeeLowfat}
                                            selectOptions={milkTeaCoffeeLowfatValues}
                                            onSelect={handleSelectChange}
                                        />
                                        <AlertBox error={error?.milkTeaCoffeeLowfat} name={t('label.milkTeaCoffeeLowfat')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SelectInput 
                                            name="dietaryIntake.dessertFrequency"
                                            label={t('question.dessertFrequency')}
                                            required
                                            subtitle="Pastries such as cakes, croissants,turnovers; Ice-cream; Donuts; Cookies; Muffins; Rich Desserts"
                                            value={dietaryIntake?.dessertFrequency}
                                            error={!!error?.dessertFrequency}
                                            selectOptions={dessertFrequencyValues}
                                            onSelect={handleSelectChange}
                                        />
                                        <AlertBox error={error?.dessertFrequency} name={t('label.dessertFrequency')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SelectInput 
                                            name="dietaryIntake.snacksFrequency"
                                            label={t('question.snacksFrequency')}
                                            subtitle="potato chips, Nachos, Any type of fried snack, cheese products, Chocolate bars."
                                            required
                                            value={dietaryIntake?.snacksFrequency}
                                            error={!!error?.snacksFrequency}
                                            selectOptions={snacksFrequencyValues}
                                            onSelect={handleSelectChange}
                                        />
                                        <AlertBox error={error?.snacksFrequency} name={t('label.snacksFoodFrequency')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SelectInput 
                                            name="dietaryIntake.sodaCandyFrequency"
                                            label={t('question.sodaCandyFrequency')}
                                            required
                                            subtitle="Regular soft drinks, Candies and Other sweet Stuff"
                                            value={dietaryIntake?.sodaCandyFrequency}
                                            error={!!error?.sodaCandyFrequency}
                                            selectOptions={sodaCandyFrequencyValues}
                                            onSelect={handleSelectChange}
                                        />
                                        <AlertBox error={error?.sodaCandyFrequency} name={t('label.sodaCandyFrequency')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SelectInput 
                                            name="dietaryIntake.vegetableIntake"
                                            label={t('question.vegetableIntake')}
                                            subtitle={"carrots, tomatoes, broccoli, cauliflower, peppers, spinach, collard greens , kale"}
                                            required
                                            value={dietaryIntake?.vegetableIntake}
                                            error={!!error?.vegetableIntake}
                                            selectOptions={vegetableIntakeValues}
                                            onSelect={handleSelectChange}
                                        />
                                        <AlertBox error={error?.vegetableIntake} name={t('label.vegetableIntake')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SelectInput 
                                            subtitle={`pasta, rice, beans, corn, barley, oatmeal`}
                                            name="dietaryIntake.grainBeansIntake"
                                            label={t('question.grainBeansIntake')}
                                            required
                                            value={dietaryIntake?.grainBeansIntake}
                                            error={!!error?.grainBeansIntake}
                                            selectOptions={grainBeansIntakeValues}
                                            onSelect={handleSelectChange}
                                        />
                                        <AlertBox error={error?.grainBeansIntake} name={t('label.grainBeansIntake')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SelectInput 
                                            name="dietaryIntake.fruitsIntake"
                                            label={t('question.fruitsIntake')}
                                            subtitle="1 serving = 1 whole fruit (apple, orange, peach)"
                                            required
                                            value={dietaryIntake?.fruitsIntake}
                                            error={!!error?.fruitsIntake}
                                            selectOptions={fruitsIntakeValues}
                                            onSelect={handleSelectChange}
                                        />
                                        <AlertBox error={error?.fruitsIntake} name={t('label.fruitsIntake')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SelectInput 
                                            name="dietaryIntake.processedFoodIntake"
                                            label={t('question.processedFood')}
                                            subtitle={"diet and regular drinks, potato chips, cheesies, ice creams, fruit ices, sorbets"}
                                            required
                                            value={dietaryIntake?.processedFoodIntake}
                                            error={!!error?.processedFoodIntake}
                                            selectOptions={processedFoodIntakeValues}
                                            onSelect={handleSelectChange}
                                        />
                                        <AlertBox error={error?.processedFoodIntake} name={t('label.processedFoodIntake')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: 'Yes'
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: 'No'
                                                }
                                            ]} 
                                                multiple = {false}
                                                defaultValue={dietaryIntake.fiveFruitFrequencyIntake}
                                                required 
                                                error={error?.fiveFruitFrequencyIntake} 
                                                name='dietaryIntake.fiveFruitFrequencyIntake' 
                                                label={t('question.fiveFruitFrequencyIntake')} 
                                                onSelect={handleSelectRadio}
                                        />
                                        <AlertBox error={error?.fiveFruitFrequencyIntake} name={t('label.fiveFruitFrequencyIntake')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: 'Yes'
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: 'No'
                                                }
                                            ]} 
                                                multiple = {false}
                                                defaultValue={dietaryIntake.fourCitrusFrequencyIntake}
                                                required 
                                                error={error?.fourCitrusFrequencyIntake} 
                                                name='dietaryIntake.fourCitrusFrequencyIntake' 
                                                label={t('question.fourCitrusFrequencyIntake')} 
                                                onSelect={handleSelectRadio}
                                        />
                                        <AlertBox error={error?.fourCitrusFrequencyIntake} name={t('label.fourCitrusFrequencyIntake')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: 'Yes'
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: 'No'
                                                }
                                            ]} 
                                                multiple = {false}
                                                defaultValue={dietaryIntake.lessFiveOrangeYellowFruitVegeFrequencyIntake}
                                                required 
                                                subtitle={"(1 whole carrot, 8 large apricots halves, Half cup of musk melon, 1 baked sweet potato, 1 whole pear, 8 large rambutans, 8 large mangos teens, 2 jambu merah)"}
                                                error={error?.lessFiveOrangeYellowFruitVegeFrequencyIntake} 
                                                name='dietaryIntake.lessFiveOrangeYellowFruitVegeFrequencyIntake' 
                                                label={t('question.lessFiveOrangeYellowFruitVegeFrequencyIntake')} 
                                                onSelect={handleSelectRadio}
                                        />
                                        <AlertBox error={error?.lessFiveOrangeYellowFruitVegeFrequencyIntake} name={t('label.lessFiveOrangeYellowFruitVegeFrequencyIntake')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: 'Yes'
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: 'No'
                                                }
                                            ]} 
                                                multiple = {false}
                                                defaultValue={dietaryIntake.cruciferousVegetablesFrequencyIntake}
                                                required 
                                                error={error?.cruciferousVegetablesFrequencyIntake} 
                                                name='dietaryIntake.cruciferousVegetablesFrequencyIntake' 
                                                label={t('question.cruciferousVegetablesFrequencyIntake')} 
                                                onSelect={handleSelectRadio}
                                        />
                                        <AlertBox error={error?.cruciferousVegetablesFrequencyIntake} name={t('label.cruciferousVegetablesFrequencyIntake')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: 'Yes'
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: 'No'
                                                }
                                            ]} 
                                                multiple = {false}
                                                defaultValue={dietaryIntake.smokedMeatFishFrequencyIntake}
                                                required 
                                                error={error?.smokedMeatFishFrequencyIntake} 
                                                name='dietaryIntake.smokedMeatFishFrequencyIntake' 
                                                label={t('question.smokedMeatFishFrequencyIntake')} 
                                                onSelect={handleSelectRadio}
                                        />
                                        <AlertBox error={error?.smokedMeatFishFrequencyIntake} name={t('label.smokedMeatFishFrequencyIntake')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: 'Yes'
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: 'No'
                                                }
                                            ]} 
                                                multiple = {false}
                                                subtitle={"Luncheon meats, processed meats (Example: ayamas), sausages or any other processed meat"}
                                                defaultValue={dietaryIntake.nitrateSaltMeatFrequencyIntake}
                                                required 
                                                error={error?.nitrateSaltMeatFrequencyIntake} 
                                                name='dietaryIntake.nitrateSaltMeatFrequencyIntake' 
                                                label={t('question.nitrateSaltMeatFrequencyIntake')} 
                                                onSelect={handleSelectRadio}
                                        />
                                        <AlertBox error={error?.nitrateSaltMeatFrequencyIntake} name={t('label.nitrateSaltMeatFrequencyIntake')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: 'Yes'
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: 'No'
                                                }
                                            ]} 
                                                multiple = {false}
                                                defaultValue={dietaryIntake.bbqIntake}
                                                required 
                                                error={error?.bbqIntake} 
                                                name='dietaryIntake.bbqIntake' 
                                                label={t('question.bbqIntake')} 
                                                onSelect={handleSelectRadio}
                                        />
                                        <AlertBox error={error?.bbqIntake} name={t('label.bbqIntake')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: 'Yes'
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: 'No'
                                                }
                                            ]} 
                                                multiple = {false}
                                                defaultValue={dietaryIntake.moreThreeCoffeeFrequencyIntake}
                                                required 
                                                error={error?.moreThreeCoffeeFrequencyIntake} 
                                                name='dietaryIntake.moreThreeCoffeeFrequencyIntake' 
                                                label={t('question.moreThreeCoffeeFrequencyIntake')} 
                                                onSelect={handleSelectRadio}
                                        />
                                        <AlertBox error={error?.moreThreeCoffeeFrequencyIntake} name={t('label.moreThreeCoffeeFrequencyIntake')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: 'Yes'
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: 'No'
                                                }
                                            ]} 
                                                multiple = {false}
                                                defaultValue={dietaryIntake.lessThanTwoDairyServingsDailyIntake}
                                                required 
                                                error={error?.lessThanTwoDairyServingsDailyIntake} 
                                                name='dietaryIntake.lessThanTwoDairyServingsDailyIntake' 
                                                label={t('question.lessThanTwoDairyServingsDailyIntake')} 
                                                onSelect={handleSelectRadio}
                                        />
                                        <AlertBox error={error?.lessThanTwoDairyServingsDailyIntake} name={t('label.lessThanTwoDairyServingsDailyIntake')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: 'Yes'
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: 'No'
                                                }
                                            ]} 
                                                subtitle={"Nasi Lemak, Mee Goreng Mamak, Roti Canai, Ayam Percik"}
                                                multiple = {false}
                                                defaultValue={dietaryIntake.lessThanThreeTimesNLMGMRCAYWeeklyIntake}
                                                required 
                                                error={error?.lessThanThreeTimesNLMGMRCAYWeeklyIntake} 
                                                name='dietaryIntake.lessThanThreeTimesNLMGMRCAYWeeklyIntake' 
                                                label={t('question.lessThanThreeTimesNLMGMRCAYWeeklyIntake')} 
                                                onSelect={handleSelectRadio}
                                        />
                                        <AlertBox error={error?.lessThanThreeTimesNLMGMRCAYWeeklyIntake} name={t('label.lessThanThreeTimesNLMGMRCAYWeeklyIntake')} />
                                    </div>
                                </Row>
                            {/*{ 
                                personalInformation.smokingStatus.status=='Ex-Smoker' && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={lastHundredYears || []} value={personalInformation?.smokingStatus?.lastSmoked} required error={!!error?.smokingStatus?.lastSmoked} name='smokingStatus.lastSmoked' label={t('question.lastSmoked')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.smokingStatus?.lastSmoked} name={t('label.lastSmoked')} />
                                    </div>
                                </Row>
                            }
                            { 
                                (personalInformation.smokingStatus.status=='Ex-Smoker'|| personalInformation.smokingStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={personalInformation?.smokingStatus?.startedSmokingAge} required error={!!error?.startedSmokingAge} name='smokingStatus.startedSmokingAge' label={t('question.startedSmokingAge')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.smokingStatus?.startedSmokingAge} name={t('label.startedSmokingAge')} />
                                    </div>
                                </Row>
                            }
                            
                            { 
                                (personalInformation.smokingStatus.status=='Ex-Smoker'|| personalInformation.smokingStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={personalInformation?.smokingStatus?.yearsSmoked} required error={!!error?.smokingStatus?.yearsSmoked} name='smokingStatus.yearsSmoked' label={t('question.yearsSmoked')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.smokingStatus?.yearsSmoked} name={t('label.yearsSmoked')} />
                                    </div>
                                </Row>
                            }
                            {
                                (personalInformation.smokingStatus.status == 'true' || personalInformation.smokingStatus.status == 'Ex-Smoker') &&
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <Checkbox
                                            input={personalInformation.smokingStatus.causeOfSmoking}
                                            name="smokingStatus.causeOfSmoking" 
                                            label={t('question.causeOfSmoking')}
                                            error={!!error?.smokingStatus?.causeOfSmoking}
                                            values={
                                                [
                                                    {
                                                        name:'stress',
                                                        value: 'stress',
                                                        label: t('label.stress')
                                                    },
                                                    {
                                                        name:'friendsFamily',
                                                        value: 'friends/family',
                                                        label: t('label.friendsFamily')
                                                    },
                                                    {
                                                        name:'social',
                                                        value: 'social',
                                                        label: t('label.social')
                                                    },
                                                ]
                                            }
                                            required
                                            onCheck={handleChecked}
                                        />
                                        <AlertBox error={error?.smokingStatus?.causeOfSmoking} name={t('label.causeOfSmoking')}/>
                                    </div>
                                </Row>
                            }
                            <Row>
                                <div style={{width: 'inherit'}}>
                                    <RadioInput 
                                        multiple={false}
                                        values={[
                                            {
                                                name: 'cigarettes',
                                                label: t('option.cigarettes'),
                                                value: "Cigarettes"
                                            },
                                            {
                                                name: 'eCigarettes',
                                                label: t('option.eCigarettes'),
                                                value: "E-Cigarettes"
                                            },
                                            {
                                                name: 'no',
                                                label: t('option.no'),
                                                value: false
                                            },
                                            {
                                                name: 'exSmoker',
                                                label: t('option.exSmoker'),
                                                value: 'Ex-Smoker'
                                            }
                                        ]} 
                                        defaultValue={personalInformation.familyHasSmoker}
                                        required 
                                        error={error?.familyHasSmoker} 
                                        name='familyHasSmoker' 
                                        label={t('question.familyHasSmoker')} 
                                        onSelect={handleSelectRadio} 
                                    />
                                    <AlertBox error={error?.familyHasSmoker} name={t('label.familyHasSmoker')} />
                                </div>
                                
                            </Row>
                            <Row>
                                <div style={{width: 'inherit'}}>
                                    <RadioInput 
                                        multiple={false}
                                        values={[
                                            {
                                                name: 'yes',
                                                label: t('option.yes'),
                                                value: 'true'
                                            },
                                            {
                                                name: 'no',
                                                label: t('option.no'),
                                                value: 'false'
                                            },
                                            {
                                                name: 'exSmoker',
                                                label: t('option.exSmoker'),
                                                value: 'Ex-Smoker'
                                            }
                                        ]} 
                                        defaultValue={personalInformation.eCigaretteStatus.status}
                                        required 
                                        error={error?.eCigaretteStatus?.status} 
                                        name='eCigaretteStatus.status' 
                                        label={t('question.smokingStatus', {smoking: 'e-cigarettes'})} 
                                        onSelect={handleSelectRadio} 
                                    />
                                    <AlertBox error={error?.eCigaretteStatus?.status} name={t('label.eCigaretteStatus')} />
                                </div>
                                
                            </Row> */}
                            {/* {   personalInformation.eCigaretteStatus.status != 'false' &&
                                <Row>
                                <div style={{width: 'inherit'}}>
                                    <SelectInput 
                                        name="eCigaretteStatus.nicotineAmt"
                                        label={t('question.nicotineAmt')}
                                        required
                                        value={personalInformation.eCigaretteStatus.nicotineAmt}
                                        error={!!error?.eCigaretteStatus?.nicotineAmt}
                                        selectOptions={nicotineAmtValues}
                                        onSelect={handleSelectChange}
                                    />
                                    <AlertBox error={error?.eCigaretteStatus?.nicotineAmt} name={t('label.eCigaretteStatus.nicotineAmt')} />
                                </div>
                                </Row>
                            } */}
                            {/* { 
                                (personalInformation.smokingStatus.status=='Ex-Smoker'|| personalInformation.smokingStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={personalInformation?.smokingStatus.startedSmokingAge} required error={!!error?.startedSmokingAge} name='startedSmokingAge' label={t('question.startedSmokingAge')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.smokingStatus?.startedSmokingAge} name={t('label.yearsSmoked')} />
                                    </div>
                                </Row>
                            }
                            
                            { 
                                personalInformation.eCigaretteStatus.status=='Ex-Smoker' && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={lastHundredYears || []} value={personalInformation?.eCigaretteStatus?.lastSmoked} required error={!!error?.eCigaretteStatus?.lastSmoked} name='eCigaretteStatus.lastSmoked' label={t('question.lastSmoked')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.eCigaretteStatus?.lastSmoked} name={t('label.lastSmoked')} />
                                    </div>
                                </Row>
                            }
                            { 
                                (personalInformation.eCigaretteStatus.status=='Ex-Smoker'|| personalInformation.eCigaretteStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={personalInformation.eCigaretteStatus?.yearsSmoked} required error={!!error?.eCigaretteStatus?.yearsSmoked} name='eCigaretteStatus.yearsSmoked' label={t('question.yearsSmoked')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.eCigaretteStatus?.yearsSmoked} name={t('label.yearsSmoked')} />
                                    </div>
                                </Row>
                            }
                            {
                                (personalInformation.eCigaretteStatus.status == 'true' || personalInformation.eCigaretteStatus.status == 'Ex-Smoker') &&
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <Checkbox
                                            input={personalInformation.eCigaretteStatus.causeOfSmoking}
                                            name="eCigaretteStatus.causeOfSmoking" 
                                            label={t('question.causeOfSmoking')}
                                            error={!!error?.eCigaretteStatus?.causeOfSmoking}
                                            values={
                                                [
                                                    {
                                                        name:'stress',
                                                        value: 'stress',
                                                        label: t('label.stress')
                                                    },
                                                    {
                                                        name:'friendsFamily',
                                                        value: 'friends/family',
                                                        label: t('label.friendsFamily')
                                                    },
                                                    {
                                                        name:'social',
                                                        value: 'social',
                                                        label: t('label.social')
                                                    },
                                                ]
                                            }
                                            required
                                            onCheck={handleChecked}
                                        />
                                        <AlertBox error={error?.eCigaretteStatus?.causeOfSmoking} name={t('label.causeOfSmoking')}/>
                                    </div>
                                </Row>
                            } */}
                            
                            {/* <Row>
                                   
                                        <RadioInput 
                                            multiple={false}
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: 'true'
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: 'false'
                                                },
                                                {
                                                    name: 'reformedAlcoholic',
                                                    label: t('option.reformedAlcoholic'),
                                                    value: 'Reformed Alcoholic'
                                                }
                                            ]} 
                                            defaultValue={lifestyleInformation.alcoholStatus}
                                            required 
                                            error={error?.alcoholStatus?.status} 
                                            name='alcoholStatus.status' 
                                            label={t('question.alcoholStatus')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.alcoholStatus?.status} name={t('label.alcoholStatus')} />
                                    
                                   
                                    
                                </Row> */}
                                {/* {   (personalInformation.alcoholStatus.status == 'true' || personalInformation.alcoholStatus.status == 'Reformed Alcoholic') &&
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <SelectInput 
                                                name="alcoholStatus.alcoholType"
                                                label={t('label.alcoholType')}
                                                required
                                                value={personalInformation?.alcoholStatus?.alcoholType}
                                                error={!!error?.alcoholStatus?.alcoholType}
                                                selectOptions={alcoholTypeValues}
                                                onSelect={handleSelectChange}
                                            />
                                            <AlertBox error={error?.alcoholStatus?.alcoholType} name={t('label.alcoholType')} />
                                        </div>
                                    </Row>
                                } */}
                                
                                 {/* { 
                                personalInformation.alcoholStatus.status=='Reformed Alcoholic' && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={lastHundredYears || []} value={personalInformation?.alcoholStatus?.lastDrank} required error={!!error?.alcoholStatus?.lastDrank} name='alcoholStatus.lastDrank' label={t('question.lastDrank')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.alcoholStatus?.lastDrank} name={t('label.lastDrank')} />
                                    </div>
                                </Row>
                            } */}
                            {/* { 
                                (personalInformation.alcoholStatus.status=='Reformed Alcoholic'|| personalInformation.alcoholStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={personalInformation?.alcoholStatus?.startedDrinkingAge} required error={!!error?.startedDrinkingAge} name='alcoholStatus.startedDrinkingAge' label={t('question.startedDrinkingAge')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.alcoholStatus?.startedDrinkingAge} name={t('label.startedDrinkingAge')} />
                                    </div>
                                </Row>
                            } */}
                            
                            {/* { 
                                (personalInformation.alcoholStatus.status=='Reformed Alcoholic'|| personalInformation.alcoholStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={personalInformation?.alcoholStatus?.yearsConsumed} required error={!!error?.alcoholStatus?.yearsConsumed} name='alcoholStatus.yearsConsumed' label={t('question.yearsConsumed')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.alcoholStatus?.yearsConsumed} name={t('label.yearsConsumed')} />
                                    </div>
                                </Row>
                            } */}
                            {/* {
                                (personalInformation.alcoholStatus.status=='Reformed Alcoholic' || personalInformation.alcoholStatus.status == 'Ex-Smoker') &&
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <Checkbox
                                            input={personalInformation.alcoholStatus.causeOfDrinking}
                                            name="alcoholStatus.causeOfDrinking" 
                                            label={t('question.causeOfDrinking')}
                                            error={!!error?.alcoholStatus?.causeOfDrinking}
                                            values={
                                                [
                                                    {
                                                        name:'stress',
                                                        value: 'stress',
                                                        label: t('label.stress')
                                                    },
                                                    {
                                                        name:'friendsFamily',
                                                        value: 'friends/family',
                                                        label: t('label.friendsFamily')
                                                    },
                                                    {
                                                        name:'social',
                                                        value: 'social',
                                                        label: t('label.social')
                                                    },
                                                ]
                                            }
                                            required
                                            onCheck={handleChecked}
                                        />
                                        <AlertBox error={error?.alcoholStatus?.causeOfDrinking} name={t('label.causeOfDrinking')}/>
                                    </div>
                                </Row>
                            } */}
                        </div>
                    </div>                        
                    </div>
                                {/*<Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            multiple={false}
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: true
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: false
                                                },
                                            ]} 
                                            defaultValue={personalInformation?.lifestyleInformation?.eightHoursOfSleep}
                                            required 
                                            error={!!error?.lifestyleInformation?.eightHoursOfSleep} 
                                            name='lifestyleInformation.eightHoursOfSleep' 
                                            label={t('question.eightHoursOfSleep')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.lifestyleInformation?.eightHoursOfSleep} name={t('label.eightHoursOfSleep')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            multiple={false}
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: true
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: false
                                                },
                                            ]} 
                                            defaultValue={personalInformation?.lifestyleInformation?.stress || false}
                                            required 
                                            error={!!error?.lifestyleInformation?.stress} 
                                            name='lifestyleInformation.stress' 
                                            label={t('question.stress')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.lifestyleInformation?.stress} name={t('label.stress')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            multiple={false}
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: true
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: false
                                                },
                                            ]} 
                                            defaultValue={personalInformation?.lifestyleInformation?.exercise || false}
                                            required 
                                            error={!!error?.lifestyleInformation?.exercise} 
                                            name='lifestyleInformation.exercise' 
                                            label={t('question.exercise')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.lifestyleInformation?.exercise} name={t('label.exercise')} />
                                    </div>
                                </Row>
                                 <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            multiple={false}
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: true
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: false
                                                },
                                            ]} 
                                            defaultValue={personalInformation?.lifestyleInformation?.smoking || false}
                                            required 
                                            error={!!error?.lifestyleInformation?.smoking} 
                                            name='lifestyleInformation.smoking' 
                                            label={t('question.smoking')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.lifestyleInformation?.smoking} name={t('label.smoking')} />
                                    </div>
                                </Row> *
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            multiple={false}
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: true
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: false
                                                },
                                            ]} 
                                            defaultValue={personalInformation?.lifestyleInformation?.friedFood || false}
                                            required 
                                            error={!!error?.lifestyleInformation?.friedFood} 
                                            name='lifestyleInformation.friedFood' 
                                            label={t('question.friedFood')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.lifestyleInformation?.friedFood} name={t('label.friedFood')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            multiple={false}
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: true
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: false
                                                },
                                            ]} 
                                            defaultValue={personalInformation?.lifestyleInformation?.meat || false}
                                            required 
                                            error={!!error?.lifestyleInformation?.meat} 
                                            name='lifestyleInformation.meat' 
                                            label={t('question.meat')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.lifestyleInformation?.meat} name={t('label.meat')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            multiple={false}
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: true
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: false
                                                },
                                            ]} 
                                            defaultValue={personalInformation?.lifestyleInformation?.processedFood || false}
                                            required 
                                            error={!!error?.lifestyleInformation?.processedFood} 
                                            name='lifestyleInformation.processedFood' 
                                            label={t('question.processedFood')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.lifestyleInformation?.processedFood} name={t('label.processedFood')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            multiple={false}
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: true
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: false
                                                },
                                            ]} 
                                            defaultValue={personalInformation?.lifestyleInformation?.vegetables || false}
                                            required 
                                            error={!!error?.lifestyleInformation?.vegetables} 
                                            name='lifestyleInformation.vegetables' 
                                            label={t('question.vegetables')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.lifestyleInformation?.vegetables} name={t('label.vegetables')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <RadioInput 
                                            multiple={false}
                                            values={[
                                                {
                                                    name: 'yes',
                                                    label: t('option.yes'),
                                                    value: true
                                                },
                                                {
                                                    name: 'no',
                                                    label: t('option.no'),
                                                    value: false
                                                },
                                            ]} 
                                            defaultValue={personalInformation?.lifestyleInformation?.fruits || false}
                                            required 
                                            error={!!error?.lifestyleInformation?.fruits} 
                                            name='lifestyleInformation.fruits' 
                                            label={t('question.fruits')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.lifestyleInformation?.fruits} name={t('label.fruits')} />
                                    </div>
                                </Row> */}
                            
                    
                    <div style={{width: '100%', display: 'flex'}}> 
                        <div style={{ justifyContent: 'flex-start', float: 'right', width: '100%', alignSelf: 'flex-start', display: 'flex'}}>
                            {
                                pageVisibility > 0 && <button className="standard" onClick={prevPage}>Prev</button>
                            }
                            
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end'}}>
                            {
                                pageVisibility < (maxSize-1) &&  <button className="standard" onClick={nextPage}>Next</button>
                            }
                            {/* <button className="save" onClick={saveAndContinue}>Save and Continue</button> */}
                        </div>
                    </div>
                </PagePane> }
                {
                    personalInformation.patientID !== -1 && 
                    <PagePane index={3}>
                        <div className="division">
                            <div className="header">   
                                <h2>Lifestyle Information</h2>
                            </div>
                            <div className="content">
                                <div className="divider--full">
                                    {/* <Row>
                                        <div style={{width: 'inherit'}}>
                                            <RadioInput 
                                                multiple={false}
                                                values={[
                                                    {
                                                        name: 'yes',
                                                        label: t('option.yes'),
                                                        value: 'true'
                                                    },
                                                    {
                                                        name: 'no',
                                                        label: t('option.no'),
                                                        value: 'false'
                                                    },
                                                    {
                                                        name: 'exSmoker',
                                                        label: t('option.exSmoker'),
                                                        value: 'Ex-Smoker'
                                                    }
                                                ]} 
                                                defaultValue={personalInformation.smokingStatus.status}
                                                required 
                                                error={!!error?.smokingStatus?.status} 
                                                name='smokingStatus.status' 
                                                label={t('question.smokingStatus', {smoking: 'cigarettes'})} 
                                                onSelect={handleSelectRadio} 
                                            />
                                            <AlertBox error={error?.smokingStatus?.status} name={t('label.smokingStatus')} />
                                        </div>
                                    
                                    </Row> */}
                                    {/* {   personalInformation.smokingStatus.status != 'false' && */}
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <SelectInput 
                                                name="lifestyleInformation.occupation"
                                                label={t('question.occupation')}
                                                required
                                                value={lifestyleInformation?.occupation}
                                                error={!!error?.occupation}
                                                selectOptions={occupationValues}
                                                onSelect={handleSelectChange}
                                            />
                                            <AlertBox error={error?.occupation} name={t('label.occupation')} />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <SelectInput 
                                                name="lifestyleInformation.smokingFrequency"
                                                label={t('label.cigarettesPerDay')}
                                                required
                                                value={lifestyleInformation?.smokingFrequency}
                                                error={!!error?.smokingFrequency}
                                                selectOptions={cigarettesPerDayValues}
                                                onSelect={handleSelectChange}
                                            />
                                            <AlertBox error={error?.smokingFrequency} name={t('label.educationLevel')} />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <SelectInput 
                                                name="lifestyleInformation.durationOfSleep"
                                                label={t('question.durationOfSleep')}
                                                required
                                                value={lifestyleInformation?.durationOfSleep}
                                                error={!!error?.durationOfSleep}
                                                selectOptions={durationOfSleepValues}
                                                onSelect={handleSelectChange}
                                            />
                                            <AlertBox error={error?.durationOfSleep} name={t('label.durationOfSleep')} />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <RadioInput 
                                                multiple={false}
                                                values={[
                                                    {
                                                        name: 'yes',
                                                        label: t('option.yes'),
                                                        value: 'Yes'
                                                    },
                                                    {
                                                        name: 'no',
                                                        label: t('option.no'),
                                                        value: 'No'
                                                    }
                                                ]} 
                                                defaultValue={lifestyleInformation?.ergonomicWorkspace}
                                                required
                                                error={!!error?.ergonomicWorkspace} 
                                                name='lifestyleInformation.ergonomicWorkspace' 
                                                label={t('question.ergonomicWorkspace')} 
                                                onSelect={handleSelectRadio} 
                                            />
                                            <AlertBox error={error?.ergonomicWorkspace} name={t('label.ergonomicWorkspace')} />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <SelectInput 
                                                name="lifestyleInformation.computerHours"
                                                label={t('question.computerHours')}
                                                required
                                                value={lifestyleInformation?.computerHours}
                                                error={!!error?.computerHours}
                                                selectOptions={computerHoursValues}
                                                onSelect={handleSelectChange}
                                            />
                                            <AlertBox error={error?.computerHours} name={t('label.computerHours')} />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <SelectInput 
                                                name="lifestyleInformation.seatedHours"
                                                label={t('question.seatedHours')}
                                                required
                                                value={lifestyleInformation?.seatedHours}
                                                error={!!error?.seatedHours}
                                                selectOptions={seatedHoursValues}
                                                onSelect={handleSelectChange}
                                            />
                                            <AlertBox error={error?.seatedHours} name={t('label.seatedHours')} />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <SearchInput subtitle={"(1 = not active, 10 = very active)"} searchOptions={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]} value={lifestyleInformation?.activeScale} required error={!!error?.activeScale} name='lifestyleInformation.activeScale' label={t('question.activeScale')} onSearch={handleSearchChange} />
                                            <AlertBox error={error?.activeScale} name={t('label.activeScale')} />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <RadioInput 
                                                multiple={false}
                                                values={[
                                                    {
                                                        name: 'yes',
                                                        label: t('option.yes'),
                                                        value: 'Yes'
                                                    },
                                                    {
                                                        name: 'no',
                                                        label: t('option.no'),
                                                        value: 'No'
                                                    }
                                                ]} 
                                                defaultValue={lifestyleInformation?.stress}
                                                required
                                                error={!!error?.stress} 
                                                name='lifestyleInformation.stress' 
                                                label={t('question.stress')} 
                                                onSelect={handleSelectRadio} 
                                            />
                                            <AlertBox error={error?.stress} name={t('label.stress')} />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <RadioInput 
                                                multiple={false}
                                                values={[
                                                    {
                                                        name: 'yes',
                                                        label: t('option.yes'),
                                                        value: 'Yes'
                                                    },
                                                    {
                                                        name: 'no',
                                                        label: t('option.no'),
                                                        value: 'No'
                                                    }
                                                ]} 
                                                defaultValue={lifestyleInformation?.exerciseProgramme}
                                                required
                                                error={!!error?.exerciseProgramme} 
                                                name='lifestyleInformation.exerciseProgramme' 
                                                label={t('question.exerciseProgramme')} 
                                                onSelect={handleSelectRadio} 
                                            />
                                            <AlertBox error={error?.exerciseProgramme} name={t('label.exerciseProgramme')} />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <RadioInput 
                                                multiple={false}
                                                values={[
                                                    {
                                                        name: 'yes',
                                                        label: t('option.yes'),
                                                        value: 'Yes'
                                                    },
                                                    {
                                                        name: 'no',
                                                        label: t('option.no'),
                                                        value: 'No'
                                                    }
                                                ]} 
                                                defaultValue={lifestyleInformation?.personalTrainer}
                                                required
                                                error={!!error?.personalTrainer} 
                                                name='lifestyleInformation.personalTrainer' 
                                                label={t('question.personalTrainer')} 
                                                onSelect={handleSelectRadio} 
                                            />
                                            <AlertBox error={error?.personalTrainer} name={t('label.exerciseProgramme')} />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <RadioInput 
                                                multiple={false}
                                                values={[
                                                    {
                                                        name: 'yes',
                                                        label: t('option.yes'),
                                                        value: 'Yes'
                                                    },
                                                    {
                                                        name: 'no',
                                                        label: t('option.no'),
                                                        value: 'No'
                                                    }
                                                ]} 
                                                defaultValue={lifestyleInformation?.diet}
                                                required
                                                error={!!error?.dietaryPlan} 
                                                name='lifestyleInformation.dietaryPlan' 
                                                label={t('question.dietaryPlan')} 
                                                onSelect={handleSelectRadio} 
                                            />
                                            <AlertBox error={error?.dietaryPlan} name={t('label.dietaryPlan')} />
                                        </div>
                                    </Row>
                                    {/* } */}
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', display: 'flex'}}> 
                        <div style={{ justifyContent: 'flex-start', float: 'right', width: '100%', alignSelf: 'flex-start', display: 'flex'}}>
                            {
                                pageVisibility > 0 && <button className="standard" onClick={prevPage}>Prev</button>
                            }
                            
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end'}}>
                            {/* {
                                pageVisibility < (maxSize-1) &&  <button className="standard" onClick={nextPage}>Next</button>
                            } */}
                            <button className="save" onClick={submitObesityPredictionData}>Generate Prediction Report</button>
                        </div>
                    </div>
                    </PagePane>
                }
                {
                personalInformation.patientID !== -1 &&
                <PagePane index={4}>
                    <div className="division">
                        <div className="header">   
                            <h2>Diagnosis & Comments</h2>
                            <button className="standard" onClick={()=> {toggleCommentModalVisibility(true)}}>New Comment</button>
                           

                        </div>
                        <div className="content" style={{flexDirection:'row'}}>                   
                            <div className="divider--fifty">
                               
                                {/* <h3>{`${t('label.diagnosis')} & ${t('label.comments')}`}</h3> */}
                                {
                                    clinicComments !=[] && clinicComments.map((comment: any, index: any)=> {
                                        return <>
                                                <Row key={index}>
                                                    <div style={{width: 'inherit'}}>
                                                        <h3>{comment?.created? new Date(comment?.created).toLocaleDateString([], 
                                                                {year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'}
                                                            ): ''}
                                                        </h3>
                                                        <TextInput disabled key={comment?.id} value={comment?.diagnosis} required error={!!error[`comment[${index}]`]?.diagnosis} name={`comment[${index}].diagnosis`} label={`${t('label.diagnosis')}` + (comment?.created!=undefined? `       Date: ${comment?.created}`: '')} onChange={handleCommentChange} />      
                                                        <AlertBox error={error[`comment[${index}]`]?.diagnosis} name={t('label.diagnosis')} />
                                                    </div>
                                                
                                                
                                                
                                                </Row>

                                                <Row>
                                                    <div style={{width: 'inherit'}}>
                                                        <TextArea  disabled key={comment?.id} value={comment?.comment} required error={!!error[`comment[${index}]`]?.comment} name={`comment[${index}].comment`} label={t('label.comment')} onChange={handleCommentChange} />
                                                        <AlertBox error={error[`comment[${index}]`]?.comment} name={t('label.comment')} />
                                                    </div>
                                                </Row>
                                                <Row>
                                                    {/* <button className="delete" id={index} onClick={(index) => {removeComment(index)}}>Remove Comment</button> */}
                                                    <button id={index} className="save" onClick={(e) => {editComment(e)}}><img style={{width: '20px', height: '20px'}} src="/assets/images/edit.png" /></button>
                                                </Row>
                                        </>
                                    })
                                }
                                
                            </div>
                            <div className="divider--fifty">
                                {
                                    clinicComments !=[] && clinicComments.map((comment: any, index: any)=> {
                                         return <Row style={{height: '350px'}}>
                                                <ImageUpload disabled onChangeImg={handleImageChange} comment name={`comment[${index}].image`} blob={comment?.image}/>
                                        </Row>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <Row>
                        <div style={{width: '100%', display: 'flex'}}> 
                            <div style={{ justifyContent: 'flex-start', float: 'right', width: '100%', alignSelf: 'flex-start', display: 'flex'}}>
                                {/* {
                                    pageVisibility > 0 && <button className="standard" onClick={prevPage}>Prev</button>
                                } */}
                                
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end'}}>
                                {/* {
                                    pageVisibility < (maxSize-1) &&  <button className="standard" onClick={nextPage}>Next</button>
                                } */}
                                <button className="save" onClick={saveAndContinue}>Save and Continue</button>
                            </div>
                        </div>
                    </Row>
                    
                </PagePane>
                }
            </Page>
            
            
        </div>
    )
}

export default PatientInformation;