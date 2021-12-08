import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { encode } from 'Helpers/';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { refreshAccessToken } from 'Services/auth.services';
import {Toaster} from 'Components/shared'
import { fetchProfile } from 'Services/profile.services';
import { dateAtom, DateType } from 'Recoil/date.atom';
import { styles } from 'Components/shared/animation';
import { loginAtom, LoginAtomType } from 'Recoil/login.atom';
import { logout } from 'Services/auth.services';
import { Link } from 'react-router-dom';
import { Links } from 'src/links';
import './navbar.scss';

interface NavbarProps {
}

const Navbar: React.FC<NavbarProps> = ({}) => {
    const [logoutState, setLogoutState] = useRecoilState<LoginAtomType>(loginAtom);
    const [ timer, setTimer ] = useState<any>(false);
    const [ countDown, setCountDown ] = useState<any>(0);
    const [ toaster, setToaster ] = useState<any>({
        message: '',
        type: ''
    });
    const [image, setImage] = useState<any>('/assets/images/user.png');
    let location = useLocation();
    let history = useHistory();
    const { t } = useTranslation();
    var name = '';

    const fetch = async() => {
        const userID = localStorage.getItem('userID') || '-1';

        if(userID!=='-1') {
            const response = await fetchProfile(parseInt(userID));

            if(response.image!=null && response.image!='') {
                setImage(response.image);
            }
        }
        else {
            setToaster({
                type: 'errors',
                message: 'You are not logged in! Redirecting you to the home page...'
            });

            setTimeout(function() {
                setTimer(-1);
            }, 3000);
        }
        
    }

    useEffect(() => {
        if(timer==true) {
            setCountDown(setInterval(() => {
                if(countDown!=undefined || countDown!='undefined') {
                    alert('You have been idle for too long. Automtically logging you out now...');
                    logOut();
                    setTimer(-1);
                    setCountDown(clearInterval(countDown));
                }
                
            }, 900000))
        }
        else if(timer==false) {
            if(countDown!=undefined || countDown !='undefined') {
                setCountDown(clearInterval(countDown));
                setTimer(true);
            }
        }
        else if(timer==-1) {
            history.push('/');
        }
    },[timer])

    useEffect(() => {
        fetch();
        setTimer(true);
        setTimeout(() => {
            refresh();
        }, 240000); //4 minutes

        window.addEventListener('keydown', function() {
            setTimer(false);
        });
    
        window.addEventListener('mousemove', function() {
            setTimer(false);
        });
    
        window.addEventListener('scroll', function() {
            setTimer(false);
        });

      }, []);

    const refresh = async() => {
        const now = Math.trunc(new Date().getTime() /1000);
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry') || -1;
        if(now > accessTokenExpiry) {
            setToaster({
                type: 'errors',
                message: 'You are not logged in! Redirecting you to the home page...'
            })
            setTimeout(function() {
                setTimer(-1);
            }, 3000);
            
        }
        else {
            const response:any = await refreshAccessToken();
            if (response.error) {
                setToaster({
                    type: 'errors',
                    message: 'You are not logged in! Redirecting you to the home page...'
                });
                setTimeout(function() {
                    setTimer(-1);
                }, 3000);
            }
        return response;
        }
        

    }

    useEffect(()=> {
        if(logoutState.state!='success') {
            const response: any = refresh();
            
            if(response.error) {
                setToaster({
                    type: 'errors',
                    message: 'You are not logged in! Redirecting you to the home page...'
                })
                setTimeout(function() {
                    setTimer(-1);
                }, 3000);
            }
        }
    },[])
    
    var path = location.pathname.split('/')[1];

    if(typeof(localStorage) !== 'undefined' && (path == 'patient')) {
        const response = localStorage.getItem("fullName");
        if (response != null || response != undefined) name = response;
    }

    const pageName = name != ''? name : t(`path.${path}`);
    const logOut = async() => {
        const response: any = await logout();
        if(response?.error) {
            setLogoutState({state: 'error'});
            setToaster({
                type: 'success',
                message: 'Log out successful! Redirecting you to the home page...'
            });
            setTimeout(function() {
                setTimer(-1);
            }, 3000);
        }
        else {
            setToaster({
                type: 'success',
                message: 'Log out successful! Redirecting you to the home page...'
            });
            setTimeout(function() {
                setTimer(-1);
            }, 3000);
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
        <div className="navbar-bg">
            <div className="blurred" >
            <Toaster toasterID="navbar-toaster" style={{...styles.fadeInRight}} props={toaster}/>
            
                <ul className="link-list">
                    {
                        Links.map((link: any, index:number)=> {
                            return (link.name=='placeholder')? <h3 key={index}>{pageName}</h3> : link.name=='profile'? 
                            <li key={index} style={{padding: '7px'}}>
                               <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button aria-label="Profile button" onMouseEnter={showDropdown} className="profile-button"><img alt={link.aria} className="profile" src={image} /></button>
                                    <ul onMouseLeave={hideDropdown} className="dropdown--ul">
                                        <li className="dropdown--li"><Link to="/profile">My Profile</Link></li>
                                        <li className="dropdown--li"><button aria-label={link.aria} onClick={logOut}>Logout</button></li>
                                    </ul>
                               </div>
                                
                            </li>
                            : link.name =='Generate Obesity Prediction Report'? <li key={index}><Link aria-label={link.aria} key={index} to={`/patient/edit/${encode(-1)}/${encode(1)}`}><span className="span">{link.name}</span></Link></li>
                            : link.img!='' ? <li key={index} style={{padding: "7px"}}><Link aria-label='' key={index} to={link.to}><span className="span"><img alt='' style={{boxShadow: '3px 5px 9px 0px rgb(0 0 0 / 25%)', borderRadius: '50%', padding: '5px'}} src={link.img} /></span></Link></li>
                            :<li key={index}><Link key={index} to={link.to}><span className="span">{link.name}</span></Link></li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar;