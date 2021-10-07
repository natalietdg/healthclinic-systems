import React, { useState, useEffect } from 'react';
import PatientDatabse from 'Components/patient-database';
import { fetchBackground } from 'Services/background.services';

import './patient-database.scss';
const PatientDatabase = () => {
    const [ bg, setBg ] = useState({});
    const getBackground = async() => {
        const response = await fetchBackground();
        setBg(response);
    }

    useEffect(()=> {
        getBackground();
    },[])

    const submit = async(patientInformation) => {
        const response = await savePatientInformation(patientInformation);

        console.log('response', response);
    }

    return (
        <div className="patient-database-bg" style={{backgroundImage:`url(${bg['vertical-bg-3']?.imageUrl})`}}>

            {/* <div style={{backgroundPositionY: '1128px', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', width: '100%', height: '20%', alignContent: 'center', alignItems: 'center'}}>   
                <h2>Patient Database</h2>
            </div> */}
            <div className="patient-database">
                <PatientDatabse />    
            </div>
           
        </div>
    )
}

export default PatientDatabase;