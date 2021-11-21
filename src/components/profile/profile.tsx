import React, { useState, useEffect } from 'react';
import { Row, TextInput, SelectInput, AlertBox, SearchInput, ImageUpload, DateInput } from 'Components/shared';
import { useTranslation } from 'react-i18next';
import './profile.scss';

interface ProfileProps {
    profileData: any;
    onSubmit: (data: any) => void;
}

const Profile: React.FC<ProfileProps> = ({ profileData, onSubmit }) => {
    const [ profileInformation, setProfileInformation ] = useState<any>({ username: '', profilePicBlob: ''});
    const [ error, setError ] = useState<any>({});
    const { t } = useTranslation();

    useEffect(() => {
        setProfileInformation({...profileData});
    },[profileData])

    const handleTextChange = (name: string, value: any) => {
        setError({});
        if(name.indexOf('.')!==-1) {
            let subName = name.split('.')[1]
            name = name.split('.')[0];

            setProfileInformation({...profileInformation, [name]: {
                ...profileInformation[name],
                [subName]: value
            }});

            return;
        }
        setProfileInformation({...profileInformation, [name]: value });
    }

    const handleImageChange = (action: string, name: string, blob: Blob) => {
        setProfileInformation({
            ...profileInformation, [name]: blob
        });

        let tempData = {
            ...profileInformation,
            [name]: blob
        }

        onSubmit(tempData);
    }

    const save = (e: any) => {
        e.preventDefault();
        
        onSubmit(profileInformation);
    }

    return (
        <div className="profile">
            <div className="pane">  
            <div className="header">
                <h3>Edit Profile</h3>
            </div>
            <div className="divider">
                <div className="divider--fifty">
                    <Row>
                        <div style={{width: 'inherit'}}>
                            <TextInput onChange = {handleTextChange} value={profileInformation?.username} required error={!!error?.username} name="username" label={t('label.username')} />
                            <AlertBox error={error?.username} name={t('label.username')} />
                        </div>
                    </Row>
                   
                </div>
                <div className="divider--fifty">
                    <Row>
                        <div style={{width: 'inherit'}}>
                            <ImageUpload onChangeImg={handleImageChange} name="profilePicBlob" blob={profileInformation?.profilePicBlob}/>   
                        </div>
                    </Row>
                </div>
            </div>
            <Row><button className="save" onClick={save}>Save</button></Row>
            </div>
        </div>
    )
}

export default Profile;