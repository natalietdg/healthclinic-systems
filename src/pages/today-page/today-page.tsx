import React, { useState, useEffect } from 'react';
import { PatientDatabse } from 'Components/index';
import  { fetchPatientList } from 'Services/patient.services';
import { fetchBackground } from 'Services/background.services';
import { generateTodaysDate } from 'Helpers/';
import tempPatientData from 'src/data/patientData.json';
import './today-page.scss';

const TodayPatients = () => {
    const [ bg, setBg ] = useState<any>({});
    const [patientList, setPatientList] = useState<any>([]);
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
        
    },[])

    return (
        <div className="today-page-bg" style={{backgroundImage:`url(${bg['background']?.imageUrl})`}}>
             
             <div className="patient-database">
                <PatientDatabse patients={patientList} columnProps={columns}/>    
            </div>
        </div>

    )
}

export default TodayPatients;