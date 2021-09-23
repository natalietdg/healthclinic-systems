import React, { useEffect, useState } from 'react';
import Patient from 'Components/patient-form';
import { fetchBackground } from 'Services/background.services';
import { savePatientInformation } from 'Services/patient.services';
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

    const submit = async(patientInformation) => {
        const response = await savePatientInformation(patientInformation);

        console.log('response', response);
    }


    return(
        <div className="new-patient-page-bg" style={{backgroundImage:`url(${bg['vertical-bg-2']?.imageUrl})`}}>  {/*style={{backgroundImage:`url(${bg['background']?.imageUrl})`}}*/}
            <div className="new-patient-page">
                <Patient.PatientInformation onSubmit={submit} />

                {/* <Patient.MedicalRecord /> */}       
            </div>
        </div>
    )
}

export default NewPatientPage;