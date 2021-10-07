import React, { useState, useEffect } from "react";
import { isEmpty } from 'lodash';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useHistory } from "react-router-dom";
import { fetchBackground } from 'Services/background.services';
import { Modal } from 'Shared/index';
import { LoginForm } from 'Components/index';
import { encode } from "Helpers/";
import './home-page.scss';
import FetchReport from 'Components/report/fetch-report';

interface HomePageProp {

}

const HomePage: React.FC<HomePageProp> = ({}) => {
    const [ homePage, setHomePage ] = useState({ imageUrl: '' });
    let history = useHistory();
    const [ modalVisibility, setModalVisibility ] = useState(false);

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
            console.log('data', data);
            const url = "new-patient";
            history.push(url);
            toggleModalVisibility(false);
        }
    }

    function toggleModalVisibility(visible: boolean) {
        setModalVisibility(visible);
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
                <FetchReport />
            </HelmetProvider>
        </div>
    )
}

export default HomePage;