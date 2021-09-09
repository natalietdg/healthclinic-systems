import React, { useState, useEffect } from 'react';
import './login.scss';
import { LoginFormValidation } from './login-form.validation';
import { TextInput, AlertBox } from 'Shared/index';
import errorHandler from 'Utils/error-handler';
import login from '.';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

interface LoginFormProp {
    onConfirm: (data: any) => void;
}

const LoginForm: React.FC<LoginFormProp> = ({onConfirm}) => {
    const { t } = useTranslation();
    const initialLoginInput = {
        staffID: '',
        password: '',
        confirmPassword: ''
    }

    const [ loginInput, setLoginInput ] = useState(initialLoginInput);
    const [ error, setError ] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInput({...loginInput, [e.target.name]: e.target.value});
        setError({});
    }

    const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try{
           
            const value = LoginFormValidation.validateSync(loginInput, {
                strict: true,
                abortEarly: true,
                stripUnknown: false
            });
            
            onConfirm(value);

        }
        catch(err) {
            let { path, message, type }:any = err;
          
            let value = '';
            if (message.includes('Passwords') && message.includes('match')) {
                setError({...error, [path]: message });
            }
            else {

                ({path, value} = errorHandler.validation(err));
                
                if (path.indexOf('.')!==-1) {
                    const str = path.split('.');
                    path = str[0];
                }

                setError({...error, [path]: t(`${value}`, { field: t(`label.${path}`)}) });
            }

            
            if (path.indexOf('.')!==-1) {
                const str = path.split('.');
                path = str[0];
            }

            if (document.querySelector(`input[name=${path}]`)) {
                (document.querySelector(`input[name=${path}]`) as HTMLInputElement).focus();
            }
            else if (document.querySelector(`div[name=${path}]`)) {
                (document.querySelector(`div[name=${path}]`) as HTMLInputElement).focus();
            }
        }
    }

    return (
        <div>
            <form className="login-form">
                <div className="form">
                    <h3 className="">Staff Sign In</h3>
                    <div className="div">
                        <TextInput required error={!!error.staffID} label={t('label.staffID')} name='staffID' value={loginInput.staffID} onChange={handleChange} />
                        <AlertBox error={error?.staffID} name={t('label.staffID')} />
                    </div>
                    <div className="div">
                        <TextInput required error={!!error.password} label={t('label.password')} name='password' value={loginInput.password} onChange={handleChange}/>
                        <AlertBox error={error?.password} name={t('label.password')} />
                    </div>  
                    <div className="div">
                        <TextInput required error={!!error.confirmPassword} label={t('label.confirmPassword')} name='confirmPassword' value={loginInput.confirmPassword} onChange={handleChange}/>
                        <AlertBox error={error?.confirmPassword} name={t('label.confirmPassword')} />
                    </div>
                </div>
                <div>
                    <button className="button" onClick={(event) => handleConfirm(event)}> Sign In </button>
                </div>
            </form>
        </div>
        
    )
}

export default LoginForm;