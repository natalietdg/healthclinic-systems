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
import { savePatientInformation, fetchPatientInformation, generateObesityPrediction, createComments, editComments, fetchComments, createPatient, uploadImage } from 'Services/patient.services';
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
        console.log('dates', dates);
    },[]);

    const [ bg, setBg ] = useState<any>({});
    const [patient, setPatient] = useState({});
    const [patientComments, setPatientComments] = useState([]);
    const [ actionStatus, setActionStatus ] = useRecoilState<authActionStatusType>(AuthActionStatusAtom);
    const params = useParams();
    console.log('params', params);
    const { id, page }:any = useParams();
    var pageNumber: any = page? decode(page): 0;
    
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

        if (pageNumber != null) {
            pageNumber = parseInt(pageNumber);
        }

    },[])

    const upload = async(blob: any) => { 
        const response = await uploadImage(blob);

        console.log('response', response);
        return response;
    }

    const fetchPatient= async(patientID: any)=> {
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

        if (response.error){
            setToaster({type: 'errors', message: "Failed to fetch patient's information"});
        }
        else setPatient(response);
    }

    const fetchClinicComments = async(patientID: any) => {
        const tempResponse = await fetchComments(patientID);
        console.log('respnose', tempResponse);
        if (!tempResponse.error){
            setPatientComments(tempResponse);
        }
    }

    const newPatient = async(data: any) => {
        const response = await createPatient(data);
        console.log('response',response);
    }

    const generatePrediction = async(data:any) => {
        console.log('predictoin');
        const response = await generateObesityPrediction(data);
        console.log('response', response);
    }

    const submit = async(patientInformation: any, type: any) => {
        console.log('patientInformation', patientInformation);

        // if(patientInformation.profilePicBlob && patientInformation.profilePicBlob != {}) {
        //     const imageResponse = await upload(patientInformation.profilePicBlob);
        //     patientInformation.image = imageResponse.image.full_size
        // }
        console.log('type', type);
        var toasterType = '';
        var toasterMessage = '';
        var response:any = '';
        if(type=='create comment') {
            // let patientID = patientInformation.patientID;
            // let tempComment =  _.omit(patientInformation, ['patientID']);
            response = await createComments(patientInformation);
          
            console.log('response', response);

            if(response.error) {
                toasterMessage = 'Create comment failed';
            }
            else {
                toasterMessage = 'Comment created successfully';
            }
        }
        else if(type=='edit comment') {
            response = await editComments(patientInformation);
           
            console.log('response', response);

            if(response.error) {
                toasterMessage = 'Edit comment failed';
            }
            else {
                toasterMessage = 'Comment edited successfully';
            }
        }
        else if (type=='create' || type=='save') {
            response = await createPatient(patientInformation);
            console.log('response', response);

            if(response.error) {
                toasterMessage = 'Create patient failed';
            }
            else {
                toasterMessage = 'Patient created successfully';

                let todayPatients:any = localStorage.getItem('todayPatients') || null;
                console.log('todayPatients', todayPatients);
                // if(todayPatients != null) localStorage.removeItem('todayPatients');
                let now = new Date();
                var tempPatient = {
                    createdDate: now,
                    patientID: response.patientID
                }
                if(todayPatients == null) {
                    todayPatients = [tempPatient]
                }
                else {
                    todayPatients = JSON.parse(todayPatients);
                    console.log('todayPatients', todayPatients);
                    todayPatients.push(tempPatient);
                }

                localStorage.setItem('todayPatients', JSON.stringify(todayPatients));
                console.log('localStorage', localStorage);
                
            }
           
            
        }
        else if (type=="prediction") {
            console.log('prediction', type);
            response = await generatePrediction(patientInformation);
            console.log('resopnse', response);
        }
        else {
            response = await savePatientInformation(patientInformation);
            console.log('response', response);
        
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

        // if(response.error) {
        //     toasterType = 'errors';
        //     setToaster({
        //         type: 'errors',
        //         message: response.error
        //     });
        //     setActionStatus({...actionStatus, patientInfo: 'error'})
        // }
        // else {
        //     toasterType = 'success';
        //     setToaster({
        //         type: 'success',
        //         message: 'Success'
        //     });

        //     setActionStatus({...actionStatus, patientInfo: 'success'})
        // }
        console.log('response', response);
        if(!response.error) {
            if(type=='save') {
                history.push(`/patients/${todaysDate}`);
            }
            else {
                history.push('/new-patient');
            }
        }
        
    }


    return(
        <div className="new-patient-page-bg" style={{backgroundImage:`url(${bg['vertical-bg-2']?.imageUrl})`}}> {/* style={{backgroundImage:`url(${bg['vertical-bg-2']?.imageUrl})`}} */}  {/*style={{backgroundImage:`url(${bg['background']?.imageUrl})`}}*/} 
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