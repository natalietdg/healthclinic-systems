import React, { useState, useEffect } from 'react';
import {isEmpty} from 'lodash';
import moment from 'moment';
import { Container, Row } from 'Components/shared';
import './display-report.scss';

interface DisplayReportProps {
    patientData: any;
    edit?: boolean;
}
const DisplayReport: React.FC<DisplayReportProps> = ({patientData, edit=false}) => {

    const [ patient, setPatient] = useState<any>({});   
    const yearAge = (new Date().getFullYear())-(new Date(patientData?.dateOfBirth).getFullYear());
    const monthAge = ((new Date(patientData?.dateOfBirth)).getMonth() > (new Date().getMonth())? (new Date(patientData?.dateOfBirth)).getMonth()+12 - (new Date().getMonth()):
    (new Date().getMonth())-(new Date(patientData?.dateOfBirth)).getMonth());

    useEffect(()=> {
        setPatient(patientData);
    },[patientData])

    return(
        <div className="display-report">
            <Container flexDirection='column' alignItems='flex-start'>
                <h2 className="name">Medical Report</h2>
               
                <h4>Full Name: {patientData?.fullName}</h4>
                <h4>Age: {new Date(patientData?.dateOfBirth).toLocaleDateString([], {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })} {yearAge} years {monthAge > 0? monthAge.toString() + ' months': ''}
                </h4>
               
                <h4>IC: {patientData?.ic}</h4>
               
                <div style={{width: '80%'}}>
                    <h3 style={{width: '25%'}} className="name">Diagnosis & Comments</h3>
                    {
                        patientData?.comments && patientData?.comments.map((comment: any, index: any) => {
                            return <>
                            <Row key={index}>
                                <div style={{width: 'inherit'}}>
                                    <h3>{new Date(comment?.created).toLocaleDateString([], {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })} - {comment?.diagnosis}</h3>
                                    <p>{comment?.comment}</p>
                                </div>
                            </Row>
                        
                    </>
                        })
                    }
                </div>
                
                <div style={{width: '80%'}}>
                    <h3 style={{width: '25%'}} className="name">Health History</h3>
                   {!isEmpty(patientData?.healthHistory)?patientData?.healthHistory: ''}
                </div>
                <div style={{width: '80%'}}>
                    <h3 style={{width: '25%'}} className="name">Family History</h3>
                   {!isEmpty(patientData?.familyHistory)?patientData?.familyHistory: ''}
                </div>
            </Container>                                                                                                                                                                                                                                                                                                                                                                          
          
        </div>                  
    )   
 }
                
  export default  DisplayReport;                                                       