import React, { useEffect, useState } from 'react';
import Patient from 'Components/patient-form';
import { fetchBackground } from 'Services/background.services';
import './new-patient-page.scss';

const NewPatientPage = () => {
    const [ bg, setBg ] = useState({});
    const getBackground = async() => {
        const response = await fetchBackground();
        console.log('response', response);
        setBg(response);
    }

    useEffect(()=> {
        getBackground();
    },[])

    return(
        <div className="new-patient-page-bg" style={{backgroundImage:`url(${bg['background']?.imageUrl})`}}>
            <div className="new-patient-page">
                <Patient.PatientInformation />

                {/* <Patient.MedicalRecord /> */}       
            </div>
        </div>
    )
}

export default NewPatientPage;