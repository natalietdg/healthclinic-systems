import React, { useEffect, useState } from 'react';
import Patient from 'Components/patient-form';
import { decode } from 'Helpers/';
import { fetchBackground } from 'Services/background.services';
import { savePatientInformation, fetchPatientInformation } from 'Services/patient.services';
import './new-patient-page.scss';
import { useQuery } from 'src/hooks';
import { useParams } from 'react-router-dom';

const NewPatientPage = () => {
    const [ bg, setBg ] = useState({});
    const [patientInformation, setPatientInformation] = useState({});
    const query = useQuery();
    const { id } = useParams();
    console.log('id', id);
    console.log('decode(id)', decode(id));
    const patientID = id? decode(id): null;
    console.log('patientID', patientID);
    const getBackground = async() => {
        const response = await fetchBackground();
        setBg(response);
    }

    useEffect(()=> {
        getBackground();
        if (patientID != null) fetchPatient(patientID);
    },[])

    const fetchPatient= async(patientID)=> {
        const response = await fetchPatientInformation(patientID);
        setPatientInformation(response);
    }

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
                <Patient.PatientInformation onSubmit={submit} data={patientInformation}/>

                {/* <Patient.MedicalRecord /> */}       
            </div>
        </div>
    )
}

export default NewPatientPage;