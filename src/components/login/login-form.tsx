import React, { useState, useEffect } from 'react';
import './login.scss';
import { LoginFormValidation } from './login-form.validation';
import { TextInput, AlertBox } from 'Shared/index';
import errorHandler from 'Utils/error-handler';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

interface LoginFormProp {
    loginError: any;
    onConfirm: (data: any) => void;
}

const LoginForm: React.FC<LoginFormProp> = ({loginError, onConfirm}) => {
    const { t } = useTranslation();
    const initialLoginInput = {
        username: '',
        password: '',
    }

    const [ loginInput, setLoginInput ] = useState(initialLoginInput);
    const [ error, setError ] = useState<any>({});

    const handleChange = (name: string, value: any) => {
        setLoginInput({...loginInput, [name]: value});
        setError({});
    }

    useEffect(()=> {
        if(loginError != {}) setError({ login: loginError});
    },[loginError])

    const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try{
           
            const value = LoginFormValidation.validateSync(loginInput, {
                strict: true,
                abortEarly: false,
                stripUnknown: false
            });
            
            onConfirm(value);

        }
        catch(err) {
            let { path, message, type }:any = err;
        console.log('path', path);
            let value = '';
            if (message.includes('Passwords') && message.includes('match')) {
                setError({...error, [path]: message });
            }
            else {

                ({path, value} = errorHandler.validation(err)) || {};
                console.log('path', path);
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
                        <AlertBox error={error?.login} name={t('label.login')} />
                    </div>
                    <div className="div">
                        <TextInput required error={!!error.username} label={t('label.username')} name='username' value={loginInput.username} onChange={handleChange} />
                        <AlertBox error={error?.username} name={t('label.username')} />
                    </div>
                    <div className="div">
                        <TextInput type="password" required error={!!error.password} label={t('label.password')} name='password' value={loginInput.password} onChange={handleChange}/>
                        <AlertBox error={error?.password} name={t('label.password')} />
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