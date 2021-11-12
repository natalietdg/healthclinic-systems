import React, { useEffect, useState } from 'react';
import _, { omit } from 'lodash';
import Patient from 'Components/patient-form';
import { encode } from 'Helpers/';
import { useHistory } from 'react-router-dom';
import { DateType, dateAtom } from 'Recoil/date.atom';
import { AuthActionStatusAtom, authActionStatusType } from 'Recoil/auth.atom';
import Radium from 'radium';
import { styles } from 'Components/shared/animation';
import { decode } from 'Helpers/';
import { Toaster } from 'Components/shared';
import { fetchBackground } from 'Services/background.services';
import { savePatientInformation, fetchPatientInformation, setPatientandFeedbackMLRequest, generateObesityPrediction, createComments, editComments, fetchComments, createPatient, uploadImage } from 'Services/patient.services';
import './new-patient-page.scss';
import { useParams } from 'react-router-dom';
// import { toaster } from 'Components/shared';
import { useRecoilState } from 'recoil';

const NewPatientPage = () => {
    // const dates = generateTodaysDate();
     const [ dates, setDates ] = useRecoilState<DateType>(dateAtom);
    const [ todaysDate, setTodaysDate ] = useState<any>('');
    const [ expiryDate, setExpiryDate ] = useState<any>('');
    // var todaysDate = encode(dates.todayDate);
    let history = useHistory();
    const [ toaster, setToaster ] = useState<any>({
        message: '',
        type: ''
    });

    useEffect(()=> {
        setTodaysDate(dates.todaysDate);
    },[]);

    const [ bg, setBg ] = useState<any>({});
    const [patient, setPatient] = useState<any>({});
    const [patientComments, setPatientComments] = useState([]);
    const [redirect, setRedirect ] = useState<any>('');
    const [ actionStatus, setActionStatus ] = useRecoilState<authActionStatusType>(AuthActionStatusAtom);
    const params = useParams();
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
        // else {
        //     localStorage.setItem('fullName', 'Obesity Prediction Report');
        // }

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
                    history.push(`/patients`);
                }, 5000)
            }
        }
    },[redirect]);
    

    const submit = async(patientInformation: any, type: any) => {

        // if(patientInformation.profilePicBlob && patientInformation.profilePicBlob != {}) {
        //     const imageResponse = await upload(patientInformation.profilePicBlob);
        //     patientInformation.image = imageResponse.image.full_size
        // }
        var toasterType = '';
        var toasterMessage = '';
        var response:any = '';

        if(type=='create comment') {
            // let patientID = patientInformation.patientID;
            // let tempComment =  _.omit(patientInformation, ['patientID']);
            response = await createComments(patientInformation);

            if(response.error) {
                toasterMessage = 'Create comment failed';
            }
            else {
                toasterMessage = 'Comment created successfully';
            }
        }
        else if(type=='edit comment') {
            response = await editComments(patientInformation);
            if(response.error) {
                toasterMessage = 'Edit comment failed';
            }
            else {
                toasterMessage = 'Comment edited successfully';
            }
        }
        else if (type=='create' || type=='add another') {
            response = await createPatient(patientInformation);

            if(response.error) {
                toasterMessage = 'Create patient failed';
            }
            else {
                toasterMessage = 'Patient created successfully';

                // let todayPatients:any = localStorage.getItem('todayPatients') || null;
                // console.log('todayPatients', todayPatients);
                // // if(todayPatients != null) localStorage.removeItem('todayPatients');
                // let now = new Date();
                // var tempPatient = {
                //     createdDate: now,
                //     patientID: response.patientID
                // }
                // if(todayPatients == null) {
                //     todayPatients = [tempPatient]
                // }
                // else {
                //     todayPatients = JSON.parse(todayPatients);
                //     console.log('todayPatients', todayPatients);
                //     todayPatients.push(tempPatient);
                // }

                // localStorage.setItem('todayPatients', JSON.stringify(todayPatients));
                // console.log('localStorage', localStorage);
                
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
                    toasterMessage = 'Create prediction report failed';
                }
                else {
                    toasterMessage = 'Prediction report created successfully';
                }
            }
        }
        else {
            response = await savePatientInformation(patientInformation);
            setPatient(response);
            if(response.error) {
                toasterMessage = 'Update patient failed';
            }
            else {
                toasterMessage = 'Patient updated successfully';
            }
            
        }
    
        if(response.error) toasterType = 'errors';
        else toasterType = 'success';
        
        setToaster({
            type: toasterType,
            message: toasterMessage
        });

        if(!response.error) {
            setRedirect(type);
        }
        
    }


    return(
        <div className="new-patient-page-bg" style={{backgroundImage:`url(${bg['vertical-bg-2']?.imageUrl})`}}> {/* style={{backgroundImage:`url(${bg['vertical-bg-2']?.imageUrl})`}} */}  {/*style={{backgroundImage:`url(${bg['background']?.imageUrl})`}}*/} 
            <Toaster props={toaster} toasterID="patient-toaster" style={{...styles.fadeInRight}}/>
            {/*backgroundImage: `url(${bg['vertical-bg-3']?.imageUrl})`,  backgroundPositionY: '1128px', backgroundSize: 'cover',  */}
            {/* <div style={{borderBottom: '2px solid #CCCCCC', display: 'flex', justifyContent: 'center', width: '100%', height: '15%', alignContent: 'center', alignItems: 'center'}}>   
                <h2>New Patient</h2>
            </div> */}
                <div className="new-patient-page">
                    <Patient.PatientInformation page={pageNumber} onSubmit={submit} comments = {patientComments} data={patient}/>

                    {/* <Patient.MedicalRecord /> */}       
                </div>
            
        </div>
    )
}

export default NewPatientPage;