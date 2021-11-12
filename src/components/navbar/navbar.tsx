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

interface NavbarProps {
    navbar: any;
}

const Navbar: React.FC<NavbarProps> = ({navbar}) => {
    const [logoutState, setLogoutState] = useRecoilState<LoginAtomType>(loginAtom);
    const [ dates, setDates ] = useRecoilState<DateType>(dateAtom);
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

    useEffect(() => {
        
        const interval = setInterval(() => {
            refresh();
        }, 240000); //4 minutes
        return () => clearInterval(interval);
      }, []);



    const refresh = async() => {
        const now = Math.trunc(new Date().getTime() /1000);
        // console.log('now', now);
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry') || -1;
        // console.log('accessTokenExpiry', accessTokenExpiry);
        if(now > accessTokenExpiry) {
            // alert('You are not logged in! Redirecting you to the home page...');
            setToaster({
                type: 'errors',
                message: 'You are not logged in! Redirecting you to the home page...'
            })
            setTimeout(function() {
                history.push('/');
            }, 3000);
            
        }
        else {
            const response:any = await refreshAccessToken();
            if (response.error) {
                // setToaster({
                //     type: 'errors',
                //     message: 'Could not refresh token'
                // })
                // alert('You are not logged in! Redirecting you to the home page...');
                setToaster({
                    type: 'errors',
                    message: 'You are not logged in! Redirecting you to the home page...'
                });
                setTimeout(function() {
                    history.push('/');
                }, 3000);
            }
        return response;
        }
        

    }

    useEffect(()=> {
        if(logoutState.state!='success') {
            const response: any = refresh();
            
            if(response.error) {
                // alert('You are not logged in! Redirecting you to the home page...');
                setToaster({
                    type: 'errors',
                    message: 'You are not logged in! Redirecting you to the home page...'
                })
                setTimeout(function() {
                    history.push('/');
                }, 3000);
            }
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
        // console.log('response storage', response);
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
            setToaster({
                type: 'success',
                message: 'Log out successful! Redirecting you to the home page...'
            });
            setTimeout(function() {
                history.push('/');
            }, 3000);
        }
        else {
            // alert('Log out successful! Redirecting you to the home page...');
            setToaster({
                type: 'success',
                message: 'Log out successful! Redirecting you to the home page...'
            });
            setTimeout(function() {
                history.push('/');
            }, 3000);
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
           
            <Toaster toasterID="navbar-toaster" style={{...styles.fadeInRight}} props={toaster}/>
         
            
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
                            // : link.name=='Patients for Today'? <li key={index}><Link key={index} to={`/patients/${dates.todaysDate}`}><span className="span">{link.name}</span></Link></li>
                            : link.name =='Generate Obesity Prediction Report'? <li key={index}><Link key={index} to={`/patient/edit/${encode(-1)}/${encode(1)}`}><span className="span">{link.name}</span></Link></li>
                            : link.img!='' ? <li key={index} style={{padding: "7px"}}><Link key={index} to={link.to}><span className="span"><img style={{boxShadow: '3px 5px 9px 0px rgb(0 0 0 / 25%)', borderRadius: '50%', padding: '5px'}} src={link.img} /></span></Link></li>
                            :<li key={index}><Link key={index} to={link.to}><span className="span">{link.name}</span></Link></li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar;