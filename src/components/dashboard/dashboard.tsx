import React, { useEffect, useState } from 'react';
import { fetchBackground } from 'Services/background.services';
import { Container } from 'Components/shared';
import './dashboard.scss';

interface DashboardProps {

}

const Dashboard:React.FC<DashboardProps> = ({}) => {
    const [ bg, setBg ] = useState<any>({});
    const [ user, setUser ] = useState<any>({name: 'Natalie'});

    const fetchProfile = () => {

    }

    const getBackground = async() => {
        const response = await fetchBackground();
        console.log('response', response);
        setBg(response);
    }

    useEffect(()=> {
        getBackground();
    },[])

    
    return (
        <div className="dashboard-bg" style={{backgroundImage: `url(${bg['vertical-bg']?.imageUrl})`}}>
            <div className="dashboard">
                <h3>Application for Healthcare Intervention</h3>
                <p>Hi, {user.name}</p>
                <div>
                    <h3> Quick Access </h3>
                    <Container flexDirection="row">
                        <button><img src="/assets/images/new-patient.png" />Add New Patient</button>
                        <button><img src="/assets/images/users.png" />Patient Database</button>
                        <button><img src="/assets/images/machine-learning.png" />Generate Report</button>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;