import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Patient from 'Components/patient-form';
import { useTranslation } from 'react-i18next';
import { styles } from 'Components/shared/animation';
import Radium from 'radium';
import { useHistory } from 'react-router-dom';
import { encode, decode } from 'Helpers/';
import { Modal } from 'Components/shared';
import { Toaster, Container, Row, Table } from 'Components/shared';
import LoadingPage from 'Pages/loading-page/loading-page';
import { fetchBackground } from 'Services/background.services';
import { fetchReport, setPatientandFeedbackMLRequest, savePatientInformation, fetchPatientInformation, editComments, fetchComments, uploadImage, fetchAllObesityPredictionReport } from 'Services/patient.services';
import Report from 'Components/report';
import './view-patient-page.scss';
const ViewPatientPage = () => {
    var history = useHistory();
    const { t } = useTranslation();
    const [ bg, setBg ] = useState<any>({});
    const [ imgUrl, setImgUrl ] = useState<any>('data:image/png;base64,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');
    const [patientInformation, setPatientInformation ] = useState<any>({});
    const [ obesityPredictionReport, setObesityPredictionReport ] = useState<any>({});
    const [ obesityPredictionReportModal, setObesityPredictionReportModal ] = useState<boolean>(false);
    const [ feedbackModal, setFeedbackModal ] = useState<boolean>(false);
    const [patientComments, setPatientComments] = useState([]);
    const [toasterProps, setToasterProps] = useState<any>({
        type: '',
        message: ''
    })

    const { id }:any = useParams();
    const reportID = id? decode(id): null;
    console.log('reportID', reportID);
    const getBackground = async() => {
        const response = await fetchBackground();
        setBg(response);
    }

    const setFeedback = async(data: any) => {
        console.log('data', data);
        let feedbackData = {
            feedback: data,
            reportID: obesityPredictionReport.id,
        }
        console.log('feedbackData', feedbackData);
        const response: any = await setPatientandFeedbackMLRequest(feedbackData);

        if(response.error) {
            setToasterProps({
                type: 'errors',
                message: 'Add feedback failed.'
            });
        }
        else {
            setToasterProps({
                type: 'success',
                message: 'Add feedback was successful.'
            });
        }
    }

    // const fetchAllPatientObesityPredictionReports = async(patientID: any) => {
    //     const response = await fetchAllObesityPredictionReport(patientID);

    //     console.log('response', response);
    // }

    // const fetchPatient= async(patientID: any)=> {
  
    //     const response = await fetchPatientInformation(patientID);

    //     const huh = localStorage.getItem('huh');

    //     const fullName = localStorage.getItem('fullName');
    //     if(fullName == null) {
    //         localStorage.setItem("fullName", response.fullName);
    //     }


    //     if (response.error){
    //         setToasterProps({type: 'errors', message: "Failed to fetch patient's information"});
    //     }
    //     else setPatientInformation(response);
    // }
    
    // const fetchClinicComments = async(patientID: any) => {
    //     const tempResponse = await fetchComments(patientID);
    //     console.log('respnose', tempResponse);
    //     if (!tempResponse.error){
    //         setPatientComments(tempResponse);
    //     }
    // }

    const pushPage = (reportID: string) => {

    }

    const fetchPatientReport = async(reportID: string) => {
        const response = await fetchReport(reportID);
        setPatientInformation(response);
    }

    const showObesityReport = (e: any) => {
        setObesityPredictionReport(patientInformation.obesityPredictionReports[parseInt(e.target.id)]);
        setObesityPredictionReportModal(true);
        (document.querySelector('.navbar-bg') as HTMLElement).style.zIndex='0';
    }

    const closeObesityReport = (data:any) => {
        (document.querySelector('.navbar-bg') as HTMLElement).style.zIndex='20';
        setObesityPredictionReportModal(data);
    }

    const closeFeedbackModal = (data: any ) => {
        (document.querySelector('.navbar-bg') as HTMLElement).style.zIndex='20';
        setFeedbackModal(data);
    }

    useEffect(()=> {
        getBackground();
        
        if (reportID != null) {
            // fetchPatient(patientID);
            // fetchClinicComments(patientID);
            // fetchAllPatientObesityPredictionReports(patientID);
            fetchPatientReport(reportID);
        }
    },[]);

    return (
        <div className="view-patient-bg" style={{backgroundImage:`url(${bg['background-2']?.imageUrl})`}}>
            <Modal onClose={closeObesityReport} visible={obesityPredictionReportModal}>
                <Patient.MLPredictionReport data={obesityPredictionReport} patient={false} onSubmit={setFeedback}/>
            </Modal>
             <Toaster toasterID="viewPatient-toaster" style={{...styles.fadeInRight}} props={toasterProps}/>
             {
                   patientInformation?.obesityPredictionReports?.length > 0 ?
                   <div className="view-patient-page">
               
                   <Radium.StyleRoot style={{width: '88%',  display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Container flexDirection='column' alignItems='flex-start' style={{...styles.fadeIn}}>
                    {
                        patientInformation && 
                        <div style={{width: '100%'}}>
                             {/* <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}> */}
                                <h1>{patientInformation.fullName}</h1>
                                {/* <button onClick={() => history.push(`/report/${encode(patientInformation.reportID)}/`)} className="button"> 
                                    <a href={`/report/${encode(patientInformation.reportID)}/`}><img className="img" src="/assets/images/view.png"/>View Report (Patient's View)</a>
                                    <br></br>
                                </button>
                            </div> */}
                            <Row>
                                <div style={{width: 'inherit'}}>
                                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                        <h2 className="title">Personal Information</h2>
                                        <button onClick={() => history.push(`/patient/edit/${encode(patientInformation.patientID)}/`)} className="button"> 
                                            <a href={`/patient/edit/${encode(patientInformation.patientID)}/`}><img className="img" src="/assets/images/edit-dark.png"/>Edit Personal Information</a>
                                            <br></br>
                                        </button>
                                    </div>
                                    <div className="content-container">
                                        <span className="span">
                                            <h3 className="span--title">IC</h3>
                                            <h4 className='span--text'>{patientInformation.ic}</h4>
                                        </span>
                                        <span className="span">
                                            <h3 className="span--title">Phone Number</h3>
                                            <h4 className='span--text'>{patientInformation.phoneNumber}</h4>
                                        </span>
                                        <span className="span">
                                            <h3 className="span--title">Email</h3>
                                            <h4 className='span--text'>{patientInformation.email}</h4>
                                        </span>
                                        <span className="span">
                                            <h3 className="span--title">Date of Birth</h3>
                                            <h4 className='span--text'>{patientInformation.dateOfBirth}</h4>
                                        </span>
                                        <span className="span">
                                            <h3 className="span--title">Race</h3>
                                            <h4 className='span--text'>{patientInformation.race && t(`label.${patientInformation?.race.toLowerCase()}`)}</h4>
                                        </span>
                                        <span className="span">
                                            <h3 className="span--title">Gender</h3>
                                            <h4 className='span--text'>{patientInformation.gender && t(`label.${patientInformation?.gender.toLowerCase()}`)}</h4>
                                        </span>
                                        <span className="span">
                                            <h3 className="span--title">Reason for Consultation</h3>
                                            <h4 className='span--text'>{patientInformation.reasonForConsultation}</h4>
                                        </span>
                                        
                                    </div>
                                    
                                </div>
                                <div style={{width: 'inherit', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <img className="profile-pic" src={imgUrl} />
                                </div>
                                
                            </Row>
                        </div>
                    }
                        {
                        patientInformation && 
                        <div style={{width: '100%'}}>
                            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <h2 className="title">Obesity and Comorbidities Prediction</h2>
                                <button onClick={() => history.push(`/patient/edit/${encode(patientInformation.patientID)}/${encode(1)}`)}  className="button"> 
                                    <a href={`/patient/edit/${encode(patientInformation.patientID)}/${encode(1)}`}><img className="img" src="/assets/images/add-grey.png"/>Add Obesity and Comorbidities Prediction Report</a>
                                    <br></br>
                                </button>
                            </div>
                            <div className="content-container" style={{width: '97%'}}>
                           
                            {
                                patientInformation?.obesityPredictionReports?.length > 0 &&
                                patientInformation.obesityPredictionReports.map((predictionReport: any, index:number) => {
                                    console.log('predictionReport', predictionReport);
                                    return (
                                        <Row>
                                            <div style={{width: 'inherit'}}>
                                                <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                                    <h3 className="span--title">{new Date(predictionReport.created).toLocaleDateString([], {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}</h3>
                                                    <button id={index.toString()} onClick={(e: any) => {showObesityReport(e)}} className="button"> 
                                                        <p id={index.toString()} onClick={(e: any) => {showObesityReport(e)}}><img id={index.toString()} onClick={(e: any) => {showObesityReport(e)}} className="img" src="/assets/images/view.png"/>View Full Report</p>
                                                    </button>
                                                </div>
                                                <h4 className="sub-title">Prediction</h4>
                                                {/* {
                                                    predictionReport?.fullResponse?.probability  && Object.keys(predictionReport?.fullResponse?.probability).map((name: any) => {
                                                    console.log('name', name);
                                                    console.log('Object.values', Object.values(predictionReport?.fullResponse?.probability));
                                                    return (
                                                        <span className="span">
                                                            <h3 className="span--title">{t(`label.${name.toLowerCase()}`)}</h3>
                                                            <h3 className='span--text'>{predictionReport?.fullResponse?.probability[name]}%</h3>
                                                        </span>)
                                                    })
                                                } */}
                                                <div style={{padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                    <Table 
                                                        columns={[
                                                            {colName: 'Hypertension'}, 
                                                            {colName:'Diabetes'}, 
                                                            {colName:'High Cholesterol'}, 
                                                            {colName: 'Heart Disease'}
                                                        ]}
                                                        filteredData={[
                                                            {
                                                                'Hypertension': predictionReport?.fullResponse?.probability['Hypertension']?.toString() + '%',
                                                                'Diabetes': predictionReport?.fullResponse?.probability['Diabetes']?.toString() + '%',
                                                                'High Cholesterol': predictionReport?.fullResponse?.probability['High-cholesterol']?.toString() + '%',
                                                                'Heart Disease': predictionReport?.fullResponse?.probability['Heart-disease']?.toString() + '%',
                                                            },
                                                        ]}
                                                        visibility='Today'
                                                    
                                                    />
                                                </div>
                                                {
                                                    predictionReport?.feedback == ''? 
                                                    <div>
                                                        <h4 className="sub-title">Feedback</h4>
                                                        <button id={index.toString()} className="button" onClick={(e: any) => {showObesityReport(e)}}><img className="img" src="/assets/images/add-grey.png"/>Write Feedback</button> 
                                                    </div>
                                                    :
                                                    <span className="span">
                                                        <h4 className="sub-title">Feedback</h4>
                                                        <h4 className='span--text'>{predictionReport.feedback}</h4>
                                                    </span>
                                                }
                                                
                                            </div>
                                            
                                        </Row>
                                    )
                                })
                            }
                            </div>
                            
                            <Row>
                                <div style={{width: 'inherit'}}>
                                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                        <h2 className="title">Diagnosis & Comments</h2>
                                        <button onClick={() => history.push(`/patient/edit/${encode(patientInformation.patientID)}/${encode(4)}`)} className="button"> 
                                            <a href={`/patient/edit/${encode(patientInformation.patientID)}/${encode(1)}`}><img className="img" src="/assets/images/edit-dark.png"/>Edit Diagnosis & Comments</a>
                                            <br></br>
                                        </button>
                                    </div>
                                    <div className="content-container" style={{width: '90%'}}>
                                    {
                                        patientInformation?.comments && patientInformation?.comments.map((comment: any, index: any) => {
                                            return (
                                                <Row key={index} style={{justifyContent:'flex-start', alignItems: 'flex-start'}}>

                                                    <span className="span">
                                                        <h3 className="span--title">{new Date(comment?.created).toLocaleDateString([], {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })} - {comment?.diagnosis}</h3>
                                                        <h4 className='span--text'>{comment?.comment}</h4>
                                                    </span>
                                                </Row>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                            </Row>
                            {/* <Row>
                                <div style={{width: 'inherit'}}>
                                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                        <h2 className="title">Dietary Intake Information</h2>
                                        <button onClick={() => history.push(`/patient/edit/${encode(patientInformation.patientID)}/${encode(2)}`)} className="button"> 
                                            <a href={`/patient/edit/${encode(patientInformation.patientID)}/${encode(2)}`}><img className="img" src="/assets/images/edit-dark.png"/>Edit Dietary Intake Information</a>
                                            <br></br>
                                        </button>
                                    </div>
                                    <h3>IC: {patientInformation.ic}</h3>
                                    <h3>Phone Number: {patientInformation.phoneNumber}</h3>
                                    <h3>Email: {patientInformation.email}</h3>
                                    <h3>Date of Birth: {patientInformation.dateOfBirth}</h3>
                                    <h3>Race: {patientInformation.race && t(`label.${patientInformation?.race.toLowerCase()}`)}</h3>
                                    <h3>Gender: {patientInformation.gender && t(`label.${patientInformation?.gender.toLowerCase()}`)}</h3>
                                    <h3>Reason for Consultation: {patientInformation.reasonForConsultation}</h3>
                                </div>                                
                            </Row>
                            <Row>
                                <div style={{width: 'inherit'}}>
                                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                        <h2 className="title">Lifestyle Information</h2>
                                        <button onClick={() => history.push(`/patient/edit/${encode(patientInformation.patientID)}/${encode(3)}`)} className="button"> 
                                            <a href={`/patient/edit/${encode(patientInformation.patientID)}/${encode(3)}`}><img className="img" src="/assets/images/edit-dark.png"/>Edit Lifestyle Information</a>
                                            <br></br>
                                        </button>
                                    </div>
                                    <h3>IC: {patientInformation.ic}</h3>
                                    <h3>Phone Number: {patientInformation.phoneNumber}</h3>
                                    <h3>Email: {patientInformation.email}</h3>
                                    <h3>Date of Birth: {patientInformation.dateOfBirth}</h3>
                                    <h3>Race: {patientInformation.race && t(`label.${patientInformation?.race.toLowerCase()}`)}</h3>
                                    <h3>Gender: {patientInformation.gender && t(`label.${patientInformation?.gender.toLowerCase()}`)}</h3>
                                    <h3>Reason for Consultation: {patientInformation.reasonForConsultation}</h3>
                                </div>                                
                            </Row> */}
                        </div>
                    }
                    {/* {
                        patientComments.length > 0 && 
                        <div style={{width: '80%'}}>
                            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <h2>Diagnosis & Comments</h2>
                                <button onClick={() => history.push(`/patient/edit/${encode(patientInformation.patientID)}/${encode(4)}`)} className="button"> 
                                    <a href={`/patient/edit/${encode(patientInformation.patientID)}/${encode(4)}`}><img className="img" src="/assets/images/edit-dark.png"/>Edit Diagnosis & Comments</a>
                                    <br></br>
                                </button>
                            </div>
                            {
                                patientComments.map((comment: any, index: number)=> {
                                    return <Row key={index}>
                                    <div style={{width: 'inherit'}}>
                                        <h2 className="subtitle">{new Date(comment?.created).toLocaleDateString([], {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })} - {comment?.diagnosis}</h2>
                                        <p>{comment?.comment}</p>
                                    </div>
                                </Row>
                                })
                            }
                        </div>
                    } */}
                </Container>
                </Radium.StyleRoot> 
                
              
            </div> : <LoadingPage />} 
        </div>
            
    )
}

export default ViewPatientPage;