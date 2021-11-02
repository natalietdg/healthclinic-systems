import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { encode, generateTodaysDate } from 'Helpers/';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { refreshAccessToken } from 'Services/auth.services';
import {Toaster} from 'Components/shared'
import { dateAtom, DateType } from 'Recoil/date.atom';
import Radium from 'radium';
import { styles } from 'Components/shared/animation';
import { loginAtom, LoginAtomType } from 'Recoil/login.atom';
import { fetchBackground } from 'Services/background.services';
import { logout } from 'Services/auth.services';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useQuery} from 'src/hooks';
import { Links } from 'src/links';
import './navbar.scss';
import { isFSA } from '@reduxjs/toolkit/dist/createAction';

interface NavbarProps {
    navbar: any;
}

const Navbar: React.FC<NavbarProps> = ({navbar}) => {
    const [logoutState, setLogoutState] = useRecoilState<LoginAtomType>(loginAtom);
    const [ dates, setDates ] = useRecoilState<DateType>(dateAtom);
    const [ todaysDate, setTodaysDate ] = useState<any>('');
    const [ expiryDate, setExpiryDate ] = useState<any>('');
    const [ toaster, setToaster ] = useState<any>({
        message: '',
        type: ''
    });
    let location = useLocation();
    let history = useHistory();
    const { t } = useTranslation();
    // console.log('location', location);
    // const query = useQuery();
    // const ref = query.get('ref');
    var name = '';
  
    const refresh = async() => {
     
        const response:any = await refreshAccessToken();
        if (response.error) {
            setToaster({
                type: 'errors',
                message: 'Could not refresh token'
            })
        }
        return response;

    }

    useEffect(()=> {
        if(logoutState.state!='success') {
            const response: any = refresh();

            if(response.error) history.push('/');
        }
    },[])

    useEffect(()=> {
        if (dates.todaysDate =='') {
            let tempDates = generateTodaysDate();

            setDates({
                todaysDate: tempDates.todayDate,
                expiryDate: tempDates.todayDate
            });
        }
    },[])
    
    // var todaysDate: any = new Date();
    // var expiryDate: any = localStorage.getItem('futureDate') || null;

    // if(null) expiryDate = generateTodaysDate().expiryDate;
    var path = location.pathname.split('/')[1];

    if(location.pathname.split('/')[2]) path = "patients-for-today";

    // if(futureDate > todaysDate) {
    //     console.log('bigger');
    // }
    // else {
    //     console.log('smaller');
    // }
    // const removeItem = () => {
    //     const patient = localStorage.getItem('patient');
    //     const fullName = localStorage.getItem('fullName');
    //     // if(patient) localStorage.removeItem('patient');
    //     // if(fullName) localStorage.removeItem('fullName')
    // }

    if(typeof(localStorage) !== 'undefined' && (path == 'patient' || path == "patients-for-today")) {
        // removeItem();
        // console.log('storage', localStorage);
        const values = Object.keys(localStorage);

        // console.log('values', values);
        const response = localStorage.getItem("fullName");
        console.log('response storage', response);
        if (response != null || response != undefined) name = response;
    }
    // else {
    //     console.log('error in storage');
    // }

    const pageName = name != ''? name : t(`path.${path}`);
    // console.log('ref', ref);
    // console.log('ref', query);

    const logOut = async() => {
        const response: any = await logout();
        if(response?.error) {
            // toaster('errors', 'Logout error');
            setLogoutState({state: 'error'});
        }
        else {
            history.push('/');
            // toaster('success', 'Logout success');
            setLogoutState({state: 'idle'});
        }
    }

    const showDropdown = () => {
        (document.querySelector('.dropdown--ul') as HTMLElement).style.display = 'block';
    }

    const hideDropdown = () => {
        (document.querySelector('.dropdown--ul') as HTMLElement).style.display = 'none';
    }
    return (       
        <div className="navbar-bg"> {/*style={{backgroundImage: `url(${navbar['side-bar']?.imageUrl})`}}*/}
            <div className="blurred" > {/*style={{backgroundImage: `url(${navbar['side-bar-blurred']?.imageUrl})`}}*/}
            <Radium.StyleRoot>
                <Toaster style={{...styles.fadeInRight}} props={toaster}/>
            </Radium.StyleRoot>
            
            {/* <span><img style={{top: 0, width: '25px', height: '25px', paddingTop: '20px'}} src="/assets/images/menu.png"/></span> */}
                <ul className="link-list">
                    {
                        Links.map((link: any, index:number)=> {
                            return (link.name=='placeholder')? <h3 key={index}>{pageName}</h3> : link.name=='profile'? 
                            <li key={index} style={{padding: '7px'}}>
                               <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button  onMouseEnter={showDropdown} className="profile-button"><img className="profile" src="/assets/images/user.png" /></button>
                                    <ul onMouseLeave={hideDropdown} className="dropdown--ul">
                                        <li className="dropdown--li"><Link to="/profile">My Profile</Link></li>
                                        <li className="dropdown--li"><button onClick={logOut}>Logout</button></li>
                                    </ul>
                               </div>
                                
                            </li>
                            : link.name=='Patients for Today'? <li key={index}><Link key={index} to={`/patients/${dates.todaysDate}`}><span className="span">{link.name}</span></Link></li>
                            :<li key={index}><Link key={index} to={link.to}><span className="span">{link.name}</span></Link></li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar;