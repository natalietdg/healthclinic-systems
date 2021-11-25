import React, { useState, useEffect } from 'react';
import PatientDatabse from 'Components/patient-database';
import {Helmet} from 'react-helmet';
import  { fetchPatientList } from 'Services/patient.services';
import { fetchBackground } from 'Services/background.services';

import './patient-database.scss';
const PatientDatabase = () => {
    const [ bg, setBg ] = useState({});
    const [patientList, setPatientList] = useState([]);
    const getBackground = async() => {
        const response = await fetchBackground();
        setBg(response);
    }

    const fetchPatients = async() => {
        const response = await fetchPatientList();
        if(response.length == 0 || response.error ) {
            setPatientList([]);
        }
        else {
            setPatientList(response);
        }
    }

    useEffect(()=> {
        getBackground();
        fetchPatients();
    },[])

    return (
        <div className="patient-database-bg" style={{backgroundImage:`url(${bg['background']?.imageUrl})`}}>
            <Helmet><title>Patient Database</title></Helmet>
            <div className="patient-database">
                <PatientDatabse visible={"Database"} patients={patientList}/>    
            </div>
           
        </div>
    )
}

export default PatientDatabase;