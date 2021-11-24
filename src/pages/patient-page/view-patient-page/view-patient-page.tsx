import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
import { fetchReport, setPatientandFeedbackMLRequest } from 'Services/patient.services';
import './view-patient-page.scss';
const ViewPatientPage = () => {
    var history = useHistory();
    const { t } = useTranslation();
    const [ bg, setBg ] = useState<any>({});
    const [ imgUrl, setImgUrl ] = useState<any>('data:image/png;base64,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');
    const [patientInformation, setPatientInformation ] = useState<any>({});
    const [ obesityPredictionReport, setObesityPredictionReport ] = useState<any>({});
    const [ obesityPredictionReportModal, setObesityPredictionReportModal ] = useState<boolean>(false);
    const [toasterProps, setToasterProps] = useState<any>({
        type: '',
        message: ''
    })

    const { id }:any = useParams();
    const reportID = id? decode(id): null;
    const getBackground = async() => {
        const response = await fetchBackground();
        setBg(response);
    }

    const setFeedback = async(data: any) => {
        let feedbackData = {
            feedback: data,
            reportID: obesityPredictionReport.id,
        }
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

            location.reload();
        }
    }

    const fetchPatientReport = async(reportID: string) => {
        const response = await fetchReport(reportID);
        setPatientInformation(response);
        setImgUrl(response.profilePicBlob);
        localStorage.setItem('fullName', response.fullName);
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

    useEffect(()=> {
        getBackground();
        
        if (reportID != null) {
            fetchPatientReport(reportID);
        }
    },[]);

    return (
        <div className="view-patient-bg" style={{backgroundImage:`url(${bg['background-2']?.imageUrl})`}}>
            <Helmet><title>View Patient Page</title></Helmet>
            <Modal onClose={closeObesityReport} visible={obesityPredictionReportModal}>
                <Patient.MLPredictionReport data={obesityPredictionReport} patient={false} onSubmit={setFeedback}/>
            </Modal>
             <Toaster toasterID="viewPatient-toaster" style={{...styles.fadeInRight}} props={toasterProps}/>
             {
                   patientInformation?.obesityPredictionReports ?
                   <div className="view-patient-page">
               
                   <Radium.StyleRoot style={{width: '88%',  display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Container flexDirection='column' alignItems='flex-start' style={{...styles.fadeIn}}>
                    {
                        patientInformation && 
                        <div style={{width: '100%'}}>
                          
                                <h1>{patientInformation.fullName}</h1>
                                <h3>Report Number: {reportID}</h3>
                            <Row style={{alignItems: 'flex-start'}}>
                                <div style={{width: 'inherit'}}>
                                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                        <h2 className="title">Personal Information</h2>
                                        <button aria-label="edit patient's personal information button" onClick={() => history.push(`/patient/edit/${encode(patientInformation.patientID)}/`)} className="button"> 
                                            <a href={`/patient/edit/${encode(patientInformation.patientID)}/`}><img alt="edit" className="img" src="/assets/images/edit-dark.png"/>Edit Personal Information</a>
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
                                        
                                    </div>
                                    
                                </div>
                                <div style={{width: 'inherit', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <img alt="profile" className="profile-pic" src={imgUrl} />
                                </div>
                                
                            </Row>
                        </div>
                    }
                    {
                    patientInformation && 
                    <div style={{width: '100%'}}>
                        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <h2 className="title">Obesity and Comorbidities Prediction</h2>
                            <button aria-label="add obesity and comorbidities prediction report: height, weight, and family history section button" onClick={() => history.push(`/patient/edit/${encode(patientInformation.patientID)}/${encode(1)}`)}  className="button"> 
                                <a href={`/patient/edit/${encode(patientInformation.patientID)}/${encode(1)}`}><img alt="add" className="img" src="/assets/images/add-grey.png"/>Add Obesity and Comorbidities Prediction Report</a>
                                <br></br>
                            </button>
                        </div>
                        <div className="content-container" style={{width: '97%'}}>
                        
                        {
                            patientInformation?.obesityPredictionReports?.length > 0 &&
                            patientInformation.obesityPredictionReports.map((predictionReport: any, index:number) => {
                                return (
                                    <Row>
                                        <div style={{width: 'inherit'}}>
                                            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                                                <h3 className="span--title">{new Date(predictionReport.created).toLocaleDateString([], {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}</h3>
                                                <button aria-label="show obesity report button" id={index.toString()} onClick={(e: any) => {showObesityReport(e)}} className="button"> 
                                                    <p id={index.toString()} onClick={(e: any) => {showObesityReport(e)}}><img alt="view" id={index.toString()} onClick={(e: any) => {showObesityReport(e)}} className="img" src="/assets/images/view.png"/>View Full Report</p>
                                                </button>
                                            </div>
                                            <h4 className="sub-title">Prediction</h4>
                                           
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
                                                    <button aria-label="submit feedback button" id={index.toString()} className="button" onClick={(e: any) => {showObesityReport(e)}}><img alt="add" className="img" src="/assets/images/add-grey.png"/>Write Feedback</button> 
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
                                    <button aria-label="go to edit diagnosis and comments section button" onClick={() => history.push(`/patient/edit/${encode(patientInformation.patientID)}/${encode(4)}`)} className="button"> 
                                        <a href={`/patient/edit/${encode(patientInformation.patientID)}/${encode(4)}`}><img alt="edit" className="img" src="/assets/images/edit-dark.png"/>Edit Diagnosis & Comments</a>
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
                          
                        </div>
                    }
                </Container>
                </Radium.StyleRoot> 
                
              
            </div> : <LoadingPage />} 
        </div>
            
    )
}

export default ViewPatientPage;