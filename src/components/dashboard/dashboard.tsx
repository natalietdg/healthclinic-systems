import React, { useEffect, useState, Suspense } from 'react';
import { Table, Toaster } from 'Components/shared';
import { useHistory } from 'react-router-dom';
import { fetchPatientList } from 'Services/patient.services';
import { fetchBackground } from 'Services/background.services';
import { Container } from 'Components/shared';
import { styles } from 'Components/shared/animation';
import Radium from 'radium';
import '../'
import './dashboard.scss';

interface DashboardProps {

}

const Dashboard:React.FC<DashboardProps> = ({}) => {
    var loaded = false;
    let history = useHistory();
    const [ toaster, setToaster ] = useState<any>({ type: '', message: ''});
    const [ bg, setBg ] = useState<any>({});
    const [ miniPatientList, setMiniPatientList ] = useState<any>([]);
    const [ user, setUser ] = useState<any>('Natalie');

    const fetchProfile = () => {

    }

    const fetchPatients = async() => {
        const response:any = await fetchPatientList();

        if(response.error) {
            setToaster({
                type: 'errors',
                message: 'Failed to fetch patients'
            })
        }
        else {
            let tempPatient = (response.map((patient:any, index:any)=> {
                if(index < 5) {
                    return {
                        ...patient,
                        'Full Name': patient.fullName,
                        ID: patient.patientID
                    }
                }
                
            })).filter((patient: any)=> {
                return patient != null || patient != undefined
            })
            setMiniPatientList(tempPatient);
        }
    }

    const getBackground = async() => {
        const response = await fetchBackground();
        console.log('response', response);
        setBg(response);
    }

    useEffect(()=> {
        fetchPatients();
        getBackground();
        const username = localStorage.getItem('user');
        setUser(username);
        const csrfToken = localStorage.getItem('csrfToken');

        console.log('csrfToken', csrfToken);
        setToaster({type: 'error', message: 'test'})
    },[])

    
    return (
      
        <div className="dashboard-bg" style={{backgroundImage: `url(${bg['vertical-bg']?.imageUrl})`}}>
             <Toaster toasterID="dashboard-toaster" style={{...styles.fadeInRight}} props={toaster}/>
            
        
            <div className="dashboard">
                <h2>Hi, <span style={{ color: '#7e4ed1'}}> {user}</span> </h2> {/* , borderBottom: '1px solid purple' */}
                <div className="page-container--row">
                    <div className="page-container--sixty">
                        <div className='sub-container'>
                            <h3>Today's Patients</h3>
                            
                                {/* <PatientDatabse patients={[]} columnProps={[{colName: 'ID'}, {colName: 'Full Name'}]}/> */}
                                
                                    <Table filteredData={miniPatientList} columns={[{colName: 'ID'}, {colName: 'Full Name'}]} />
                                
                                
                            
                        </div>
                    </div>
                    <div className="page-container--forty">
                        <div className='sub-container'>
                            <h3> Quick Access </h3>
                            <Container flexDirection="row">
                                <button onClick={()=> {history.push('/new-patient')}}><img src="/assets/images/new-patient.png" />Add New Patient</button>
                                <button onClick={()=> {history.push('/patients')}}><img src="/assets/images/users.png" />Patient Database</button>
                                {/* <button onClick={()=> {history.push('/new-patient')}}><img src="/assets/images/machine-learning.png" />Generate Report</button> */}
                            </Container>
                        </div>
                    </div>
                </div>
                
            </div>
        
        </div>
        
    )
}

export default Dashboard;