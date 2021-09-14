import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './patient-information.scss';
import { Container, Page, Row, Col } from 'Components/shared';
import errorHandler from 'Utils/error-handler';
import { omitBy, isEmpty, isUndefined } from 'lodash';
import PagePane from 'Components/shared/page/page-pane'
import { TextInput, AlertBox, RadioInput, SelectInput, Checkbox, AddressInput } from 'Components/shared';
import { PatientInformationFormValidation } from './patient-information.validation';

interface PatientInformationProps {

}

const PatientInformation:React.FC<PatientInformationProps> = ()=> {
    const [ pageVisibility, setPageVisibility ] = useState(0);
    const [maxSize, setMaxSize] = useState(0);
    
    const [ patientInformation, setPatientInformation ] = useState<any>({
        fullName: '',
        gender: 'male',
        race: 'chinese',
        educationLevel: 'bachelors',
        address: {
            street1: '',
            street2: '',
            postcode: '',
            country: '',
            city: '',
            state: ''
        },
        healthHistory: {
            heartDisease: true,
            heartAttack: true,
            stroke: true,
            elevatedCholesterol: true,
            elevatedTriglycerides: true,
            diabetes: true,
            hypertension: false,
            sleepingDisorder: true,
            otherVascularCondition: false,
            otherVascularConditionName: '',
            otherVascularConditionYears: ''
        },
        familyHistory: {
            heartDisease: false,
            heartAttack: false,
            stroke: true,
            elevatedCholesterol: false,
            elevatedTriglycerides: true,
            diabetes: true,
            hypertension: false,
            sleepingDisorder: true,
            otherVascularCondition: true,
            otherVascularConditionName: '',
            otherVascularConditionYears: ''
        },
        reasonForConsultation: ""
    });

    useEffect(()=> {
        console.log('patientInformation.address',patientInformation.address);
    },[patientInformation]);

    const [ error, setError ] = useState<any>({});
    const { t } = useTranslation();
    const healthHistoryValues = [
        {
            name:'heartDisease',
            value: 'heartDisease',
            label: t('label.heartDisease')
        },
        {
            name:'heartAttack',
            value: 'heartAttack',
            label: t('label.heartAttack')
        },
        {
            name:'stroke',
            value: 'stroke',
            label: t('label.stroke')
        },
        {
            name:'elevatedCholesterol',
            value: 'elevatedCholesterol',
            label: t('label.elevatedCholesterol')
        },
        {
            name:'elevatedTriglycerides',
            value: 'elevatedTriglycerides',
            label: t('label.elevatedTriglycerides')
        },
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
        {
            name:'sleepingDisorder',
            value: 'sleepingDisorder',
            label: t('label.sleepingDisorder')
        },
        {
            name:'otherVascularCondition',
            value: 'otherVascularCondition',
            label: t('label.otherVascularCondition')
        },
    ]

    const nextPage = () => {
        if (pageVisibility < maxSize - 1) {
            setPageVisibility(pageVisibility + 1);
        }
    }

    const saveAndContinue = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try{
           
            const value = PatientInformationFormValidation.validateSync(omitBy({
                ...patientInformation}, (value)=> isEmpty(value) || value==='' || isUndefined(value)), {
                strict: true,
                abortEarly: true,
                stripUnknown: false
            });
            
            console.log('value', value);

        }
        catch(err) {
            let { path, value }:any = errorHandler.validation(err);
            console.log('err', err);
            console.log('path', path);

            if (path.indexOf('.')!==-1) {
                const str = path.split('.');
                path = str[0];
                console.log('path2', path);
            }

            setError({...error, [path]: t(`${value}`, { field: t(`label.${path}`)}) });

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
    useEffect(()=> {
        console.log('patientInformation.healthHistory', patientInformation.healthHistory);
    },[patientInformation])
    const handleTextChange = (name: string, value: string) => {
        
        if(name.indexOf('.')!==0) {
            name = name.split('.')[0];
            let subName = name.split('.')[1]

            setPatientInformation({...patientInformation, [name]: {
                [subName]: value
            }});

            return;
        }
        setPatientInformation({...patientInformation, [name]: value});
        setError({});
    }

    const handleSelectRadio = (name: string, value: string) => {
        setPatientInformation({...patientInformation, [name]: value});
        setError({});
    }

    const handleChecked = (name: string, subName: string, value: string) => {
        setPatientInformation({...patientInformation, [name]: {
            [subName]: value
        }});

        setError({});
    }

    const handleSelectChange = (name: string, value: string) => {
        setPatientInformation({...patientInformation, [name]: value})
        setError({});
    }

    const handleAddressChange = (name: string, value: string) => {
        setPatientInformation({...patientInformation, address: {
                [name]: value
            }
        });
    }

    return (
        <div>
            <div className="patient-info">
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '27%',  alignContent: 'center', alignItems: 'center'}}>   
                    <h2>New Patient</h2>
                </div>
                <Page visibility= {pageVisibility} numOfChildren={setMaxSize}>
                    <PagePane index={0}>
                        
                        <div className="content">
                            <div className="header">   
                                <h3>Personal Information</h3>
                            </div>
                            
                            <div className="divider">
                                <Row>
                                    <div>
                                        <TextInput value={patientInformation.fullName} required error={error?.fullName} name='fullName' label={t('label.fullName')} onChange={handleTextChange} />
                                        <AlertBox error={error?.fullName} name={t('label.fullName')} />
                                    </div>
                                </Row>
                                <Row>
                                    <div>
                                        <TextInput value={patientInformation.reasonForConsultation} required error={error?.reasonForConsultation} name='reasonForConsultation' label={t('label.reasonForConsultation')} onChange={handleTextChange} />
                                        <AlertBox error={error?.reasonForConsultation} name={t('label.reasonForConsultation')} />
                                    </div>
                                </Row>
                                <Row>
                                    <Col>
                                        <RadioInput values={[
                                            {
                                                name: 'chinese',
                                                label: t('label.chinese'),
                                                value: 'chinese'
                                            },
                                            {
                                                name: 'malay',
                                                label: t('label.malay'),
                                                value: 'malay'
                                            },
                                            {
                                                name: 'indian',
                                                label: t('label.indian'),
                                                value: 'indian'
                                            }
                                        ]} 
                                            required 
                                            error={error?.race} 
                                            name='race' 
                                            label={t('label.race')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.race} name={t('label.race')} />
                                    </Col>
                                    <Col>
                                        <RadioInput 
                                            multiple={false}
                                            values={[
                                                {
                                                    name: 'male',
                                                    label: t('label.male'),
                                                    value: 'male'
                                                },
                                                {
                                                    name: 'female',
                                                    label: t('label.female'),
                                                    value: 'female'
                                                }
                                            ]} 
                                            required 
                                            error={error?.gender} 
                                            name='gender' 
                                            label={t('label.gender')} 
                                            onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.race} name={t('label.race')} />
                                    </Col>
                                </Row>
                                <Row>
                                    <div>
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
                                </Row>
                                <Row>
                                    <AddressInput 
                                        addressInput={patientInformation.address}
                                        error={!!error.address}
                                        onChange={handleAddressChange}
                                    />
                                </Row>
                            </div>
                           
                        </div>
                       
                        <div className="content">
                            <div className="header">    
                                <h3>Health History</h3>
                           </div>
                        
                            <div className="divider">
                                <Row>
                                    <div>
                                        <Checkbox
                                            input={patientInformation.healthHistory}
                                            name="healthHistory" 
                                            label="Health History"
                                            error={!!error.healthHistory}
                                            values={healthHistoryValues}
                                            required
                                            onCheck={handleChecked}
                                        />
                                        <AlertBox error={error?.healthHistory} name={t('label.healthHistory')}/>
                                    </div>
                                </Row>
                                    {
                                        
                                        patientInformation.healthHistory.otherVascularCondition && 

                                        <Row>
                                            <div>
                                                <h5>If you have selected 'Other Vascular Condition', please state the name of the condition.</h5>
                                                <TextInput value={patientInformation.healthHistory.otherVascularConditionName} required error={error?.otherVascularConditionName} name='healthHistory.otherVascularConditionName' label={t('label.otherVascularConditionName')} onChange={handleTextChange} />
                                                <AlertBox  error={error?.otherVascularConditionName} name={t('label.otherVascularConditionName')}/>
                                            </div>
                                        </Row>
                                    }
                                     {
                                        patientInformation.healthHistory.otherVascularCondition && 

                                        <Row>
                                            <div>
                                                <h5>If you have selected 'Other Vascular Condition', please state how long you have been living with this condition.</h5>
                                                <TextInput value={patientInformation.otherVascularConditionYears} required error={error?.otherVascularConditionYears} name='healthHistory.otherVascularConditionYears' label={t('label.otherVascularConditionYears')} onChange={handleTextChange} />
                                                <AlertBox  error={error?.otherVascularConditionYears} name={t('label.otherVascularConditionYears')}/>
                                            </div>
                                        </Row>
                                    }
                            </div>
                        </div>
                        <div className="content">
                            <div className="header">    
                                <h3>Family History</h3>
                           </div>
                        
                            <div className="divider">
                                <Row>
                                    <div>
                                        <Checkbox
                                            input={patientInformation.familyHistory}
                                            name="familyHistory" 
                                            label="Family History"
                                            error={!!error.familyHistory}
                                            values={healthHistoryValues}
                                            required
                                            onCheck={handleChecked}
                                        />
                                        <AlertBox error={error?.familyHistory} name={t('label.familyHistory')}/>
                                    </div>
                                </Row>
                                    {
                                        
                                        patientInformation.familyHistory.otherVascularCondition && 

                                        <Row>
                                            <div>
                                                <h5>If you have selected 'Other Vascular Condition', please state the name of the condition.</h5>
                                                <TextInput value={patientInformation.familyHistory.otherVascularConditionName} required error={error?.otherVascularConditionName} name='healthHistory.otherVascularConditionName' label={t('label.otherVascularConditionName')} onChange={handleTextChange} />
                                                <AlertBox  error={error?.otherVascularConditionName} name={t('label.otherVascularConditionName')}/>
                                            </div>
                                        </Row>
                                    }
                                     {
                                        patientInformation.familyHistory.otherVascularCondition && 

                                        <Row>
                                            <div>
                                                <h5>If you have selected 'Other Vascular Condition', please state how long you have been living with this condition.</h5>
                                                <TextInput value={patientInformation.otherVascularConditionYears} required error={error?.otherVascularConditionYears} name='healthHistory.otherVascularConditionYears' label={t('label.otherVascularConditionYears')} onChange={handleTextChange} />
                                                <AlertBox  error={error?.otherVascularConditionYears} name={t('label.otherVascularConditionYears')}/>
                                            </div>
                                        </Row>
                                    }
                            </div>
                        </div>
                        <div style={{width: '80%', display: 'flex'}}> 
                            <div style={{ justifyContent: 'flex-end', float: 'right', width: '43%', alignSelf: 'flex-start', display: 'flex'}}>
                                    <button className="standard" onClick={prevPage}>Prev</button>
                                   
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'flex-end'}}>
                                    <button className="standard" onClick={nextPage}>Next</button>
                                    <button className="save" onClick={saveAndContinue}>Save and Continue</button>
                            </div>
                        </div>
                    </PagePane>
                    <PagePane index={1}>
                    </PagePane>
                </Page>
               
                
            </div>
        </div>
    )
}

export default PatientInformation;