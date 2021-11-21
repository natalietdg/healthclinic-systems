import React, { useEffect, useState } from 'react';
import { generateTodaysDate } from 'Helpers/';
import { dateAtom, DateType } from 'Recoil/date.atom';
import { useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import { fetchBackground } from 'Services/background.services';
import { Container } from 'Components/shared';
import LoadingPage from 'Pages/loading-page/loading-page';
import { styles } from 'Components/shared/animation';
import Radium from 'radium';
import './dashboard.scss';

interface DashboardProps {

}

const Dashboard:React.FC<DashboardProps> = () => {
    let history = useHistory();
    const [ dates, setDates ] = useRecoilState<DateType>(dateAtom);
    const [ todaysDate, setTodaysDate ] = useState<any>('');
    const [ bg, setBg ] = useState<any>({});
    const [ user, setUser ] = useState<any>('Natalie');

    useEffect(()=> {
        if (dates.todaysDate =='') {
            let tempDates = generateTodaysDate();

            setDates({
                todaysDate: tempDates.todayDate,
                expiryDate: tempDates.todayDate
            });

            setTodaysDate(tempDates.todayDate);
        }
    },[])

    const getBackground = async() => {
        const response = await fetchBackground();
        setBg(response);
    }

    useEffect(()=> {
        getBackground();
        const username = localStorage.getItem('user');
        setUser(username);

    },[])

    return (
      <div>
          { user!='Natalie' ? 
           <Radium.StyleRoot>
            <div className="dashboard-bg" style={{backgroundImage: `url(${bg['vertical-bg']?.imageUrl})`, ...styles.fadeIn}}>
                    <div className="dashboard">
                        <h2>Hi, <span style={{ color: '#7e4ed1'}}> {user}</span> </h2>
                        <div className="page-container--row">
                           
                            <div className="page-container--full">
                                <div className='sub-container'>
                                    <h3> Quick Access </h3>
                                    <Container flexDirection="row">
                                        <button onClick={()=> {history.push('/new-patient')}}><img src="/assets/images/new-patient.png" />Add New Patient</button>
                                        <button onClick={()=> {history.push('/patients')}}><img src="/assets/images/users.png" />Patient Database</button>
                                    </Container>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                
                </div>
                </Radium.StyleRoot> : <LoadingPage />
            }
      </div>
        
        
    )
}

export default Dashboard;