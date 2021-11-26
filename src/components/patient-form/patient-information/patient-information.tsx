import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { styles } from 'Components/shared/animation';
import { useTranslation } from 'react-i18next';
import { encode } from 'Helpers/';
import { CommentType, commentAtom} from 'Recoil/patient.atom';
import './patient-information.scss';
import { sleepHoursValuesFunction, seatedHoursValuesFunction, computerHoursValuesFunction, sodaCandyFrequencyValuesFunction, occupationValuesFunction, processedFoodIntakeValuesFunction, fruitsIntakeValuesFunction, grainBeansIntakeValuesFunction, vegetableIntakeValuesFunction, snacksFrequencyValuesFunction, dessertFrequencyValuesFunction, milkTeaCoffeeLowfatValuesFunction, eggFrequencyValuesFunction, friedFoodFrequencyValuesFunction, dairyFrequencyValuesFunction, meatFrequencyValuesFunction, healthHistoryValuesFunction, cigarettesPerDayValuesFunction, BMIStatus, heightFunction, weightFunction, averageAlcoholConsumptionValuesFunction } from 'Data/patientInformationValues';
import { Page, Row, Col, ImageUpload, Modal } from 'Components/shared';
import errorHandler from 'Utils/error-handler';
import _, { omitBy, isEmpty, isUndefined } from 'lodash';
import PagePane from 'Components/shared/page/page-pane'
import { TextInput, AlertBox, RadioInput, SelectInput, TextArea, DateInput, SearchInput } from 'Components/shared';
import { PersonalInformationFormValidation } from './personal-information.validation';
import { ObesityPredictionValidation } from './obesity-prediction.validation';
import { CommentsValidation } from './comments.validation';

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
        profilePicBlob: '',
        ic: '',
        gender: "",
        race: '',
        dateOfBirth: ''   
    };

    const defaultHealthAndFamilyHistory = {
        weight: -1,
        height: -1,
        BMI: 19,
     
        familyHistory: { 
            heartAttack: '',
            highCholesterol: '',
            heartOperation: true,
            congenitalHeartDisease: '',
            noCondition: '', //if this is true, then healthHistory is false
           
        },
    }

    const defaultDietaryIntakeInformation = {
        alcoholFrequency: "1-2 drinks per day",
        meatFrequency: "1-2 times per week",
        dairyFrequency: "Once per week",
        friedFoodFrequency: "0-1 times per week",
        eggFrequency: "0-1 eggs per week",
        meatOverFriedFood: "No",
        vegetarian: "No",
        milkTeaCoffeeLowfat: "0-1 time per week", 
        dessertFrequency: "0-1 times per week",
        snacksFrequency: "0-1 time per week",
        sodaCandyFrequency: "0-1 times per week",
        vegetableIntake: "0 servings per day",
        grainBeansIntake: "0 servings per day",
        fruitsIntake: "0 servings per day",
        processedFoodIntake: "Once per week or less",
        fiveFruitFrequencyIntake: "No",
        fourCitrusFrequencyIntake: "No",
        lessFiveOrangeYellowFruitVegeFrequencyIntake: "No",
        cruciferousVegetablesFrequencyIntake:"No",
        smokedMeatFishFrequencyIntake: "No",
        nitrateSaltMeatFrequencyIntake: "No",
        bbqIntake: "No",
        moreThreeCoffeeFrequencyIntake: "No",
        lessThanTwoDairyServingsDailyIntake: "No",
        lessThanThreeTimesNLMGMRCAYWeeklyIntake: "No" 
    }

    const defaultLifestyleInformation = {
        occupation: 4,
        smokingFrequency: 'NON SMOKER',
        ergonomicWorkspace: false,
        computerHours: "Less than 4 hours",
        seatedHours: "Less than 4 hours",
        activeScale: 10,
        durationOfSleep: "Less than 6 hours",
        stress: false,
        exerciseProgramme: false,
        personalTrainer: false,
        dietaryPlan: false
    }

    const [ error, setError ] = useState<any>({});
    const [ pageVisibility, setPageVisibility ] = useState(-1);
    const healthHistoryValues: any = healthHistoryValuesFunction();
    const cigarettesPerDayValues: any = cigarettesPerDayValuesFunction();
    const height: any = heightFunction();
    const weight: any = weightFunction();
    const seatedHoursValues = seatedHoursValuesFunction();
    const computerHoursValues = computerHoursValuesFunction();
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

    useEffect(()=> {

        if(!isEmpty(data) && !data.error) {
            setPersonalInformation(data);
        } 
        else if(localStorage.getItem('patient')) {
            var patientData = JSON.parse(localStorage.getItem('patient')||'');
         
            setPersonalInformation(patientData);
        }

        if(isEmpty(data)) {
            setPersonalInformation(defaultPersonalInformation);
        }
        setTimeout( function() {
            (document.querySelector('.patient-info') as HTMLElement).style.display = 'flex';
        }, 3000);
        
    },[data]);

    useEffect(()=> {
       
        if (page != null && page != -1) setPageVisibility(parseInt(page));
    },[page]);

    useEffect(()=> {
       
        setClinicComments(comments);
    },[comments]);

    useEffect(()=> {
        if(healthAndFamilyHistory.weight> 0 && healthAndFamilyHistory.height > 0) {
            const BMI = Math.trunc(healthAndFamilyHistory.weight/(healthAndFamilyHistory.height * healthAndFamilyHistory.height));
         
            const status = BMIStatus(BMI);
            setHealthAndFamilyHistory({...healthAndFamilyHistory, BMI: BMI})
            setWeightStatus(status);
        }
    },[healthAndFamilyHistory.weight || healthAndFamilyHistory.height]);

    const nextPage = () => {
       
        if (pageVisibility < maxSize - 1) {
         
            setPageVisibility(pageVisibility + 1);
        }
    }

    const save = async(event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try{
           
            var value:any = await PersonalInformationFormValidation.validateSync(omitBy({
                ...personalInformation,
            }, (value)=> isEmpty(value) || value==='' || isUndefined(value)), {
                strict: true,
                abortEarly: false,
                stripUnknown: false
            });

            if (personalInformation.profilePicBlob instanceof Blob) {
                value.profilePicBlob = personalInformation.profilePicBlob;
            }
            else if (typeof(personalInformation.profilePicBlob) != 'string' && personalInformation.profilePicBlob != '' && !(personalInformation.profilePicBlob instanceof Blob)){
                setError({profilePicBlob: 'Profile Pic is not a file'});
                throw 'Not a file';
            }
            onSubmit(value, 'save');

        }
        catch(err: any) {

            if(err.inner) {
                var errorArray = err.inner.map((error: any) => {
                    let { path, value}: any = errorHandler.validation(error);
     
                     return {
                         [path] : t(`${value}`, {field: t(`label.${path}`)})
                     };
                 });
     
                 errorArray = errorArray.reduce(function(errorObj: any, curr: any) {
                     errorObj[Object.keys(curr)[0]] = Object.values(curr)[0]
                     return errorObj;
                 })
               
                 setError(errorArray);
            }
            
        }
    }

    const submitObesityPredictionData = async(event: any) => {
        event.preventDefault();
        let tempHealthAndFamilyHistory:any = _.omit(healthAndFamilyHistory, ['height', 'weight']);
       
        const fullData = {
            patientID: personalInformation.patientID,
            reportID: personalInformation.reportID,
            healthAndFamilyHistory: {
                BMI: parseInt(lifestyleInformation.BMI),
                ...tempHealthAndFamilyHistory,
            },   
            lifestyleInformation: {
                ...lifestyleInformation,
                activeScale: parseInt(lifestyleInformation.activeScale),
                occupation: parseInt(lifestyleInformation.occupation),
            },
            dietaryIntakeInformation: {
                ...dietaryIntake,
            },
            gender: t(`label.${personalInformation.gender.toLowerCase()}`),
            race: t(`label.${personalInformation.race.toLowerCase()}`)
        }

        try {
            const value = await ObesityPredictionValidation.validateSync(omitBy({
                ...fullData,
            }, (value)=> isEmpty(value) || value==='' || isUndefined(value)), {
                strict: true,
                abortEarly: false,
                stripUnknown: false
            });
            onSubmit(value, "prediction");
        }
        catch(err: any) {
            var tempErrors:any = {};

            err?.inner.map((error: any, index: number)=> {
                let { path, message, type } = error;
                
                var [ first, ...last] = message.split(' ');
              
                if (path.indexOf('.')!==-1) {
                    const str = path.split('.');
                    path = str[0];
                    subPath = str[1];

                    if(message.includes('must be one of')) {
                        message = "This question is required."
                    }
                    else if (message.includes('type,')) {
                        last = (last.join(' ')).split('type, ')[0];
                        message = t(`label.${subPath}`) + ' ' + last;
                    }
                    else {
                        message = t(`label.${subPath}`) + " " + last.join(' ') + '.';
                    }
                  
                }
                else {
                    if(message.includes('must be one of')) {
                        message = "This question is required."
                    }
                    else if (message.includes('type,')) {
                        message = message.split('type,')[0];
                    }
                    else {
                        message = t(`label.${path}`) + " " + last.join(' ') + '.';
                    }
                    
                }
    
                if (document.querySelector(`input[name=${path}]`)) {
                    (document.querySelector(`input[name=${path}]`) as HTMLInputElement).focus();
    
                }
                else if (document.querySelector(`div[name=${path}]`)) {
                    (document.querySelector(`div[name=${path}]`) as HTMLInputElement).focus();
                }

                tempErrors = {
                    ...tempErrors,
                    [subPath]: message
                }
              
            })
            setError(tempErrors);
            var subPath = '';

            setToaster({
                type: 'errors',
                message: 'Please double check your answers or input.'
            })
        }
       
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
               dateOfBirth: personalInformation.dateOfBirth
           }
           
            var value:any = await PersonalInformationFormValidation.validateSync(omitBy({
                ...patientData,
            }, (value)=> isEmpty(value) || value==='' || isUndefined(value)), {
                strict: true,
                abortEarly: false,
                stripUnknown: false
            });
            
            if (personalInformation.profilePicBlob instanceof Blob) {
                value.profilePicBlob = personalInformation.profilePicBlob;
            }
           
            if ((personalInformation.profilePicBlob!= '' && typeof(personalInformation.profilePicBlob) != 'string')&& !(personalInformation.profilePicBlob instanceof Blob)){
                setError({profilePicBlob: 'Profile Pic is not a file'});
                throw 'Not a file';
            }

           onSubmit(value, action);
        }
        catch(err: any) {
            var errorArray = err.inner.map((error: any) => {
                let tempErr: any = errorHandler.validation(error);
                let { path, value, type } = tempErr;

                if(type && tempErr[type]) {
                    return {
                        [path] : t(`${value}`, {field: t(`label.${path}`), [type]: tempErr[type]})
                    };
                }
                else
                 return {
                     [path] : t(`${value}`, {field: t(`label.${path}`)})
                 };
             });
 
             errorArray = errorArray.reduce(function(errorObj: any, curr: any) {
                 errorObj[Object.keys(curr)[0]] = Object.values(curr)[0]
                 return errorObj;
             })
             setError(errorArray);
        }
    }


    const prevPage = () => {
        if (pageVisibility > 0) {
            setPageVisibility(pageVisibility - 1);
        }
    }

    const handleTextChange = (name: string, value: any) => {
        setToaster({ type:'success', message: value});
     
        let tempError = error;
        if(tempError.hasOwnProperty(name)) tempError = _.omit(tempError, [name]);

        setError(tempError);
        if(name.indexOf('.')!==-1) {
            let subName = name.split('.')[1]
            name = name.split('.')[0];

            if (name.includes('personalInformation')) {

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
    }

     const handleCommentChange = (name: string, value: any) => {
      
        let tempError = error;
        if(tempError.hasOwnProperty(name)) tempError = _.omit(tempError, [name]);

        setError(tempError);
        if(name.indexOf('.')!==-1) {
            let subName = (name.split('.')[1]).toString();
            
            name = name.split('.')[0];

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
                setPersonalInformation({...personalInformation, [subName]: value});
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
    }

    const handleSelectChange = (name: string, value: any) => {
        let tempError = error;
        if(tempError.hasOwnProperty(name)) tempError = _.omit(tempError, [name]);

        setError(tempError);
        if(name.indexOf('.')!==-1) {
            const str = name;
            name = str.split('.')[0];
            let subName = str.split('.')[1];
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
    }

    const handleImageChange = (action: string = 'add', name: string, blob: any) => {
        if(name.toLowerCase().includes('comment')){
            let subName = name.split('.')[1];
            if(modalComment[subName].length > 0 && action=='add') {
                setModalComment({...modalComment, [subName]: [blob]});
               

            }
            else {
                if (blob instanceof Blob) {
                    setModalComment({...modalComment, [subName]: [blob]});
                }
            }
        }
        else {
            if(name.indexOf('.')!==-1) {
                let subName = name.split('.')[1];
                setPersonalInformation({
                    ...personalInformation, [subName]: blob
                })
            }
                
        }
    }

    const createEditComment = (e: any) => {
        e.preventDefault();
        const index = modalComment.arrayIndex;
     
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
        var image:any = [];
        if(_.isEqual(clinicComments[index]?.image, modalComment?.image)) {
            image = undefined;
        }
        else {
            image = Array.isArray(modalComment?.image)?  modalComment?.image.filter((img:any, index: any)=> {
                
                return !isUndefined(img) && img != null && typeof(img)!='string'
            }) : modalComment?.image ? modalComment?.image : undefined 
        }
        let tempComment = omitBy({
            id: modalComment?.id > -1 ? modalComment.id : undefined,
            patientID: personalInformation.patientID,
            diagnosis: modalComment?.diagnosis,
            comment: modalComment?.comment,
            user: user,
            image: image,
        }, isUndefined);
        
        let validateComment = {
            diagnosis: tempComment?.diagnosis,
            comment: tempComment?.comment,
        }
        try {
            const value = CommentsValidation.validateSync(omitBy({
                ...validateComment,
            }, (value)=> isEmpty(value) || value==='' || isUndefined(value)), {
                strict: true,
                abortEarly: false,
                stripUnknown: false
            });
            
            let action = tempComment?.id > -1? 'edit comment': 'create comment';
            onSubmit(tempComment, action);
        }
        catch(err: any) {
            if(err.inner) {
                var errorArray = err.inner.map((error: any) => {
                    let { path, value}: any = errorHandler.validation(error);
     
                     return {
                         [path] : t(`${value}`, {field: t(`label.${path}`)})
                     };
                 });
     
                 errorArray = errorArray.reduce(function(errorObj: any, curr: any) {
                     errorObj[Object.keys(curr)[0]] = Object.values(curr)[0]
                     return errorObj;
                 })
                 setError(errorArray);
            }
        }
        
    }

    const editComment = (e: any) => {
      
        const index = parseInt(e.target.id);
        let tempComment:any = {
            id: clinicComments[index].id,
            diagnosis: clinicComments[index].diagnosis,
            comment: clinicComments[index].comment,
            updated: clinicComments[index].updated,
            image: clinicComments[index].image,
            created: clinicComments[index].created,
            arrayIndex: index,
        }
     
        setModalComment(tempComment);
        toggleCommentModalVisibility(true, index);
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

        setCommentModal(visible);
    }

    return (
        <div style={{width: 'inherit'}}>
            <title></title>
            <Modal visible={commentModal} onClose={toggleCommentModalVisibility}>
                <Row>
                
                    <Col>
                        <Row>
                            <div style={{width: 'inherit'}}>
                                <TextInput subtitle={modalComment?.updated? `Last updated: ${new Date(modalComment?.updated).toLocaleDateString([], {year: 'numeric',  month: 'long',   day: 'numeric'})}`:''} key={modalComment?.id} value={modalComment?.diagnosis} required error={!!error?.diagnosis} name="modalComment.diagnosis" label={`${t('label.diagnosis')}` + (modalComment?.created!=undefined? `  Date: ${new Date(modalComment?.created).toLocaleDateString([], {year: 'numeric',  month: 'long',   day: 'numeric'})}`: '')} onChange={handleCommentChange} />      
                                <AlertBox error={error?.diagnosis} name={t('label.diagnosis')} />
                            </div>
                        </Row>

                        <Row>
                            <div style={{width: 'inherit'}}>
                                <TextArea  key={modalComment?.id} value={modalComment?.comment} required error={!!error?.comment} name="modalComment.comment" label={t('label.comment')} onChange={handleCommentChange} />
                                <AlertBox error={error?.comment} name={t('label.comment')} />
                            </div>
                        </Row>
                    </Col>
                    <Col>
                        <ImageUpload comment={true} onChangeImg={handleImageChange} name="modalComment.image" blob={modalComment?.image}/>
                    </Col>
                
                </Row>
                <Row> 
                    <button aria-label="submit comment button" className="standard" id={modalComment.arrayIndex} onClick={createEditComment}>{modalComment?.id == -1? 'New Comment': <><img alt="edit comment"  style={{width: '20px', height: '20px'}} src="/assets/images/edit.png" />Edit Comment</>}</button>
                </Row>

            </Modal>
        <div className="patient-info">
       
                 
            <div className="div" style={{...styles.fadeIn}}>
            
                { personalInformation.patientID !==-1 && 
                    <div className="back"><button aria-label="go back to patient's view button" className="back--button" onClick={()=> {history.push(`/patient/view/${encode(personalInformation.reportID)}`)}}>Go back to {personalInformation?.fullName}'s view</button></div> 
                }
           
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
                              
                            </div>
                            <div className="divider--fifty">
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <ImageUpload onChangeImg={handleImageChange} name="personalInformation.profilePicBlob" blob={personalInformation?.profilePicBlob}/>
                                        <AlertBox error={error?.profilePicBlob} name={t('label.profilePicBlob')} />
                                    </div>
                                </Row>
                            </div>
                            
                        </div>
                        <div style={{width: '80%', display: 'flex'}}> 
                            <div style={{ justifyContent: 'flex-start', float: 'right', width: '100%', alignSelf: 'flex-start', display: 'flex'}}>
                                
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end'}}>
                               
                                {
                                    personalInformation.patientID!== -1 ?
                                    <button className="save" onClick={save}>{'Save'}</button>
                                    :<Row>
                                        <button aria-label="add new patient button"className="save" onClick={(event)=>createPatient(event, 'create')}>{'Add Patient'}</button>
                                        <button aria-label="add new patient and add another button" className="save" onClick={(event)=>createPatient(event, 'add another')}>{'Add Patient and Add Another'}</button>
                                    </Row>
                                }
                            </div>
                        </div>
                    </div>
                    
                </PagePane>
                
                <PagePane index={1}>
                    <div className="division">
                        <div className="header">    
                            <h2>Weight & BMI</h2>
                        </div>
                        <div className="content">                        
                            <div className="divider--fifty">
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={height || []} value={healthAndFamilyHistory?.height} required error={!!error?.height} name='healthAndFamilyHistory.height' label={t('question.height')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.BMI} name={t('label.height')}/>
                                    </div>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={weight || []} value={healthAndFamilyHistory?.weight} required error={!!error?.weight} name='healthAndFamilyHistory.weight' label={t('question.weight')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.BMI} name={t('label.weight')}/>
                                    </div>
                                </Row>
                               
                            </div>
                            <div className="divider--fifty">
                                
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
                                        <RadioInput
                                            defaultValue={healthAndFamilyHistory.familyHistory}
                                            name="healthAndFamilyHistory.familyHistory" 
                                            label={t('question.familyHistory')}
                                            error={!!error.familyHistory}
                                            values={healthHistoryValues}
                                            required
                                            onSelect={handleSelectRadio}
                                        />
                                        <AlertBox error={error?.familyHistory} name={t('label.familyHistory')}/>
                                    </div>
                             </Row>
                            </div>
                        </div>
                        <div style={{width: '100%', display: 'flex'}}> 
                            <div style={{ justifyContent: 'flex-start', float: 'right', width: '100%', alignSelf: 'flex-start', display: 'flex'}}>
                               
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end'}}>
                                {
                                    pageVisibility < (maxSize - 1 ) &&  <button aria-label="next page button" className="standard" onClick={nextPage}>Next</button>
                                }
                            </div>
                        </div>
                    </div>
                    
                </PagePane>
                {personalInformation.patientID !== -1 && 
                <PagePane index={2}>
                    <div className="division">
                        <div className="header">   
                            <h2>Dietary Information</h2>
                        </div>
                        <div className="content">                        
                            <div className="divider--seventy">
                              
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
                                        <AlertBox error={error?.alcoholFrequency} name={t('label.avgAlcoholConsumption')} />
                                    </div>
                                </Row>
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
                                            subtitle="cheese, homogenized milk, yogurt - high fat variety, ice cream"
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
                                            subtitle="fried rice, pisang goreng, fried chicken"
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
                                            subtitle="milk alone or with tea, coffee; low fat sour cream, yogurt, margarine"
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
                                            subtitle="potato chips, nachos, Any type of fried snack, cheese products, chocolate bars."
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
                                            subtitle="regular soft drinks, candies and other sweet stuff"
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
                                                subtitle={"(1 whole carrot, 8 large apricots halves, half cup of musk melon, 1 baked sweet potato, 1 whole pear, 8 large rambutans, 8 large mangos teens, 2 jambu merah)"}
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
                                                subtitle={"Luncheon meats, processed meats (example: ayamas), sausages or any other processed meat"}
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
                                                subtitle={"nasi lemak, mee goreng mamak, roti canai, ayam percik"}
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
                            
                        </div>
                    </div>                        
                    </div>
                    <div style={{width: '100%', display: 'flex'}}> 
                        <div style={{ justifyContent: 'flex-start', float: 'right', width: '100%', alignSelf: 'flex-start', display: 'flex'}}>
                            {
                                pageVisibility > 0 && <button aria-label="previous page button" className="standard" onClick={prevPage}>Prev</button>
                            }
                            
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end'}}>
                            {
                                pageVisibility < (maxSize-1) &&  <button aria-label="next page button" className="standard" onClick={nextPage}>Next</button>
                            }
                          
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
                                            <SearchInput 
                                                subtitle={"(1 = not active, 10 = very active)"} 
                                                searchOptions={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]} 
                                                value={lifestyleInformation?.activeScale} 
                                                required 
                                                error={!!error?.activeScale} 
                                                name='lifestyleInformation.activeScale' 
                                                label={t('question.activeScale')} 
                                                onSearch={handleSearchChange} 
                                            />
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
                                </div>
                            </div>
                        </div>
                        <div style={{width: '100%', display: 'flex'}}> 
                        <div style={{ justifyContent: 'flex-start', float: 'right', width: '100%', alignSelf: 'flex-start', display: 'flex'}}>
                            {
                                pageVisibility > 0 && <button aria-label="previous page button" className="standard" onClick={prevPage}>Prev</button>
                            }
                            
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end'}}>
                           
                            <button aria-label="generate obesity and comorbidities prediction report button" className="save" onClick={(e) => submitObesityPredictionData(e)}>Generate Prediction Report</button>
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
                            <button aria-label="new comment button" className="standard" onClick={()=> {toggleCommentModalVisibility(true)}}><img alt="new comment"  className="img" style={{filter: 'brightness(0) invert(1)', width: '20px', height: '20px'}} src="/assets/images/add-grey.png"/>New Comment</button>
                           
                            
                        </div>
                        <div className="content" style={{flexDirection:'row'}}>                   
                            <div className="divider--fifty">
                                {
                                    clinicComments !=[] && clinicComments.map((comment: any, index: any)=> {
                                      
                                        return <>
                                                <Row key={index}>
                                                    <div style={{width: 'inherit'}}>
                                                        <TextInput subtitle={comment?.updated != ''? `Last updated: ${new Date(comment?.updated).toLocaleDateString([], {year: 'numeric',  month: 'long',   day: 'numeric'})}`: ''} disabled key={comment?.id} value={comment?.diagnosis} required error={!!error[`comment[${index}]`]?.diagnosis} name={`comment[${index}].diagnosis`} label={`${t('label.diagnosis')}` + (comment?.created!=undefined? `  Date: ${new Date(comment?.created).toLocaleDateString([], {year: 'numeric',  month: 'long',   day: 'numeric'})}`: '')} onChange={handleCommentChange} />      
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
                                                    <button aria-label="edit comment button" id={index} className="save" onClick={(e) => {editComment(e)}}><img alt="edit comment" style={{width: '20px', height: '20px'}} src="/assets/images/edit.png" />Edit Comment</button>
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
                             
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end'}}>
                            </div>
                        </div>
                    </Row>
                    
                </PagePane>
                }
            </Page>
            </div>
        </div>
        </div>
    )
}

export default PatientInformation;