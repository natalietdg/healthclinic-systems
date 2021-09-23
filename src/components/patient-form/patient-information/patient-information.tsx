import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { PatientInformationType, patientInformationAtom } from 'Recoil/patient.atom';
import './patient-information.scss';
import { healthHistoryValues, cigarettesPerDayValues, nicotineAmtValues } from 'Data/patientInformationValues';
import { Container, Page, Row, Col, ImageUpload } from 'Components/shared';
import errorHandler from 'Utils/error-handler';
import { omitBy, isEmpty, isUndefined } from 'lodash';
import moment from 'moment';
import PagePane from 'Components/shared/page/page-pane'
import { TextInput, AlertBox, RadioInput, SelectInput, Checkbox, AddressInput, DateInput, SearchInput } from 'Components/shared';
import { PatientInformationFormValidation } from './patient-information.validation';

interface PatientInformationProps {
    onSubmit: (data: any) => void;
}

const PatientInformation:React.FC<PatientInformationProps> = ({onSubmit})=> {
    const [ pageVisibility, setPageVisibility ] = useState(0);
    const [maxSize, setMaxSize] = useState(0);
    var lastHundredYears = [];
    for(let x = 0; x<= 100; x++) {
        var date = new Date();
        lastHundredYears.push((date.getFullYear()-x).toString());
    }

    var yearsOption = [];
    for(let x = 1; x<=100; x++) {
        yearsOption.push(x.toString());   
    }

    const [ patientInformation, setPatientInformation ] = useRecoilState<PatientInformationType>(patientInformationAtom);

    useEffect(()=> {
        console.log('patientInformation',patientInformation);
    },[patientInformation]);

    const [ error, setError ] = useState<any>({});

    useEffect(()=> {
        console.log('error pt',error);
    },[error]);

    const { t } = useTranslation();

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
            console.log('err1', err);
            let { path, value }:any = errorHandler.validation(err);
            console.log('err', err);
            console.log('path', path);

            if (path.indexOf('.')!==-1) {
                const str = path.split('.');
                path = str[0];
                let subPath = str[1];
                console.log('path2', path);
                setError({...error, [path]: {[subPath]: t(`${value}`, { field: t(`label.${path}`)})} });

                return;

            }
            else {
                setError({...error, [path]: t(`${value}`, { field: t(`label.${path}`)}) });
            }
            console.log('path', path);

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

    const handleSearchChange = (name: string, value: any) => {
        setError({});
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
        // console.log('name', name);
        // console.log('value', value);
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

    const handleImageChange = (name: string, url: string) => {
        setPatientInformation({
            ...patientInformation, [name]: url
        })
    }

    return (
        <div>
            <div className="patient-info">
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '27%',  alignContent: 'center', alignItems: 'center'}}>   
                    <h2>New Patient</h2>
                </div>
                <Page visibility= {pageVisibility} numOfChildren={setMaxSize}>
                    <PagePane index={1}>
                        
                        <div className="content">
                            <div className="header">   
                                <h3>Personal Information</h3>
                            </div>
                            
                            <div className="divider">
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <TextInput value={patientInformation?.fullName} required error={!!error?.fullName} name='fullName' label={t('label.fullName')} onChange={handleTextChange} />
                                        <AlertBox error={error?.fullName} name={t('label.fullName')} />
                                    </div>
                                    <div style={{width: 'inherit'}}>
                                        <TextInput value={patientInformation?.ic} required error={!!error?.ic} name='ic' label={t('label.ic')} onChange={handleTextChange} />
                                        <AlertBox error={error?.ic} name={t('label.ic')} />
                                    </div>
                                </Row>
                                <Row>
                                <div style={{width: 'inherit'}}>
                                        <DateInput value={patientInformation?.dateOfBirth} required error={!!error?.dateOfBirth} name='dateOfBirth' label={t('label.dateOfBirth')} onChange={handleTextChange} />
                                        <AlertBox error={error?.dateOfBirth} name={t('label.dateOfBirth')} />
                                    </div>
                                </Row>
                                <Row>
                                    <Col style={{width: 'inherit'}}>
                                        <RadioInput values={[
                                            {
                                                name: 'chinese',
                                                label: t('option.chinese'),
                                                value: 'chinese'
                                            },
                                            {
                                                name: 'malay',
                                                label: t('option.malay'),
                                                value: 'malay'
                                            },
                                            {
                                                name: 'indian',
                                                label: t('option.indian'),
                                                value: 'indian'
                                            }
                                        ]} 
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
                                                    value: 'male'
                                                },
                                                {
                                                    name: 'female',
                                                    label: t('option.female'),
                                                    value: 'female'
                                                }
                                            ]} 
                                            defaultValue={patientInformation.gender}
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
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <AddressInput 
                                            addressInput={patientInformation.address}
                                            error={error.address}
                                            onChange={handleAddressChange}
                                        />  
                                    </div>
                                </Row>
                            </div>
                            <div className="divider">
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <ImageUpload onChangeImg={handleImageChange} name="profilePic" baseUrl={patientInformation.profilePic}/>
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <TextInput value={patientInformation.reasonForConsultation} required error={error?.reasonForConsultation} name='reasonForConsultation' label={t('label.reasonForConsultation')} onChange={handleTextChange} />
                                        <AlertBox error={error?.reasonForConsultation} name={t('label.reasonForConsultation')} />
                                    </div>
                                </Row>
                            </div>
                           
                        </div>
                       
                        <div className="content">
                            <div className="header">    
                                <h3>Health History</h3>
                           </div>
                        
                            <div className="divider">
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
                                    {
                                        
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
                                    }
                            </div>
                            <div className="divider">
                            </div>
                        </div>
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
                                    {
                                        
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
                    </PagePane>
                    <PagePane index={0}>
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
                                            <AlertBox error={error?.smokingStatus?.startedSmokingAged} name={t('label.yearsSmoked')} />
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
                                            <AlertBox error={error?.smokingStatus.startedSmokingAged} name={t('label.yearsSmoked')} />
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
                                                   value: true
                                               },
                                               {
                                                   name: 'no',
                                                   label: t('option.no'),
                                                   value: false
                                               },
                                               {
                                                   name: 'reformedAlcoholic',
                                                   label: t('option.reformedAlcoholic'),
                                                   value: 'Reformed Alcoholic'
                                               }
                                           ]} 
                                           defaultValue={patientInformation.eCigaretteStatus.status}
                                           required 
                                           error={error?.eCigaretteStatus?.status} 
                                           name='eCigaretteStatus.status' 
                                           label={t('question.alcoholStatus')} 
                                           onSelect={handleSelectRadio} 
                                        />
                                        <AlertBox error={error?.alcoholStatus?.status} name={t('label.alcoholStatus')} />
                                    </Row>
                                    {   patientInformation.alcoholStatus.status != 'false' &&
                                        <Row>
                                            <div style={{width: 'inherit'}}>
                                                <SelectInput 
                                                    name="alcoholStatus.alcoholType"
                                                    label={t('label.alcoholType')}
                                                    required
                                                    value={patientInformation?.alcoholStatus?.alcoholType}
                                                    error={!!error?.alcoholStatus?.alcoholType}
                                                    selectOptions={cigarettesPerDayValues}
                                                    onSelect={handleSelectChange}
                                                />
                                                <AlertBox error={error?.smokingStatus?.cigarettesPerDay} name={t('label.educationLevel')} />
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
                    </PagePane>
                    <PagePane index={2}>
                    <div className="content">
                            <div className="header">   
                                <h3>blah blah</h3>
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
                                    pageVisibility < (maxSize-1) &&  <button className="standard" onClick={nextPage}>Next</button>
                                }
                                <button className="save" onClick={saveAndContinue}>Save and Continue</button>
                            </div>
                        </div>
                    </PagePane>
                </Page>
               
                
            </div>
        </div>
    )
}

export default PatientInformation;