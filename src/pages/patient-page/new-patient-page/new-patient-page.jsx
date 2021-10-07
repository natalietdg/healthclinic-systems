import React, { useEffect, useState } from 'react';
import Patient from 'Components/patient-form';
import { fetchBackground } from 'Services/background.services';
import { savePatientInformation } from 'Services/patient.services';
import './new-patient-page.scss';

const NewPatientPage = () => {
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


    return(
        <div className="new-patient-page-bg" style={{backgroundImage:`url(${bg['vertical-bg-2']?.imageUrl})`}}> {/* style={{backgroundImage:`url(${bg['vertical-bg-2']?.imageUrl})`}} */}  {/*style={{backgroundImage:`url(${bg['background']?.imageUrl})`}}*/} 
            {/*backgroundImage: `url(${bg['vertical-bg-3']?.imageUrl})`,  backgroundPositionY: '1128px', backgroundSize: 'cover',  */}
            {/* <div style={{borderBottom: '2px solid #CCCCCC', display: 'flex', justifyContent: 'center', width: '100%', height: '15%', alignContent: 'center', alignItems: 'center'}}>   
                <h2>New Patient</h2>
            </div> */}
            <div className="new-patient-page">
                <Patient.PatientInformation onSubmit={submit} />

                {/* <Patient.MedicalRecord /> */}       
            </div>
        </div>
    )
}

export default NewPatientPage;