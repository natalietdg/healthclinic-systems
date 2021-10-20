import React, { useState, useEffect } from 'react';
import { fetchBackground } from 'Services/background.services';
import { Profile } from 'Components/';
import './profile-page.scss';


const ProfilePage = ({}) => {
    const [ bg, setBg ] = useState({});
    const [profileInformation, setProfileInformation] = useState({});
    
    useEffect(()=> {
        getBackground();
       
    },[])

    const fetchProfileInformation = () => {

    }

    const getBackground = async() => {
        const response = await fetchBackground();
        setBg(response);
    }

    return (
        <div className="profile-page-bg" style={{backgroundImage:`url(${bg['vertical-bg']?.imageUrl})`}}>
            <div className="profile-page">
                <Profile />
            </div>
            
        </div>
    )
}

export default ProfilePage;