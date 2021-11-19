import React, { useState, useEffect } from 'react';
import { Modal } from 'Components/shared';
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
    const [ obesityPredictionReportModal, setObesityPredictionReportModal ] = useState<boolean>(false);
    const [ obesityPredictionReport, setObesityPredictionReport ] = useState<any>({});
    const yearAge = (new Date().getFullYear())-(new Date(patientData?.dateOfBirth).getFullYear());
    const monthAge = ((new Date(patientData?.dateOfBirth)).getMonth() > (new Date().getMonth())? (new Date(patientData?.dateOfBirth)).getMonth()+12 - (new Date().getMonth()):
    (new Date().getMonth())-(new Date(patientData?.dateOfBirth)).getMonth());

    useEffect(()=> {
        setPatient(patientData);
    },[patientData])

    const openObesityPredictionReportModal = (e: any) => {
        const index = parseInt(e?.target?.id);
        setObesityPredictionReportModal(true);
        setObesityPredictionReport(patient?.obesityPredictionReports[index]);

    }

    return(
        <div className="display-report">
            {
                patient?.obesityPredictionReports ?
                <Radium.StyleRoot style={{width: '88%',  display: 'flex'}}>
                    <Container flexDirection='column' alignItems='flex-start' style={{...styles.fadeIn}}>
                        <Modal visible={obesityPredictionReportModal} onClose={() => {setObesityPredictionReportModal(false)}}>
                            <Patient.MLPredictionReport key={obesityPredictionReport?.id} data={obesityPredictionReport} patient={true}/>
                        </Modal>
                        <h1 className="name">{patient?.fullName}</h1>
                        <h3>Report Number: {patient.reportID}</h3>
                        <h2 className="title">Personal Information</h2>
                        <span className="span">
                            <h3 className="span--title">Age</h3>
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
                            <h3 className="span--title">IC</h3>
                            <h4 className='span--text'>{patient?.ic}</h4>
                        </span>
                        <span className="span">
                            <h3 className="span--title">Phone Number</h3>
                            <h4 className='span--text'>{patient?.phoneNumber}</h4>
                        </span>
                        <span className="span">
                            <h3 className="span--title">Email</h3>
                            <h4 className='span--text'>{patient?.email}</h4>
                        </span>
                        <span className="span">
                            <h3 className="span--title">Date of Birth</h3>
                            <h4 className='span--text'>{patient?.dateOfBirth}</h4>
                        </span>
                        <span className="span">
                            <h3 className="span--title">Race</h3>
                            <h4 className='span--text'>{patient?.race && t(`label.${patient?.race.toLowerCase()}`)}</h4>
                        </span>
                        <span className="span">
                            <h3 className="span--title">Gender</h3>
                            <h4 className='span--text'>{patient?.gender && t(`label.${patient?.gender.toLowerCase()}`)}</h4>
                        </span>
                        <div>
                            <h2 className="title">Obesity and Comorbidities Prediction</h2>
                            {
                                patient?.obesityPredictionReports && patient?.obesityPredictionReports.map((report: any, index: number) => {
                                // return <Patient.MLPredictionReport key={report.id} data={report} patient={true}/>
                                return (
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                                <h3 className="span--title">{new Date(report?.created).toLocaleDateString([], {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}</h3>
                                                <button id={index.toString()} onClick={(e: any) => {openObesityPredictionReportModal(e)}} className="button"> 
                                                    <p id={index.toString()} onClick={(e: any) => {openObesityPredictionReportModal(e)}}><img id={index.toString()} onClick={(e: any) => {openObesityPredictionReportModal(e)}} className="img" src="/assets/images/view.png"/>View Full Report</p>
                                                </button>
                                            </div>
                                        </div>
                                    </Row>
                                )
                                })
                                
                            }
                        </div>
                        <div style={{width: '80%'}}>
                            <h2 style={{width: '100%'}} className="title">Diagnosis & Comments</h2>
                            {
                                patient?.comments && patient?.comments.map((comment: any, index: any) => {
                                    return <>
                                    <Row key={index} style={{justifyContent: 'flex-start'}}>
                                        <span className="span">
                                            <h3 className="span--title">
                                                {
                                                    new Date(comment?.created).toLocaleDateString([], {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                    })} - {comment?.diagnosis
                                                }
                                            </h3>
                                            
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