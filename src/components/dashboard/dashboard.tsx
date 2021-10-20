import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchBackground } from 'Services/background.services';
import { Container } from 'Components/shared';
import './dashboard.scss';

interface DashboardProps {

}

const Dashboard:React.FC<DashboardProps> = ({}) => {
    let history = useHistory();
    console.log('history',);
    const [ bg, setBg ] = useState<any>({});
    const [ user, setUser ] = useState<any>('Natalie');

    const fetchProfile = () => {

    }

    const getBackground = async() => {
        const response = await fetchBackground();
        console.log('response', response);
        setBg(response);
    }

    useEffect(()=> {
        getBackground();
        const username = localStorage.getItem('user');
        setUser(username);
    },[])

    
    return (
        <div className="dashboard-bg" style={{backgroundImage: `url(${bg['vertical-bg']?.imageUrl})`}}>
            <div className="dashboard">
                <h2>Hi, <span style={{ color: 'purple', borderBottom: '1px solid purple'}}> {user}</span> </h2>
                <div>
                    <h3> Quick Access </h3>
                    <Container flexDirection="row">
                        <button onClick={()=> {history.push('/new-patient')}}><img src="/assets/images/new-patient.png" />Add New Patient</button>
                        <button onClick={()=> {history.push('/patients')}}><img src="/assets/images/users.png" />Patient Database</button>
                        <button onClick={()=> {history.push('/new-patient')}}><img src="/assets/images/machine-learning.png" />Generate Report</button>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;