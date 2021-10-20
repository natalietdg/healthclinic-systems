import React, { useEffect, useState } from 'react';
import _, { omit } from 'lodash';
import Patient from 'Components/patient-form';
import { decode } from 'Helpers/';
import { fetchBackground } from 'Services/background.services';
import { savePatientInformation, fetchPatientInformation, createComments, editComments, fetchComments, createPatient, uploadImage } from 'Services/patient.services';
import './new-patient-page.scss';
import { useParams } from 'react-router-dom';
import { toaster } from 'Components/shared';

const NewPatientPage = () => {
    const [ bg, setBg ] = useState({});
    const [patient, setPatient] = useState({});
    const [patientComments, setPatientComments] = useState([]);

    const { id } = useParams();
    // console.log('id', id);
    // console.log('decode(id)', decode(id));
    const patientID = id? decode(id): null;
    console.log('patientID', patientID);
    
    const getBackground = async() => {
        const response = await fetchBackground();
        setBg(response);
    }

    useEffect(()=> {
        console.log('localStorage', localStorage);
        getBackground();
        if (patientID != null) {
            fetchPatient(patientID);
            fetchClinicComments(patientID);
        }
    },[])

    const upload = async(blob) => { 
        const response = await uploadImage(blob);

        console.log('response', response);
        return response;
    }

    const fetchPatient= async(patientID)=> {
        console.log('patient ID', patientID);
        const response = await fetchPatientInformation(patientID);
        console.log('response', response);
        const huh = localStorage.getItem('huh');
        console.log('huh', huh);

        const fullName = localStorage.getItem('fullName');
        if(fullName == null) {
            localStorage.setItem("fullName", response.fullName);
        }
        
        console.log('localStorage', localStorage);
        setPatient(response);
    }

    const fetchClinicComments = async(patientID) => {
        const tempResponse = await fetchComments(patientID);
        console.log('respnose', tempResponse);

        setPatientComments(tempResponse);
    }

    const newPatient = async(data) => {
        const response = await createPatient(data);
        console.log('response',response);
    }

    const submit = async(patientInformation, type) => {
        console.log('patientInformation', patientInformation);

        if(patientInformation.profilePicBlob && patientInformation.profilePicBlob != {}) {
            const imageResponse = await upload(patientInformation.profilePicBlob);
            patientInformation.image = imageResponse.image.full_size
        }

        var response = '';
        if(type=='create comment') {
            let patientID = patientInformation.patientID;
            console.log('patientInformation', patientInformation);

            let tempComment =  _.omit(patientInformation, ['patientID']);

            response = await createComments(tempComment);

            console.log('response', response);
        }
        else if(type=='edit comment') {
            response = await editComments(patientInformation);

            console.log('response', response);
        }
        else if (type='create') {
            response = await createPatient(patientInformation);
            console.log('response', response);
        }
        else {
            response = await savePatientInformation(patientInformation);
            console.log('response', response);
        }
        
        if(response.error) toaster('errors', response.error);
        else toaster('success', 'Success');
        console.log('response', response);
    }


    return(
        <div className="new-patient-page-bg" style={{backgroundImage:`url(${bg['vertical-bg-2']?.imageUrl})`}}> {/* style={{backgroundImage:`url(${bg['vertical-bg-2']?.imageUrl})`}} */}  {/*style={{backgroundImage:`url(${bg['background']?.imageUrl})`}}*/} 
            {/*backgroundImage: `url(${bg['vertical-bg-3']?.imageUrl})`,  backgroundPositionY: '1128px', backgroundSize: 'cover',  */}
            {/* <div style={{borderBottom: '2px solid #CCCCCC', display: 'flex', justifyContent: 'center', width: '100%', height: '15%', alignContent: 'center', alignItems: 'center'}}>   
                <h2>New Patient</h2>
            </div> */}
            <div className="new-patient-page">
                <Patient.PatientInformation onSubmit={submit} comments = {patientComments} data={patient}/>

                {/* <Patient.MedicalRecord /> */}       
            </div>
        </div>
    )
}

export default NewPatientPage;