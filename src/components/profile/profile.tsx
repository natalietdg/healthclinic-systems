import React, { useState, useEffect } from 'react';
import { Row, TextInput, SelectInput, AlertBox, SearchInput, ImageUpload, DateInput } from 'Components/shared';
import { useTranslation } from 'react-i18next';
import './profile.scss';

interface ProfileProps {

}

const Profile: React.FC<ProfileProps> = () => {
    const [ profileInformation, setProfileInformation ] = useState<any>({ username: '', password: '', confirmPassword: '', profilePicBlob: {}});
    const [ error, setError ] = useState<any>({});
    const { t } = useTranslation();

    const handleTextChange = (name: string, value: any) => {
        // console.log('name', name);
        // console.log('value', value);
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

    const handleImageChange = (name: string, blob: Blob) => {
        setProfileInformation({
            ...profileInformation, [name]: blob
        })
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
                    <Row>
                        <div style={{width: 'inherit'}}>
                            <TextInput type="password" onChange = {handleTextChange} value={profileInformation?.password} required error={!!error?.password} name="password" label={t('label.password')} />
                            <AlertBox error={error?.password} name={t('label.password')} />
                        </div>
                    </Row>
                    <Row>
                        <div style={{width: 'inherit'}}>
                            <TextInput type="password" required error={!!error.confirmPassword} label={t('label.confirmPassword')} name='confirmPassword' value={profileInformation.confirmPassword} onChange={handleTextChange}/>
                            <AlertBox error={error?.confirmPassword} name={t('label.confirmPassword')} />
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
            </div>
        </div>
    )
}

export default Profile;