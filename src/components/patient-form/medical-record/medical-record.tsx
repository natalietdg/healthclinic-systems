import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './medical-record.scss';
import { healthHistoryValuesFunction, cigarettesPerDayValuesFunction, BMIStatus, nicotineAmtValuesFunction, heightFunction, weightFunction, yearFunction, lastHundredYearsFunction, alcoholTypesValuesFunction, averageAlcoholConsumptionValuesFunction } from 'Data/patientInformationValues';
import { Page, Row, AlertBox, TextInput, TextArea, SearchInput, Checkbox } from 'Components/shared';
import PagePane from 'Components/shared/page/page-pane';

interface MedicalRecordProps {

}

const MedicalRecord:React.FC<MedicalRecordProps> = ()=> {
    let history = useHistory();
    const { t } = useTranslation();
    const height: any = heightFunction();
    const weight: any = weightFunction();
    const healthHistoryValues: any = healthHistoryValuesFunction();
    const defaultMedicalInformation = {
        patientID: -1,
        reasonForConsultation: "",
        healthHistory: {
            heartAttack: false,
            highCholesterol: false,
            diabetes: false,
            hypertension:  false,
        },
        familyHistory: {
            heartAttack: false,
            highCholesterol: false,
            diabetes: false,
            hypertension: false,
        },
        lifestyleInformation: {
            eightHoursOfSleep: false,
            stress: false,
            meat: false,
            exercise: false,
            fruits: false,
            friedFood: false,
            processedFood: false,
            vegetables: false,
            smoking: false,
            overweight: false,
        },
    };

    const [pageVisibility, setPageVisibility ] = useState(0);
    const [error, setError ] = useState<any>({});
    const [ patientMedicalInformation, setPatientMedicalInformation ] = useState<any>(defaultMedicalInformation);
    const [ weightStatus, setWeightStatus ] = useState('');
    const [maxSize, setMaxSize] = useState(0);

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

    const handleTextChange = (name: string, value: any) => {
        setError({});
        if(name.indexOf('.')!==-1) {
            let subName = name.split('.')[1]
            name = name.split('.')[0];

            setPatientMedicalInformation({...patientMedicalInformation, [name]: {
                ...patientMedicalInformation[name],
                [subName]: value
            }});

            return;
        }
        setPatientMedicalInformation({...patientMedicalInformation, [name]: value });
    }

    const handleChecked = (name: string, subName: string, value: any) => {
        setError({});
        setPatientMedicalInformation({
            ...patientMedicalInformation, 
            [name]: {
                ...patientMedicalInformation[name],
                [subName]: value,
            }}
        );
    }

    const handleSearchChange = (name: string, value: any) => {
        setError({});
        value = parseFloat(value) ? parseFloat(value): value;
  
        if (name.indexOf('.')!==-1) {
            let subName = name.split('.')[1];
            name = name.split('.')[0];
         
            setPatientMedicalInformation({...patientMedicalInformation, [name]: {
                ...patientMedicalInformation[name],
                [subName]: value
            }});
            return;
        }
        
        setPatientMedicalInformation({...patientMedicalInformation, [name]: value });
    }

    const handleSelectRadio = (name: string, value: any) => {
        value = (value=='true' || value=='false')? (value==='true'): value;
     
        if(name.indexOf('.')!==-1) {
            let subName = name.split('.')[1]
        
            name = name.split('.')[0];
            setPatientMedicalInformation({...patientMedicalInformation, [name]: {
                ...patientMedicalInformation[name],
                [subName]: value
            }});

            return;
        }
        setPatientMedicalInformation({...patientMedicalInformation, [name]: value});
        setError({});
    }
    return (
        <div className="medical-record">
            <div className="content">
                <Page visibility = {pageVisibility} numOfChildren={setMaxSize}>
                {patientMedicalInformation.patientID !== -1 && 
                <PagePane index={1}>
                    <div className="division">
                        <div className="header">    
                            <h2>Health History</h2>
                        </div>
                        <div className="content">                        
                            <div className="divider--fifty">
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={height || []} value={patientMedicalInformation?.height} required error={!!error?.height} name='height' label={t('question.height')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.height} name={t('label.height')}/>
                                    </div>
                                    <div style={{width: 'inherit'}}>
                                        <SearchInput searchOptions={weight || []} value={patientMedicalInformation?.weight} required error={!!error?.weight} name='weight' label={t('question.weight')} onSearch={handleSearchChange} />
                                        <AlertBox error={error?.weight} name={t('label.weight')}/>
                                    </div>
                                </Row>
                                <Row>
                                    <div style={{width: 'inherit'}}>
                                        <Checkbox
                                            input={patientMedicalInformation.healthHistory}
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
                                    (weightStatus) &&
                                    <Row>
                                        <div style={{display: 'flex', width: 'inherit', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                                        <h3>BMI</h3>
                                             <div className="board">
                                                
                                                <h4>{(patientMedicalInformation.weight/(patientMedicalInformation.height * patientMedicalInformation.height)).toFixed(2)}</h4>
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
                                            input={patientMedicalInformation.familyHistory}
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
                        <div style={{width: '100%', display: 'flex'}}> 
                            <div style={{ justifyContent: 'flex-start', float: 'right', width: '100%', alignSelf: 'flex-start', display: 'flex'}}>
                                {
                                    pageVisibility > 0 && <button className="standard" onClick={prevPage}>Prev</button>
                                }  
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end'}}>
                                {
                                    pageVisibility < (maxSize - 1 ) &&  <button className="standard" onClick={nextPage}>Next</button>
                                }
                                    <button className="save" onClick={saveAndContinue}>Save and Continue</button>
                            </div>
                        </div>
                    </div>
                    
                </PagePane>
                }
                </Page>
            </div>
        </div>
    )
}

export default MedicalRecord;