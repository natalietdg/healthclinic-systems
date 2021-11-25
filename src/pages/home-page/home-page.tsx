import React, { useState, useEffect } from "react";
import Radium from "radium";
import { useRecoilState } from "recoil";
import { isEmpty } from 'lodash';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useHistory } from "react-router-dom";
import { Toaster } from "Shared/index";
import { fetchBackground } from 'Services/background.services';
import { login } from 'Services/auth.services';
import { Modal, } from 'Shared/index';
import { LoginForm } from 'Components/index';
import { loginAtom, LoginAtomType } from "Recoil/login.atom";
import TermsAndConditionsPage from 'Pages/terms-and-conditions-page';
import { fetchReport } from 'Services/patient.services';
import { styles } from "Components/shared/animation";
import { encode } from "Helpers/";
import './home-page.scss';
import FetchReport from 'Components/report/fetch-report';

interface HomePageProp {

}

const HomePage: React.FC<HomePageProp> = () => {
    const [ toasterProps, setToasterProps ] = useState<any>({});
    const [ termsAndConditionsModal, setTermsAndConditionsModal ] = useState<any>(false);
    const [ reportNumber, setReportNumber ] = useState<any>('');
    const [ homePage, setHomePage ] = useState({ imageUrl: '' });
    const [ error, setError ] = useState<any>('');
    const [ loginState, setLoginState ] = useRecoilState<LoginAtomType>(loginAtom);
    let history = useHistory();
    const [ modalVisibility, setModalVisibility ] = useState(false);

    useEffect(()=> {
        getBackground();

        const user = localStorage.getItem('user') || '-1';
        const userID = localStorage.getItem('userID') || -1;
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry') || -1;
        if(user!='-1' && userID!=-1) {
            const now = Math.trunc(new Date().getTime() /1000);

            if(now < accessTokenExpiry) {
                setTimeout(function() {
                    history.push('/');
                }, 3000);
            }
        }
    },[])

    useEffect(()=> {
        if(loginState.state=='success') {
            setTimeout(function() {
                history.push('/home');
            }, 3500);
        }
    },[loginState])

    useEffect(()=> {
        if(toasterProps.type=='success' && reportNumber) {
            setTimeout(function() {
                history.push('/report/'+encode(reportNumber));
            }, 3500);
        }
    },[toasterProps])

    const getBackground = async() => {
        const response = await fetchBackground();
        
        setHomePage(response.home);
        return response;
    }

    const signIn = async(data: any) => {
        if (!isEmpty(data))  {
            try{
                const response:any = await login(data);
                if(!response.error) {
                    setToasterProps({
                        type: 'success',
                        message: 'Login Successful'
                    });

                    setLoginState({state: 'success'});
                    toggleModalVisibility(false);
                }
                else {
                    setLoginState({state: 'error'});
                    setError(response.error);
                    setToasterProps({
                        type: 'errors',
                        message: 'Login Failed. Please key in the correct username and password.'
                    });
                }
            }
            catch(err) {

            }
            
        }
    }

    function toggleModalVisibility(visible: boolean) {
        setModalVisibility(visible);
    }

    const fetchUserReport = async() => {
        setTermsAndConditionsModal(false);

        if(reportNumber !='') {
            const response = await fetchReport(reportNumber);

            if(response.error) {
                setError({reportNumber: 'Invalid report number.'});
                setToasterProps({
                    type: 'errors',
                    message: "Please double check the report number or request for assistance from our friendly staff."
                });
            }
            else {
                setToasterProps({
                    type: 'success',
                    message: "Redirecting you to your report."
                });
            }
        }
        else {
            setError({reportNumber: 'Cannot be empty.'});
        }
    }

    const openTermsAndConditionsModal = (reportNumber: string) => {
        setReportNumber(reportNumber);
        setTermsAndConditionsModal(true);
    }
    
    return (
        <Radium.StyleRoot>
            <div id="homepage" className="homepage-bg homepage" style={{backgroundImage: `url(${homePage?.imageUrl})`, ...styles.fadeIn}}>
                <Toaster toasterID="homepage.toaster" style={{...styles.fadeInRight}} props={toasterProps} />
                <Modal visible={termsAndConditionsModal} onClose={()=> {setTermsAndConditionsModal(false)}}>
                    <TermsAndConditionsPage />
                    <div className="terms-and-conditions-button">
                        <button aria-label="I agree with terms and conditions button" className="button" onClick={fetchUserReport}>I agree with the terms and conditions.</button>
                    </div>
                
                </Modal>
                <HelmetProvider>
                    <Helmet>
                        <title>Application for Healthcare Intervention</title>
                        <meta name="description" content="Caring about your needs, one step at a time." />
                    </Helmet>
                    <div>
                        <button aria-label="login button" className="login-button" onClick={()=> toggleModalVisibility(true)}>Staff Login</button>
                        <Modal onClose={toggleModalVisibility} visible={modalVisibility}>
                            <LoginForm loginError={error} onConfirm={signIn} />
                        </Modal>
                    </div>
                    <FetchReport error={error} onFetch={openTermsAndConditionsModal}/>
                </HelmetProvider>
            </div>
        </Radium.StyleRoot>
    )
}

export default HomePage;