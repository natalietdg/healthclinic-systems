import React, { useState, useEffect } from "react";
import { isEmpty } from 'lodash';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { fetchBackground } from 'Services/background.services';
import { Modal, TextInput, AlertBox } from 'Shared/index';
import { LoginForm } from 'Components/index';
import './home-page.scss';

interface HomePageProp {

}

const HomePage: React.FC<HomePageProp> = () => {
    const [ homePage, setHomePage ] = useState({ imageUrl: '' });
    const [ reportNumber, setReportNumber ] = useState('');
    const [ modalVisibility, setModalVisibility ] = useState(false);
    const [ error, setError ] = useState<any>({});
    
    const [ loginInput, setLoginInput ] = useState({
        staffID: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(()=> {
        getBackground();
    },[])

    const getBackground = async() => {
        const response = await fetchBackground();
        
        setHomePage(response.home);
        return response;
    }

    const signIn = (data: any) => {
        if (!isEmpty(data))  {
            //submit form data
            toggleModalVisibility(false);
        }
    }

    function toggleModalVisibility(visible: boolean) {
        setModalVisibility(visible);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setReportNumber(e.target.value);
    }
    
    return (
        <div className="homepage-bg homepage" style={{backgroundImage: `url(${homePage?.imageUrl})`}}>
            <HelmetProvider>
                <Helmet>
                    <title>Application for Healthcare Intervention</title>
                    <meta name="description" content="Caring about your needs, one step at a time." />
                </Helmet>
                <div>
                    <button className="login-button" onClick={()=> toggleModalVisibility(true)}>Staff Login</button>
                    <Modal onClose={toggleModalVisibility} visible={modalVisibility}>
                        <LoginForm onConfirm={signIn} />
                    </Modal>
                </div>
                <div className="container">
                    <div>
                        <h1 className="homepage-title">Application for<br/>Healthcare<br/>Intervention</h1>
                        <p className="homepage-subtitle">Caring for your needs, one step at a time</p>
                    </div>
                    <div className="block">
                        <h3 className="heading">Are you a <label style={{color: '#8f60df'}}>patient</label>?</h3>
                        <TextInput name="reportNo" value={reportNumber} label='Please key in your report number here.' error={error?.reportNo} onChange={(event) => handleChange(event)} />
                        <button className="button">View Report</button>
                    </div>
                </div>
            </HelmetProvider>
        </div>
    )
}

export default HomePage;