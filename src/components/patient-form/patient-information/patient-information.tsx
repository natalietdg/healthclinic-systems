import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { PatientInformationType, patientInformationAtom } from 'Recoil/patient.atom';
import './patient-information.scss';
import { healthHistoryValuesFunction, cigarettesPerDayValuesFunction, BMIStatus, nicotineAmtValuesFunction, heightFunction, weightFunction, yearFunction, lastHundredYearsFunction, alcoholTypesValuesFunction, averageAlcoholConsumptionValuesFunction } from 'Data/patientInformationValues';
import { Container, Page, Row, Col, ImageUpload } from 'Components/shared';
import errorHandler from 'Utils/error-handler';
import { omitBy, isEmpty, isUndefined } from 'lodash';
import moment from 'moment';
import PagePane from 'Components/shared/page/page-pane'
import { TextInput, AlertBox, RadioInput, SelectInput, ProgressBar, TextArea, Checkbox, AddressInput, DateInput, SearchInput, Table } from 'Components/shared';
import { PatientInformationFormValidation } from './patient-information.validation';

interface PatientInformationProps {
    onSubmit: (data: any) => void;
    data: any;
}

const PatientInformation:React.FC<PatientInformationProps> = ({onSubmit, data})=> {
    const { t } = useTranslation();
    const [ weightStatus, setWeightStatus ] = useState('');
    const [ pageVisibility, setPageVisibility ] = useState(0);
    const healthHistoryValues: any = healthHistoryValuesFunction();
    const cigarettesPerDayValues: any = cigarettesPerDayValuesFunction();
    const nicotineAmtValues: any = nicotineAmtValuesFunction();
    const alcoholTypeValues: any = alcoholTypesValuesFunction();
    const height: any = heightFunction();
    const weight: any = weightFunction();
    const yearsOption: any = yearFunction();
    const lastHundredYears = lastHundredYearsFunction();
    const averageAlcoholConsumptionValues: any = averageAlcoholConsumptionValuesFunction();
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
            name: 'healthHistory',
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
            name: 'comments',
            index: 3,
            fields: [
                "comments",
                "diagnosis"
            ]
        }
    ]

    const [maxSize, setMaxSize] = useState(0);

    const [ patientInformation, setPatientInformation ] = useState<any>(patientInformationAtom);

    useEffect(()=> {
        setPatientInformation(data);
    },[data]);

    useEffect(()=> {
        if(patientInformation.weight> 0 && patientInformation.height > 0) {
            const BMI = patientInformation.weight/(patientInformation.height * patientInformation.height);
            console.log('BMI', BMI);
            const status = BMIStatus(BMI);
            console.log('status', status);
            setWeightStatus(status);
        }
    },[patientInformation.weight || patientInformation.height]);

    useEffect(()=> {
        console.log('patientInformaiton', patientInformation);
    },[patientInformation])

    const [ error, setError ] = useState<any>({});

    useEffect(()=> {
        console.log('error pt',error);
    },[error]);
    
    useEffect(()=> {
        console.log('pageVisibility',pageVisibility);
    },[pageVisibility]);


    const nextPage = () => {
        if (pageVisibility < maxSize - 1) {
            setPageVisibility(pageVisibility + 1);
        }
    }

    const saveAndContinue = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try{
           
            const value = PatientInformationFormValidation.validateSync(omitBy({
                ...patientInformation,
                dateOfBirth: moment(patientInformation.dateOfBirth)
            }, (value)=> isEmpty(value) || value==='' || isUndefined(value)), {
                strict: true,
                abortEarly: true,
                stripUnknown: false
            });
            console.log(moment(patientInformation.dateOfBirth));
            console.log('value', value);
    
            onSubmit(value);

        }
        catch(err) {
            let { path, value }:any = errorHandler.validation(err);
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
           
            pages.map((page, index)=> {
               
                if(page.fields.includes(path) || page.fields.includes(subPath)) {
                    console.log('page', page);
                    setPageVisibility(page.index);
                }
            })

            if (document.querySelector(`input[name=${path}]`)) {
                (document.querySelector(`input[name=${path}]`) as HTMLInputElement).focus();

            }
            else if (document.querySelector(`div[name=${path}]`)) {
                (document.querySelector(`div[name=${path}]`) as HTMLInputElement).focus();
            }
        }
    }

    const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        
    }


    const prevPage = () => {
        if (pageVisibility > 0) {
            setPageVisibility(pageVisibility - 1);
        }
    }

    // useEffect(()=> {
    //     console.log('patientInformation.healthHistory', patientInformation);
    // },[patientInformation])

    const handleTextChange = (name: string, value: any) => {
        console.log('name', name);
        console.log('value', value);
        setError({});
        if(name.indexOf('.')!==-1) {
            let subName = name.split('.')[1]
            name = name.split('.')[0];

            setPatientInformation({...patientInformation, [name]: {
                ...patientInformation[name],
                [subName]: value
            }});

            return;
        }
        setPatientInformation({...patientInformation, [name]: value });
    }

     const handleCommentChange = (name: string, value: any) => {
        console.log('name', name);
        console.log('value', value);
        setError({});
        if(name.indexOf('[')!==-1) {
            let subName = name.split('.')[1];
            let index:any = (subName.split('[')[1]).split(']')[0];
            subName = subName.split('[')[0];
            name = name.split('.')[0];
            
            let tempArray = [...patientInformation[name]];
            let item = {...tempArray[index]};
            item[subName] = value;
            tempArray[index] = item;

            setPatientInformation({...patientInformation, [name]: [
                ...tempArray
            ]});

            return;
        }
    }


    const handleSearchChange = (name: string, value: any) => {
        setError({});
        value = parseFloat(value) ? parseFloat(value): value;
        console.log('value', value);
        if (name.indexOf('.')!==-1) {
            let subName = name.split('.')[1];
            name = name.split('.')[0];
         
            setPatientInformation({...patientInformation, [name]: {
                ...patientInformation[name],
                [subName]: value
            }});
            return;
        }
        
        setPatientInformation({...patientInformation, [name]: value });
    }

    const handleSelectRadio = (name: string, value: any) => {
        // value = (value=='true' || value=='false')? (value==='true'): value;
        console.log('name', name);
        console.log('value', value);
        if(name.indexOf('.')!==-1) {
            let subName = name.split('.')[1]
            name = name.split('.')[0];
            setPatientInformation({...patientInformation, [name]: {
                ...patientInformation[name],
                [subName]: value
            }});

            return;
        }
        setPatientInformation({...patientInformation, [name]: value});
        setError({});
    }

    const handleChecked = (name: string, subName: string, value: any) => {
        setError({});
        setPatientInformation({
            ...patientInformation, 
            [name]: {
                ...patientInformation[name],
                [subName]: value,
            }}
        );
    }

    const handleSelectChange = (name: string, value: any) => {
        setError({});

        if(name.indexOf('.')!==-1) {
            const str = name;
            name = str[0];
            let subName = str[1];

            setPatientInformation({
                ...patientInformation, 
                [name]: {
                    ...patientInformation[name],
                    [subName]: value,
                }}
            );

            return;
        }
        setPatientInformation({...patientInformation, [name]: value})
    }

    const handleAddressChange = (name: string, value: any) => {
        setError({});
        setPatientInformation({...patientInformation, address: {
                ...patientInformation.address,
                [name]: value
            }
        });
    }

    const handleImageChange = (name: string, blob: Blob) => {
        console.log('name', name);
        console.log('blob', blob);
        setPatientInformation({
            ...patientInformation, [name]: blob
        })
    }

    const newComment = () => {
        const newcomment = {
            diagnosis: '',
            comments: ''
        }

        setPatientInformation({
            ...patientInformation, comments: [
                ...patientInformation.comments, newcomment
            ]
        })
    }

    const removeComment = (index: any) => {
        console.log(index);
        let tempComments = [...patientInformation.comments];
        tempComments.splice(index, 1);
        setPatientInformation({...patientInformation, 
            comments: [
                ...tempComments
            ]
        })
    }

    return (
       
        <div className="patient-info">
            <ProgressBar  
            currentPage={pageVisibility}
            maxSize = {maxSize}
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
                    name: 'lifestyle-information',
                    index: 2
                },
                {
                    name: 'comments',
                    index: 3
                }
            ]}
            />
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
                                        <TextInput value={patientInformation?.fullName} required error={!!error?.fullName} name='fullName' label={t('label.fullName')} onChange={handleTextChange} />
                                        <AlertBox error={error?.fullName} name={t('label.fullName')} />
                                    </div>
                                    {/* <div style={{width: 'inherit'}}>
                                        <TextInput value={patientInformation?.lastName} required error={!!error?.lastName} name='lastName' label={t('label.lastName')} onChange={handleTextChange} />
                                        <AlertBox error={error?.lastName} name={t('label.lastName')} />
                                    </div> */}
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <TextInput value={patientInformation?.ic} required error={!!error?.ic} name='ic' label={t('label.ic')} onChange={handleTextChange} />
                                        <AlertBox error={error?.ic} name={t('label.ic')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <TextInput value={patientInformation?.phoneNumber} required error={!!error?.phoneNumber} name='phoneNumber' label={t('label.phoneNumber')} onChange={handleTextChange} />
                                        <AlertBox error={error?.phoneNumber} name={t('label.phoneNumber')} />
                                    </div>
                                </Row>
                                {/* <Row>
                                <div style={{width: 'inherit'}}>
                                        <DateInput value={patientInformation?.dateOfBirth} required error={!!error?.dateOfBirth} name='dateOfBirth' label={t('label.dateOfBirth')} onChange={handleTextChange} />
                                        <AlertBox error={error?.dateOfBirth} name={t('label.dateOfBirth')} />
                                    </div>
                                </Row> */}
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
                                            defaultValue={patientInformation.race}
                                            required 
                                            error={error?.race} 
                                            name='race' 
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
                                            defaultValue={patientInformation.gender}
                                            required 
                                            error={error?.gender} 
                                            name='gender' 
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
                                            defaultValue={patientInformation.educationLevel}
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
                                            addressInput={patientInformation.address}
                                            error={error?.address}
                                            onChange={handleAddressChange}
                                        />  
                                    </div>
                                </Row> */}
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <TextArea value={patientInformation.reasonForConsultation} required error={error?.reasonForConsultation} name='reasonForConsultation' label={t('label.reasonForConsultation')} onChange={handleTextChange} />
                                        <AlertBox error={error?.reasonForConsultation} name={t('label.reasonForConsultation')} />
                                    </div>
                                </Row>
                            </div>
                            <div className="divider--fifty">
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <ImageUpload onChangeImg={handleImageChange} name="profilePicBlob" blob={patientInformation?.profilePicBlob}/>
                                    </div>
                                </Row>
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
                                        defaultValue={patientInformation.smokingStatus.status}
                                        required 
                                        error={!!error?.smokingStatus?.status} 
                                        name='smokingStatus.status' 
                                        label={t('question.smokingStatus', {smoking: 'cigarettes'})} 
                                        onSelect={handleSelectRadio} 
                                    />
                                    <AlertBox error={error?.smokingStatus?.status} name={t('label.smokingStatus')} />
                                </div>
                                
                            </Row>
                            {   patientInformation.smokingStatus.status != 'false' &&
                                <Row>
                                <div style={{width: 'inherit'}}>
                                    <SelectInput 
                                        name="smokingStatus.cigarettesPerDay"
                                        label={t('label.cigarettesPerDay')}
                                        required
                                        value={patientInformation.smokingStatus.cigarettesPerDay}
                                        error={!!error?.smokingStatus?.cigarettesPerDay}
                                        selectOptions={cigarettesPerDayValues}
                                        onSelect={handleSelectChange}
                                    />
                                    <AlertBox error={error?.smokingStatus?.cigarettesPerDay} name={t('label.educationLevel')} />
                                </div>
                                </Row>
                            }
                            { 
                                patientInformation.smokingStatus.status=='Ex-Smoker' && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={lastHundredYears || []} value={patientInformation?.smokingStatus?.lastSmoked} required error={!!error?.smokingStatus?.lastSmoked} name='smokingStatus.lastSmoked' label={t('question.lastSmoked')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.smokingStatus?.lastSmoked} name={t('label.lastSmoked')} />
                                    </div>
                                </Row>
                            }
                            { 
                                (patientInformation.smokingStatus.status=='Ex-Smoker'|| patientInformation.smokingStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={patientInformation?.smokingStatus?.startedSmokingAge} required error={!!error?.startedSmokingAge} name='smokingStatus.startedSmokingAge' label={t('question.startedSmokingAge')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.smokingStatus?.startedSmokingAge} name={t('label.startedSmokingAge')} />
                                    </div>
                                </Row>
                            }
                            
                            { 
                                (patientInformation.smokingStatus.status=='Ex-Smoker'|| patientInformation.smokingStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={patientInformation?.smokingStatus?.yearsSmoked} required error={!!error?.smokingStatus?.yearsSmoked} name='smokingStatus.yearsSmoked' label={t('question.yearsSmoked')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.smokingStatus?.yearsSmoked} name={t('label.yearsSmoked')} />
                                    </div>
                                </Row>
                            }
                            {
                                (patientInformation.smokingStatus.status == 'true' || patientInformation.smokingStatus.status == 'Ex-Smoker') &&
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <Checkbox
                                            input={patientInformation.smokingStatus.causeOfSmoking}
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
                                        defaultValue={patientInformation.familyHasSmoker}
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
                                        defaultValue={patientInformation.eCigaretteStatus.status}
                                        required 
                                        error={error?.eCigaretteStatus?.status} 
                                        name='eCigaretteStatus.status' 
                                        label={t('question.smokingStatus', {smoking: 'e-cigarettes'})} 
                                        onSelect={handleSelectRadio} 
                                    />
                                    <AlertBox error={error?.eCigaretteStatus?.status} name={t('label.eCigaretteStatus')} />
                                </div>
                                
                            </Row>
                            {   patientInformation.eCigaretteStatus.status != 'false' &&
                                <Row>
                                <div style={{width: 'inherit'}}>
                                    <SelectInput 
                                        name="eCigaretteStatus.nicotineAmt"
                                        label={t('question.nicotineAmt')}
                                        required
                                        value={patientInformation.eCigaretteStatus.nicotineAmt}
                                        error={!!error?.eCigaretteStatus?.nicotineAmt}
                                        selectOptions={nicotineAmtValues}
                                        onSelect={handleSelectChange}
                                    />
                                    <AlertBox error={error?.eCigaretteStatus?.nicotineAmt} name={t('label.eCigaretteStatus.nicotineAmt')} />
                                </div>
                                </Row>
                            }
                            { 
                                (patientInformation.smokingStatus.status=='Ex-Smoker'|| patientInformation.smokingStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={patientInformation?.smokingStatus.startedSmokingAge} required error={!!error?.startedSmokingAge} name='startedSmokingAge' label={t('question.startedSmokingAge')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.smokingStatus?.startedSmokingAge} name={t('label.yearsSmoked')} />
                                    </div>
                                </Row>
                            }
                            
                            { 
                                patientInformation.eCigaretteStatus.status=='Ex-Smoker' && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={lastHundredYears || []} value={patientInformation?.eCigaretteStatus?.lastSmoked} required error={!!error?.eCigaretteStatus?.lastSmoked} name='eCigaretteStatus.lastSmoked' label={t('question.lastSmoked')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.eCigaretteStatus?.lastSmoked} name={t('label.lastSmoked')} />
                                    </div>
                                </Row>
                            }
                            { 
                                (patientInformation.eCigaretteStatus.status=='Ex-Smoker'|| patientInformation.eCigaretteStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={patientInformation.eCigaretteStatus?.yearsSmoked} required error={!!error?.eCigaretteStatus?.yearsSmoked} name='eCigaretteStatus.yearsSmoked' label={t('question.yearsSmoked')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.eCigaretteStatus?.yearsSmoked} name={t('label.yearsSmoked')} />
                                    </div>
                                </Row>
                            }
                            {
                                (patientInformation.eCigaretteStatus.status == 'true' || patientInformation.eCigaretteStatus.status == 'Ex-Smoker') &&
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <Checkbox
                                            input={patientInformation.eCigaretteStatus.causeOfSmoking}
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
                                            defaultValue={patientInformation.alcoholStatus.status}
                                            required 
                                            error={error?.alcoholStatus?.status} 
                                            name='alcoholStatus.status' 
                                            label={t('question.alcoholStatus')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.alcoholStatus?.status} name={t('label.alcoholStatus')} />
                                    
                                   
                                    
                                </Row>
                                {   (patientInformation.alcoholStatus.status == 'true' || patientInformation.alcoholStatus.status == 'Reformed Alcoholic') &&
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <SelectInput 
                                                name="alcoholStatus.alcoholType"
                                                label={t('label.alcoholType')}
                                                required
                                                value={patientInformation?.alcoholStatus?.alcoholType}
                                                error={!!error?.alcoholStatus?.alcoholType}
                                                selectOptions={alcoholTypeValues}
                                                onSelect={handleSelectChange}
                                            />
                                            <AlertBox error={error?.alcoholStatus?.alcoholType} name={t('label.alcoholType')} />
                                        </div>
                                    </Row>
                                }
                                 {    (patientInformation.alcoholStatus.status == 'true' || patientInformation.alcoholStatus.status == 'Reformed Alcoholic') &&
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <SelectInput 
                                                name="alcoholStatus.avgAlcoholConsumption"
                                                label={patientInformation.alcoholStatus.status=='true'?t('label.avgAlcoholConsumption'): t('label.avgAlcoholConsumptionEx')}
                                                required
                                                value={patientInformation?.alcoholStatus?.avgAlcoholConsumption}
                                                error={!!error?.alcoholStatus?.avgAlcoholConsumption}
                                                selectOptions={averageAlcoholConsumptionValues}
                                                onSelect={handleSelectChange}
                                            />
                                            <AlertBox error={error?.alcoholStatus?.avgAlcoholConsumption} name={t('label.avgAlcoholConsumption')} />
                                        </div>
                                    </Row>
                                }
                                 { 
                                patientInformation.alcoholStatus.status=='Reformed Alcoholic' && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={lastHundredYears || []} value={patientInformation?.alcoholStatus?.lastDrank} required error={!!error?.alcoholStatus?.lastDrank} name='alcoholStatus.lastDrank' label={t('question.lastDrank')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.alcoholStatus?.lastDrank} name={t('label.lastDrank')} />
                                    </div>
                                </Row>
                            }
                            { 
                                (patientInformation.alcoholStatus.status=='Reformed Alcoholic'|| patientInformation.alcoholStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={patientInformation?.alcoholStatus?.startedDrinkingAge} required error={!!error?.startedDrinkingAge} name='alcoholStatus.startedDrinkingAge' label={t('question.startedDrinkingAge')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.alcoholStatus?.startedDrinkingAge} name={t('label.startedDrinkingAge')} />
                                    </div>
                                </Row>
                            }
                            
                            { 
                                (patientInformation.alcoholStatus.status=='Reformed Alcoholic'|| patientInformation.alcoholStatus.status=='true') && 
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={yearsOption || []} value={patientInformation?.alcoholStatus?.yearsConsumed} required error={!!error?.alcoholStatus?.yearsConsumed} name='alcoholStatus.yearsConsumed' label={t('question.yearsConsumed')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.alcoholStatus?.yearsConsumed} name={t('label.yearsConsumed')} />
                                    </div>
                                </Row>
                            }
                            {
                                (patientInformation.alcoholStatus.status=='Reformed Alcoholic' || patientInformation.alcoholStatus.status == 'Ex-Smoker') &&
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <Checkbox
                                            input={patientInformation.alcoholStatus.causeOfDrinking}
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
                <PagePane index={1}>
                    <div className="division">
                        <div className="header">    
                            <h2>Health History</h2>
                        </div>
                        <div className="content">                        
                            <div className="divider--fifty">
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={height || []} value={patientInformation?.height} required error={!!error?.height} name='height' label={t('question.height')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.height} name={t('label.height')}/>
                                    </div>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={weight || []} value={patientInformation?.weight} required error={!!error?.weight} name='weight' label={t('question.weight')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.weight} name={t('label.weight')}/>
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <Checkbox
                                            input={patientInformation.healthHistory}
                                            name="healthHistory" 
                                            label={t('question.healthHistory')}
                                            error={!!error.healthHistory}
                                            values={healthHistoryValues}
                                            required
                                            onCheck={handleChecked}
                                        />
                                        <AlertBox error={error?.healthHistory} name={t('label.healthHistory')}/>
                                    </div>
                                </Row>
                                    {/* {
                                        
                                        patientInformation.healthHistory.otherVascularCondition && 

                                        <Row>
                                            <div style={{width: 'inherit'}}>
                                                <h5>If you have selected 'Other Vascular Condition', please state the name of the condition.</h5>
                                                <TextInput value={patientInformation.healthHistory.otherVascularConditionName} required error={error?.otherVascularConditionName} name='healthHistory.otherVascularConditionName' label={t('label.otherVascularConditionName')} onChange={handleTextChange} />
                                                <AlertBox  error={error?.otherVascularConditionName} name={t('label.otherVascularConditionName')}/>
                                            </div>
                                        </Row>
                                    }
                                        {
                                        patientInformation.healthHistory.otherVascularCondition && 

                                        <Row>
                                            <div style={{width: 'inherit'}}>
                                                <h5>If you have selected 'Other Vascular Condition', please state how long you have been living with this condition.</h5>
                                                <SearchInput searchOptions={yearsOption || []} value={patientInformation.healthHistory.otherVascularConditionYears} required error={!!error?.healthHistory.otherVascularConditionYears} name='healthHistory.otherVascularConditionYears' label={t('label.otherVascularConditionYears')} onSearch={handleSearchChange} />
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
                                    (patientInformation.weight!=0 && patientInformation.height!=0) &&
                                    <Row>
                                        <div style={{display: 'flex', width: 'inherit', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                                        <h3>BMI</h3>
                                             <div className="board">
                                                
                                                <h4>{(patientInformation.weight/(patientInformation.height * patientInformation.height)).toFixed(2)}</h4>
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
                                            input={patientInformation.familyHistory}
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
                    </div>
                    
                </PagePane>
                {/* <PagePane index={2}>
                    <div className="content">
                        <div className="header">    
                            <h3>Family History</h3>
                        </div>
                    
                        <div className="divider">
                            <Row>
                                <div style={{width: 'inherit'}}>
                                    <Checkbox
                                        input={patientInformation.familyHistory}
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
                                    
                                    patientInformation.familyHistory.otherVascularCondition && 

                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <h5>If you have selected 'Other Vascular Condition', please state the name of the condition.</h5>
                                            <TextInput value={patientInformation.familyHistory?.otherVascularConditionName} required error={error?.familyHistory?.otherVascularConditionName} name='familyHistory.otherVascularConditionName' label={t('label.otherVascularConditionName')} onChange={handleTextChange} />
                                            <AlertBox  error={error?.familyHistory?.otherVascularConditionName} name={t('label.otherVascularConditionName')}/>
                                        </div>
                                    </Row>
                                }
                                {
                                    patientInformation.familyHistory.otherVascularCondition && 

                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <h5>If you have selected 'Other Vascular Condition', please state how long you have been living with this condition.</h5>
                                            <SearchInput searchOptions={yearsOption || []} value={patientInformation.familyHistory?.otherVascularConditionYears} required error={!!error?.familyHistory?.otherVascularConditionYears} name='familyHistory.otherVascularConditionYears' label={t('label.otherVascularConditionYears')} onSearch={handleSearchChange} />
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
                <PagePane index={2}>
                    <div className="division">
                        <div className="header">   
                            <h2>Lifestyle & Dietary Information</h2>
                        </div>
                        <div className="content">                        
                            <div className="divider--full">
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
                                            defaultValue={patientInformation?.lifestyleInformation?.eightHoursOfSleep}
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
                                            defaultValue={patientInformation?.lifestyleInformation?.stress || ''}
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
                                            defaultValue={patientInformation?.lifestyleInformation?.exercise || false}
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
                                            defaultValue={patientInformation?.lifestyleInformation?.smoking || false}
                                            required 
                                            error={!!error?.lifestyleInformation?.smoking} 
                                            name='lifestyleInformation.smoking' 
                                            label={t('question.smoking')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.lifestyleInformation?.smoking} name={t('label.smoking')} />
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
                                            defaultValue={patientInformation?.lifestyleInformation?.friedFood || false}
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
                                            defaultValue={patientInformation?.lifestyleInformation?.meat || false}
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
                                            defaultValue={patientInformation?.lifestyleInformation?.processedFood || false}
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
                                            defaultValue={patientInformation?.lifestyleInformation?.vegetables || false}
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
                                            defaultValue={patientInformation?.lifestyleInformation?.fruits || false}
                                            required 
                                            error={!!error?.lifestyleInformation?.fruits} 
                                            name='lifestyleInformation.fruits' 
                                            label={t('question.fruits')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.lifestyleInformation?.fruits} name={t('label.fruits')} />
                                    </div>
                                </Row>
                            {/* <Table 
                                columns = {
                                    [
                                        {
                                            colName: 'haha'
                                        },
                                        {
                                            colName: 'hehe'
                                        }
                                    ]
                                }
                                data = {
                                    [
                                        {
                                            haha: 'blahasdasdsdasdasdassa',
                                            hehe: 'ooh'
                                        },
                                        {
                                            haha: 'bah bah1111111111111 11111111111111111',
                                            hehe: '2'
                                        },
                                    ]
                                }
                            /> */}
                            </div>
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
                                pageVisibility < (maxSize-1) &&  <button className="standard" onClick={nextPage}>Next</button>
                            }
                            <button className="save" onClick={saveAndContinue}>Save and Continue</button>
                        </div>
                    </div>
                </PagePane>
                <PagePane index={3}>
                    <div className="division">
                        <div className="header">   
                            <h2>Diagnosis & Comments</h2>
                            <button className="standard" onClick={newComment}>New Comment</button>
                        </div>
                        <div className="content">                        
                            <div className="divider--full">
                                {/* <h3>{`${t('label.diagnosis')} & ${t('label.comments')}`}</h3> */}
                                {
                                    patientInformation?.comments && patientInformation?.comments.map((tempComment: any, index: any)=> {
                                        return <Row key={index}>
                                            <div style={{width: 'inherit'}}>
                                                <TextArea value={tempComment?.diagnosis} required error={!!error[`comments[${index}]`]?.diagnosis} name={`comments.diagnosis[${index}]`} label={`${t('label.diagnosis')}        Date: ${tempComment?.created}`} onChange={handleCommentChange} />
                                                <AlertBox error={error[`comments[${index}]`]?.diagnosis} name={t('label.diagnosis')} />
                                            </div>
                                            <div style={{width: 'inherit'}}>
                                                <TextArea value={tempComment?.comments} required error={!!error[`comments[${index}]`]?.comments} name={`comments.comments[${index}]`} label={t('label.comments')} onChange={handleCommentChange} />
                                                <AlertBox error={error[`comments[${index}]`]?.comments} name={t('label.comments')} />
                                            </div>
                                            <button style={{background: 'rgb(0, 0, 0, 0)', border: '0px solid grey',width: '103px', height: '46px'}} className="delete" onClick={(index) => {removeComment(index)}}><img src="/assets/images/remove.png" /></button>
                                        </Row>
                                    })
                                }
                                
                            </div>
                            {/* <div className="divider--fifty">
                                <h3>{t('label.comments')}</h3>
                                {
                                    patientInformation?.comments.map((tempComment: any, index: any)=> {
                                        return <Row index={index}>
                                           
                                            <div style={{width: 'inherit'}}>
                                                <TextArea value={tempComment?.comments} required error={error?.comments} name={`comments.comments[${index}]`} label={t('label.comments')} onChange={handleCommentChange} />
                                                <AlertBox error={error?.comments} name={t('label.comments')} />
                                            </div>
                                            <button style={{background: 'rgb(0, 0, 0, 0)', border: '0px solid grey'}} className="delete" onClick={(index) => {removeComment(index)}}><img src="/assets/images/remove.png" />Remove Comment</button>
                                        </Row>
                                    })
                                }
                                
                            </div> */}
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
                                pageVisibility < (maxSize-1) &&  <button className="standard" onClick={nextPage}>Next</button>
                            }
                            <button className="save" onClick={saveAndContinue}>Save and Continue</button>
                        </div>
                    </div>
                </PagePane>
            </Page>
            
            
        </div>
    )
}

export default PatientInformation;