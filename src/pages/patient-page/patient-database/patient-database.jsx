import React, { useState, useEffect } from 'react';
import PatientDatabse from 'Components/patient-database';
import  { fetchPatientList } from 'Services/patient.services';
import { fetchBackground } from 'Services/background.services';

import './patient-database.scss';
const PatientDatabase = () => {
    const [ bg, setBg ] = useState({});
    const [patientList, setPatientList] = useState([]);
    const getBackground = async() => {
        const response = await fetchBackground();
        setBg(response);
    }

    const fetchPatients = async() => {
        const response = await fetchPatientList();
        console.log('response', response);
        setPatientList(response);
    }

    useEffect(()=> {
        getBackground();
        fetchPatients();
    },[])

    const submit = async(patientInformation) => {
        const response = await savePatientInformation(patientInformation);
        console.log('response', response);
    }

    // const tableData = 
    //     [
    //         {
    //             ID: '123132',
    //             'First Name': <><a href='https://www.google.com'>angelina jolie</a></>,
    //             'Last Edited': '20/10/2018',
    //             'Form Status': 'In Progress',
    //             'Predictive Report Status': 'Completed',
    //             "": <div style={{display: 'flex'}}>
    //                     <button onClick={showOptions}>
    //                         <img src="/assets/images/menu-vertical.png" />
    //                     </button>
    //                     <span id="span">
    //                         <a href="https://google.com">google</a><br></br>
    //                         <a href="https://google.com">mika</a>
    //                     </span>
    //                 </div>
    //         },
    //         {
    //             ID: '123134',
    //             'First Name': <><a href='https://www.google.com'>kun</a></>,
    //             'Last Edited': '20/10/2018 10.42am',
    //             'Form Status': 'In Progress',
    //             'Predictive Report Status': 'Completed',
    //             "": <div style={{display: 'flex'}}>
    //             <button onClick={showOptions}>
    //                 <img src="/assets/images/menu-vertical.png" />
    //             </button>
    //             <span id="span2">
    //                 <a href="https://google.com">google</a><br></br>
    //                 <a href="https://google.com">mika</a>
    //             </span>
    //             </div>
    //         }
    //     ]
    

    return (
        <div className="patient-database-bg" style={{backgroundImage:`url(${bg['vertical-bg-3']?.imageUrl})`}}>

            {/* <div style={{backgroundPositionY: '1128px', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', width: '100%', height: '20%', alignContent: 'center', alignItems: 'center'}}>   
                <h2>Patient Database</h2>
            </div> */}
            <div className="patient-database">
                <PatientDatabse patients={patientList}/>    
            </div>
           
        </div>
    )
}

export default PatientDatabase;