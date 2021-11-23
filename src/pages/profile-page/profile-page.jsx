import React, { useState, useEffect } from 'react';
import { fetchBackground } from 'Services/background.services';
import { Toaster } from 'Components/shared';
import { styles } from 'Components/shared/animation';
import { fetchProfile, updateProfile } from 'Services/profile.services';
import { Profile } from 'Components/';
import './profile-page.scss';


const ProfilePage = ({}) => {
    const [ bg, setBg ] = useState({});
    const [ toasterProps, setToasterProps ] = useState({type: '', message: ''});
    const [profileInformation, setProfileInformation] = useState({});
    const [ id, setID ] = useState(-1);
    
    useEffect(()=> {
        getBackground();
        fetchProfileInformation();
       
    },[])

    const fetchProfileInformation = async() => {
        const userID = localStorage.getItem('userID') || -1;
        const response = await fetchProfile(parseInt(userID));

        if(userID !== -1) {
            setID(userID)
        }

        if (response.error) {
            setToasterProps({
                type: 'errors',
                message: 'Failed to fetch your profile information.'
            })
        }
        else {
            setToasterProps({
                type: 'success',
                message: 'Profile fetched successfully'
            });
            setProfileInformation(response);
        }
    }

    const getBackground = async() => {
        const response = await fetchBackground();
        setBg(response);
    }

    const submit = async(profileInfo) => {

        let tempData = {
            ...profileInfo,
            userID: id
        }

        const response = await updateProfile(tempData);

        if (response.error) {
            setToasterProps({
                type: 'errors',
                message: 'Failed to update your profile.'
            })
        }
        else {
            setToasterProps({
                type: 'success',
                message: 'Profile updated successfully'
            });

            setProfileInformation(response);
        }

    }

    return (
        <div className="profile-page-bg" style={{backgroundImage:`url(${bg['vertical-bg']?.imageUrl})`}}>
            <Toaster style={{...styles.fadeInRight}} toasterID="profile-page-toaster" props={toasterProps}/>
            <div className="profile-page">
                <Profile profileData={profileInformation} onSubmit={submit} />
            </div>
            
        </div>
    )
}

export default ProfilePage;