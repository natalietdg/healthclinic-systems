import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './patient-information.scss';
import { Container, Page, Row, Col } from 'Components/shared';
import PagePane from 'Components/shared/page/page-pane'
import { TextInput, AlertBox, RadioInput, SelectInput, Checkbox, AddressInput } from 'Components/shared';
import { PatientInformationFormValidation } from './patient-information.validation';
import addressInput from 'Components/shared/address-input';


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
            heartAttack: false,
            stroke: true,
            elevatedCholesterol: false,
            elevatedTriglycerides: true,
            diabetes: true,
            hypertension: false,
            otherVascularCondition: true,
            otherVascularConditionName: '',
            otherVascularConditionYears: ''
        }
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

    const prevPage = () => {
        if (pageVisibility > 0) {
            setPageVisibility(pageVisibility - 1);
        }
    }

    const handleChange = (name: string, value: string) => {
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
                <h2>Add a New Patient</h2>
                <Page visibility= {pageVisibility} numOfChildren={setMaxSize}>
                    <PagePane index={0}>
                        <div className="divider">
                            <h3>Demographic Information</h3>
                            <Row>
                                <div>
                                    <TextInput value={patientInformation.fullName} required error={error?.fullName} name='fullName' label={t('label.fullName')} onChange={handleChange} />
                                    <AlertBox error={error?.fullName} name={t('label.fullName')} />
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
                                        onChange={handleChange} 
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
                            </Row>
                            <Row>
                                <AddressInput 
                                    addressInput={patientInformation.address}
                                    error={!!error.address}
                                    onChange={handleAddressChange}
                                />
                            </Row>
                        </div>
                        <div className="divider">
                            <Row>
                                <SelectInput 
                                    required
                                    error={error?.fullName}
                                    name="educationLevel"
                                    label={t('label.fullName')}
                                    selectOptions={[]}
                                    onSelect={handleSelectChange}
                                />
                                <AlertBox error={error?.fullName} name={t('label.fullName')}/>
                            </Row>
                            <Row>
                                <Checkbox
                                    name="healthHistory" 
                                    label="Health History"
                                    error={!!error.healthHistory}
                                    values={healthHistoryValues}
                                    required
                                    onCheck={handleChecked}
                                />
                            
                                <SelectInput 
                                    required
                                    error={error?.fullName}
                                    label={t('label.fullName')}
                                    selectOptions={[]}
                                    onSelect={handleSelectChange}
                                />
                                <AlertBox  error={error?.fullName} name={t('label.fullName')}/>
                            </Row>
                        </div>
                    </PagePane>
                    <PagePane index={1}>
                    </PagePane>
                </Page>
               <Row> 
                    <button onClick={prevPage}>Prev</button>
                    <button onClick={nextPage}>Next</button>
                </Row>
                
            </div>
        </div>
    )
}

export default PatientInformation;