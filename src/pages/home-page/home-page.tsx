import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { isEmpty } from 'lodash';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useHistory } from "react-router-dom";
import { fetchBackground } from 'Services/background.services';
import { login } from 'Services/auth.services';
import { Modal, toaster } from 'Shared/index';
import { LoginForm } from 'Components/index';
import { loginAtom, LoginAtomType } from "Recoil/login.atom";
import { encode } from "Helpers/";
import './home-page.scss';
import FetchReport from 'Components/report/fetch-report';

interface HomePageProp {

}

const HomePage: React.FC<HomePageProp> = ({}) => {
    const [ homePage, setHomePage ] = useState({ imageUrl: '' });
    const [ error, setError ] = useState<any>('');
    const [ loginState, setLoginState ] = useRecoilState<LoginAtomType>(loginAtom);
    let history = useHistory();
    const [ modalVisibility, setModalVisibility ] = useState(false);

    useEffect(()=> {
        getBackground();
    },[])

    useEffect(()=> {
        if(loginState.state=='success') {
            setTimeout(function() {
                history.push('home');
            }, 3000);
        }
    },[loginState])

    const getBackground = async() => {
        const response = await fetchBackground();
        
        setHomePage(response.home);
        return response;
    }

    const signIn = async(data: any) => {
        if (!isEmpty(data))  {
        //submit form data
            try{
                const response:any = await login(data);
                console.log('response', response);
                if(!response.error) {
                    toaster('success', "Login Success!");
                    // console.log('data', data);
                    // const url = "dashboard";
                    setLoginState({state: 'success'});
                    toggleModalVisibility(false);
                }
                else {
                    // console.log('here');
                    toaster("errors", response.error.message);
                    setLoginState({state: 'error'});
                    setError(response.error.message);
                }
            }
            catch(err) {

            }
            
        }
    }

    function toggleModalVisibility(visible: boolean) {
        setModalVisibility(visible);
    }

    
    
    return (
        <div id="homepage" className="homepage-bg homepage" style={{backgroundImage: `url(${homePage?.imageUrl})`}}>
            <HelmetProvider>
                <Helmet>
                    <title>Application for Healthcare Intervention</title>
                    <meta name="description" content="Caring about your needs, one step at a time." />
                </Helmet>
                <div>
                    <button className="login-button" onClick={()=> toggleModalVisibility(true)}>Staff Login</button>
                    <Modal onClose={toggleModalVisibility} visible={modalVisibility}>
                        <LoginForm loginError={error} onConfirm={signIn} />
                    </Modal>
                </div>
                <FetchReport />
            </HelmetProvider>
        </div>
    )
}

export default HomePage;