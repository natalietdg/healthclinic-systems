import React, { useState, useEffect } from 'react';
import {isEmpty} from 'lodash';
import moment from 'moment';
import LoadingPage from 'Pages/loading-page/loading-page';
import { useTranslation } from 'react-i18next';
import { styles } from 'Components/shared/animation';
import { Container, Row } from 'Components/shared';
import Patient from 'Components/patient-form';
import Radium from 'radium';
import './display-report.scss';

interface DisplayReportProps {
    patientData: any;
    edit?: boolean;
}
const DisplayReport: React.FC<DisplayReportProps> = ({patientData, edit=false}) => {
    const { t } = useTranslation();
    const [ patient, setPatient] = useState<any>({});   
    const yearAge = (new Date().getFullYear())-(new Date(patientData?.dateOfBirth).getFullYear());
    const monthAge = ((new Date(patientData?.dateOfBirth)).getMonth() > (new Date().getMonth())? (new Date(patientData?.dateOfBirth)).getMonth()+12 - (new Date().getMonth()):
    (new Date().getMonth())-(new Date(patientData?.dateOfBirth)).getMonth());

    useEffect(()=> {
        console.log('patientData', patientData);
        setPatient(patientData);
    },[patientData])

    return(
        <div className="display-report">
            {
                patient?.obesityPredictionReports ?
                <Radium.StyleRoot style={{width: '88%',  display: 'flex'}}>
                    <Container flexDirection='column' alignItems='flex-start' style={{...styles.fadeIn}}>
                        <h2 className="name">{patient?.fullName}</h2>
                        <h3 className="title">Personal Information</h3>
                        <span className="span">
                            <h4 className="span--title">Age</h4>
                            <h4 className='span--text'> {new Date(patient?.dateOfBirth).toLocaleDateString([], {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })} ({yearAge} years {monthAge > 0? monthAge.toString() + ' months': ''})</h4>
                        </span>
                        {/* <h4>Age: {new Date(patientData?.dateOfBirth).toLocaleDateString([], {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })} {yearAge} years {monthAge > 0? monthAge.toString() + ' months': ''}
                        </h4> */}
                    <span className="span">
                            <h4 className="span--title">IC</h4>
                            <h4 className='span--text'>{patient?.ic}</h4>
                        </span>
                        <span className="span">
                            <h4 className="span--title">Phone Number</h4>
                            <h4 className='span--text'>{patient?.phoneNumber}</h4>
                        </span>
                        <span className="span">
                            <h4 className="span--title">Email</h4>
                            <h4 className='span--text'>{patient?.email}</h4>
                        </span>
                        <span className="span">
                            <h4 className="span--title">Date of Birth</h4>
                            <h4 className='span--text'>{patient?.dateOfBirth}</h4>
                        </span>
                        <span className="span">
                            <h4 className="span--title">Race</h4>
                            <h4 className='span--text'>{patient?.race && t(`label.${patient?.race.toLowerCase()}`)}</h4>
                        </span>
                        <span className="span">
                            <h4 className="span--title">Gender</h4>
                            <h4 className='span--text'>{patient?.gender && t(`label.${patient?.gender.toLowerCase()}`)}</h4>
                        </span>
                        <div>
                            <h3 className="title">Obesity and Comorbidities Prediction</h3>
                            {
                                patient?.obesityPredictionReports && patient?.obesityPredictionReports.map((report: any) => {
                                return <Patient.MLPredictionReport key={report.id} data={report} patient={true}/>
                                })
                                
                            }
                        </div>
                        <div style={{width: '80%'}}>
                            <h3 style={{width: '25%'}} className="name">Diagnosis & Comments</h3>
                            {
                                patient?.comments && patient?.comments.map((comment: any, index: any) => {
                                    return <>
                                    <Row key={index} style={{justifyContent: 'flex-start'}}>
                                        <span className="span">
                                            <h4 className="span--title">
                                                {
                                                    new Date(comment?.created).toLocaleDateString([], {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                    })} - {comment?.diagnosis
                                                }
                                            </h4>
                                            
                                            <h4 className="span--text">{comment?.comment}</h4>
                                        </span>
                                    </Row>
                                
                            </>
                                })
                            }
                        </div>
                        
                        
                    </Container> 
                </Radium.StyleRoot>:<LoadingPage />                                                                                                                                                                                                                                                                                                                                                                     
           }
        </div>     

    )   
 }
                
  export default  DisplayReport;                                                       