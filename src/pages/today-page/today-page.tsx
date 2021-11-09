import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PatientDatabse } from 'Components/index';
import { Modal, TextArea, SearchInput } from 'Components/shared';
import  { fetchPatientList } from 'Services/patient.services';
import { fetchBackground } from 'Services/background.services';
import { generateTodaysDate } from 'Helpers/';
import tempPatientData from 'src/data/patientData.json';
import { useTranslation } from 'react-i18next';
import './today-page.scss';

const TodayPatients = () => {
    const [ bg, setBg ] = useState<any>({});
    const [ modalVisibility, setModalVisibility ] = useState<boolean>(false);
    const [ patientAndFeedback, setPatientAndFeedback ] = useState<any>({ feedback: '', patientID: '', user: ''})
    const [error, setError ] = useState<any>({});
    const [ searchOptions, setSearchOptions ] = useState<any>([]);
    const [patientList, setPatientList] = useState<any>([]);
    const { date, prediction }:any = useParams();
    const { t } = useTranslation();

    
    // const dates = generateTodaysDate();
    // const now = new Date();
    const columns = [
        {
            colName: 'ID'
        },
        {
            colName: 'Full Name'
        },
        {
            colName: 'Race',
        },
        {
            colName: 'Gender',
        },
        {
            colName: 'IC',
        },
        {
            colName: 'Email',
        },
        {
            colName: 'Phone Number',
        },
        {
            colName: 'Consultation Status',
        },
        {
            colName: 'Medical Report',
        },
      
        {
            colName: ''
        }
    ]
    const getBackground = async() => {
        const response = await fetchBackground();
        setBg(response);
    }

    const fetchPatients = async() => {
        const response:any = await fetchPatientList();
        // console.log('response', response);
        var todaysPatients:any = localStorage.getItem('todayPatients');
        todaysPatients = todaysPatients==undefined? undefined : JSON.parse(todaysPatients);
        
        if(response.length == 0 || response.error ) {
            setPatientList(tempPatientData);
            // setError({error: 'Unable to fetch patients'})
        }
        else {
            const searchPatientList = response.map((patient: any) => {
                let patientString = patient.fullName + ' - ' + patient.ic + ", " + patient.email + ', ' + patient.phoneNumber;
                return patientString;
            });

            setSearchOptions(searchPatientList);
            if(todaysPatients != undefined && todaysPatients != null) {
                // console.log('eek');

                var localStoragePatientIDs = todaysPatients.map((patient: any, index: any)=> {
                    return patient.patientID;
                })
                // console.log('localStoragePatientIDs', localStoragePatientIDs);

                var patients = response.filter((patient:any, index: any)=> {
                    return localStoragePatientIDs.includes(patient.patientID);
                });
    
                // console.log('patients', patients);
                setPatientList(patients);
            }
            else {
                setPatientList(response);
            }
            
            // else {
            //     console.log('eek2');
            //     setPatientList(tempPatientData);
            // }

            
        }
        
    }

    useEffect(()=> {
        getBackground();
        fetchPatients();
        if(prediction!=null && prediction !=undefined) {
            setModalVisibility(true);
        }
        
    },[]);

    const updatePredictionReportPatientAndFeedback = (visibility: boolean) => {
        setModalVisibility(visibility);
    }

    const handleUpdatePatientAndFeedback = (name: any, value: any) => {
        setPatientAndFeedback({[name]: value});
    }

    return (
        <div className="today-page-bg" style={{backgroundImage:`url(${bg['background']?.imageUrl})`}}>
             
             <div className="patient-database">
                <PatientDatabse visible={"Today"} patients={patientList} columnProps={columns}/>    
            </div>
            <Modal onClose={updatePredictionReportPatientAndFeedback} visible={modalVisibility}>
                <div>
                    <SearchInput label={t('label.patient')} searchOptions={searchOptions || []} name="patient" value={patientAndFeedback?.patientID} error={error?.patientID} onSearch={handleUpdatePatientAndFeedback}/>
                    <TextArea label={t('label.feedback')}name="feedback" value={patientAndFeedback.feedback} error={error?.feedback} onChange={handleUpdatePatientAndFeedback}/>
                </div>
            </Modal>
        </div>

    )
}

export default TodayPatients;