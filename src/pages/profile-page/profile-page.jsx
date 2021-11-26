import React, { useState, useEffect } from 'react';
import { fetchBackground } from 'Services/background.services';
import { Toaster } from 'Components/shared';
import { styles } from 'Components/shared/animation';
import { fetchProfile, updateProfile } from 'Services/profile.services';
import { Profile } from 'Components/';
import './profile-page.scss';
import { Helmet } from 'react-helmet';


const ProfilePage = ({}) => {
    const [ bg, setBg ] = useState({});
    const [ toasterProps, setToasterProps ] = useState({type: '', message: ''});
    const [profileInformation, setProfileInformation] = useState({
        profileID: -1,
        image: '',
        ic:  -1,
        name:  '',
        email: '',
        phone: '',
        gender:  '',
        race:  '',
        dob:  '',
        userID: -1,
    });
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
            profileID: profileInfo.profileID,
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

             setTimeout(() => {
                location.reload();
            }, 3000);

            setProfileInformation(response);
        }

    }

    return (
        <div className="profile-page-bg" style={{backgroundImage:`url(${bg['vertical-bg']?.imageUrl})`}}>
            <Helmet><title>Profile Page</title></Helmet>
            <Toaster style={{...styles.fadeInRight}} toasterID="profile-page-toaster" props={toasterProps}/>
            <div className="profile-page">
                <Profile profileData={profileInformation} onSubmit={submit} />
            </div>
            
        </div>
    )
}

export default ProfilePage;