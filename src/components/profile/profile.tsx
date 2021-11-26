import React, { useState, useEffect } from 'react';
import { Row, TextInput, SelectInput, AlertBox, RadioInput, ImageUpload, DateInput } from 'Components/shared';
import { useTranslation } from 'react-i18next';
import { omitBy, isEmpty, isUndefined} from 'lodash';
import { ProfileFormValidation } from './profile-form.validation';
import errorHandler from 'Utils/error-handler';
import './profile.scss';

interface ProfileProps {
    profileData: any;
    onSubmit: (data: any) => void;
}

const Profile: React.FC<ProfileProps> = ({ profileData, onSubmit }) => {
    const [ profileInformation, setProfileInformation ] = useState<any>({ 
        profileID: -1,
        image: '',
        ic:  '',
        name:  '',
        email: '',
        phone: '',
        gender:  '',
        race:  '',
        dob:  '',
        userID: -1,
    });
    const [ error, setError ] = useState<any>({});
    const { t } = useTranslation();

    useEffect(() => {
        setProfileInformation({...profileData});
    },[profileData])

    const handleTextChange = (name: string, value: any) => {
        setError({});
        setProfileInformation({...profileInformation, [name]: value });
    }

    const handleImageChange = async(action: string, name: string, blob: Blob) => {

        try {
            const value = await ProfileFormValidation.validateSync(omitBy({
                ...profileInformation,
            }, (value)=> isEmpty(value) || value==='' || isUndefined(value)), {
                strict: true,
                abortEarly: false,
                stripUnknown: false
            });

            let tempData = {
                ...value,
                profileID: profileInformation.profileID,
                [name]: blob
            }
    
            setProfileInformation({
                ...profileInformation, [name]: blob
            });
            onSubmit(tempData);
        }
        catch(err: any) {

            if(err.inner) {
                var errorArray = err.inner.map((error: any) => {
                    let { path, value}: any = errorHandler.validation(error);
     
                     return {
                         [path] : t(`${value}`, {field: t(`label.${path}`)})
                     };
                 });
     
                 errorArray = errorArray.reduce(function(errorObj: any, curr: any) {
                     errorObj[Object.keys(curr)[0]] = Object.values(curr)[0]
                     return errorObj;
                 })
               
                 setError(errorArray);
            }
            
        }
    }

    const handleSelectRadio = (name: string, value: any) => {
        value = (value=='true' || value=='false')? (value==='true'): value;
        let tempError = error;
        if(tempError.hasOwnProperty(name)) tempError = _.omit(tempError, [name]);

        setError(tempError);

        if(name.indexOf('.')!==-1) {
            let subName = name.split('.')[1]
        
            name = name.split('.')[0];
            if (name.includes('personalInformation')) {
                setProfileInformation({...profileInformation, [subName]: value});
            }      
        }
        else {
            setProfileInformation({...profileInformation, [name]: value });
        }
    }

    const save = async(e: any) => {
        e.preventDefault();
        
        try {
            const value = await ProfileFormValidation.validateSync(omitBy({
                ...profileInformation,
            }, (value)=> isEmpty(value) || value==='' || isUndefined(value)), {
                strict: true,
                abortEarly: false,
                stripUnknown: false
            });

            let tempProfile = {
                ...value,
                profileID: profileInformation.profileID
            }

            onSubmit(tempProfile);
        }
        catch(err: any) {

            if(err.inner) {
                var errorArray = err.inner.map((error: any) => {
                    let { path, value}: any = errorHandler.validation(error);
     
                     return {
                         [path] : t(`${value}`, {field: t(`label.${path}`)})
                     };
                 });
     
                 errorArray = errorArray.reduce(function(errorObj: any, curr: any) {
                     errorObj[Object.keys(curr)[0]] = Object.values(curr)[0]
                     return errorObj;
                 })
               
                 setError(errorArray);
            }
            
        }
        
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
                            <TextInput onChange = {handleTextChange} value={profileInformation?.name} required error={!!error?.name} name="name" label={t('label.fullName')} />
                            <AlertBox error={error?.name} name={t('label.name')} />
                        </div>
                    </Row>

                    <Row>
                        <div style={{width: 'inherit'}}>
                            <TextInput onChange = {handleTextChange} value={profileInformation?.ic} required error={!!error?.ic} name="ic" label={t('label.ic')} />
                            <AlertBox error={error?.ic} name={t('label.ic')} />
                        </div>
                    </Row>

                    <Row>
                        <div style={{width: 'inherit'}}>
                            <TextInput onChange = {handleTextChange} value={profileInformation?.email} required error={!!error?.email} name="email" label={t('label.email')} />
                            <AlertBox error={error?.email} name={t('label.email')} />
                        </div>
                    </Row>

                    <Row>
                        <div style={{width: 'inherit'}}>
                            <TextInput onChange = {handleTextChange} value={profileInformation?.phone} required error={!!error?.phone} name="phone" label={t('label.phoneNumber')} />
                            <AlertBox error={error?.phone} name={t('label.phone')} />
                        </div>
                    </Row>

                    <Row style={{justifyContent: 'flex-start'}}>
                        <RadioInput 
                            multiple={false}
                            values={[
                                {
                                    name: 'male',
                                    label: t('option.male'),
                                    value: 'M'
                                },
                                {
                                    name: 'female',
                                    label: t('option.female'),
                                    value: 'F'
                                }
                            ]} 
                            defaultValue={profileInformation.gender}
                            required
                            error={!!error?.gender} 
                            name='gender' 
                            label={t('label.gender')} 
                            onSelect={handleSelectRadio} 
                        />
                        <AlertBox error={error?.gender} name={t('label.gender')} />
                    </Row>

                    <Row style={{justifyContent: 'flex-start'}}>
                        <RadioInput 
                            values={[
                                {
                                    name: 'chinese',
                                    label: t('option.chinese'),
                                    value: 'CH'
                                },
                                {
                                    name: 'malay',
                                    label: t('option.malay'),
                                    value: 'MA'
                                },
                                {
                                    name: 'indian',
                                    label: t('option.indian'),
                                    value: 'IN'
                                },
                                {
                                    name: 'other',
                                    label: t('option.other'),
                                    value: 'OT'
                                }
                            ]} 
                            multiple = {false}
                            defaultValue={profileInformation.race}
                            required 
                            error={error?.race} 
                            name='race' 
                            label={t('label.race')} 
                            onSelect={handleSelectRadio} 
                        />
                        <AlertBox error={error?.gender} name={t('label.gender')} />
                    </Row>

                    <Row>
                        <div style={{width: 'inherit'}}>
                                <DateInput value={profileInformation?.dob} required error={!!error?.dob} name='dob' label={t('label.dateOfBirth')} onChange={handleTextChange} />
                                <AlertBox error={error?.dob} name={t('label.dateOfBirth')} />
                            </div>
                        </Row>
                </div>
                <div className="divider--fifty">
                    <Row>
                        <div style={{width: 'inherit'}}>
                            <ImageUpload onChangeImg={handleImageChange} name="image" blob={profileInformation?.image}/>   
                        </div>
                    </Row>
                </div>
            </div>
            <Row><button aria-label="save profile button" className="save" onClick={save}>Save</button></Row>
            </div>
        </div>
    )
}

export default Profile;