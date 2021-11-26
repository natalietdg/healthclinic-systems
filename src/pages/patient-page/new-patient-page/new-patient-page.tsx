import React, { useEffect, useState } from 'react';
import _, { omit } from 'lodash';
import Patient from 'Components/patient-form';
import { encode } from 'Helpers/';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { styles } from 'Components/shared/animation';
import { decode } from 'Helpers/';
import { Toaster } from 'Components/shared';
import { fetchBackground } from 'Services/background.services';
import { savePatientInformation, fetchPatientInformation, setPatientandFeedbackMLRequest, generateObesityPrediction, createComments, editComments, fetchComments, createPatient, uploadImage } from 'Services/patient.services';
import './new-patient-page.scss';
import { useParams } from 'react-router-dom';

const NewPatientPage = () => {
    let history = useHistory();
    const [ toaster, setToaster ] = useState<any>({
        message: '',
        type: ''
    });

    const [ bg, setBg ] = useState<any>({});
    const [patient, setPatient] = useState<any>({});
    const [patientComments, setPatientComments] = useState([]);
    const [redirect, setRedirect ] = useState<any>('');
    const { id, page }:any = useParams();
    var pageNumber: any = page? decode(page): 0;

    const patientID:any = id!=undefined? parseInt(decode(id) || "-1"): -1;
    
    const getBackground = async() => {
        const response = await fetchBackground();
        setBg(response);
    }

    useEffect(()=> {
      
        getBackground();
        if (patientID != -1) {
            fetchPatient(patientID);
            fetchClinicComments(patientID);
        }

        if (pageNumber != null) {
            pageNumber = parseInt(pageNumber);
        }

    },[])

    const upload = async(blob: any) => { 
        const response = await uploadImage(blob);
        return response;
    }

    const fetchPatient= async(patientID: any)=> {
        if(patientID !== -1) {
            const response = await fetchPatientInformation(patientID);
            localStorage.setItem("fullName", response.fullName);

    
            if (response.error){
                setToaster({type: 'errors', message: "Failed to fetch patient's information"});
            }
            else setPatient(response);
        }
        
       
    }

    const fetchClinicComments = async(patientID: any) => {
        const tempResponse = await fetchComments(patientID);
        if (!tempResponse.error){
            setPatientComments(tempResponse);
        }
    }

    const newPatient = async(data: any) => {
        const response = await createPatient(data);
    }

    const generatePrediction = async(data:any) => {
        const response = await generateObesityPrediction(data);

        return response;
    }

    useEffect(() => {
        if(redirect!='') {
            if(redirect=='add another'){
                setPatient({});
               
                setTimeout(function () {
                    history.push('/new-patient');
                }, 5000)
                
            }
            else if (redirect=='prediction' || redirect=='create comment' || redirect == 'edit comment' || redirect=='save') {
                setTimeout(function () {
                    history.push(`/patient/view/${encode(patient?.reportID)}`)
                }, 5000)
            }
            else {
                setTimeout(function () {
                    history.push(`/patient/view/${encode(patient?.reportID)}`)
                }, 5000)
            }
        }
    },[redirect]);
    

    const submit = async(patientInformation: any, type: any) => {

        var toasterType = '';
        var toasterMessage = '';
        var response:any = '';

        if(type=='create comment') {
           
            response = await createComments(patientInformation);

            if(response.error) {
                toasterMessage = 'Create comment failed';
                setToaster({
                    type: 'errors',
                    message: 'Create comment failed'
                });
            }
            else {
                setToaster({
                    type: 'success',
                    message: 'Comment created successfully'
                });
            }
        }
        else if(type=='edit comment') {
            response = await editComments(patientInformation);
            if(response.error) {
                setToaster({
                    type: 'errors',
                    message: 'Edit comment failed'
                });
            }
            else {
                setToaster({
                    type: 'success',
                    message: 'Comment edited successfully'
                });
            }
        }
        else if (type=='create' || type=='add another') {
            response = await createPatient(patientInformation);

            if(response.error) {
                setToaster({
                    type: 'errors',
                    message: 'Create patient failed'
                });
            }
            else {
                setToaster({
                    type: 'success',
                    message: 'Patient created successfully'
                });                
            }
           
            
        }
        else if (type=="prediction") {
            response = await generatePrediction(patientInformation);

            if (!response?.error) {
                let data: any = {
                    reportID: response.request_id,
                    patientID: patientInformation.patientID
                }
                response = await setPatientandFeedbackMLRequest(data);
                if(response.error) {
                    setToaster({
                        type: 'errors',
                        message: 'Create prediction report failed'
                    });
                }
                else {

                    setToaster({
                        type: 'success',
                        message: 'Prediction report created successfully'
                    });
                }
            }
        }
        else {
            response = await savePatientInformation(patientInformation);
            setPatient(response);
            if(response.error) {
                setToaster({
                    type: 'errors',
                    message: 'Update patient failed'
                });
            }
            else {

                setToaster({
                    type: 'success',
                    message: 'Patient updated successfully'
                });
            }
            
        }

        if(!response.error) {
            setRedirect(type);
        }
        
    }


    return(
        <div className="new-patient-page-bg" style={{backgroundImage:`url(${bg['vertical-bg-2']?.imageUrl})`}}> 
           <Helmet><title>New Patient Page</title></Helmet>
            <Toaster props={toaster} toasterID="patient-toaster" style={{...styles.fadeInRight}}/>
                <div className="new-patient-page">
                    <Patient.PatientInformation page={pageNumber} onSubmit={submit} comments = {patientComments} data={patient}/>
                </div>
            
        </div>
    )
}

export default NewPatientPage;