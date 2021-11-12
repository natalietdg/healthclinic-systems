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

    useEffect(() => {
        if(loginError?.message!='') {
            // console.log('loginError.error', loginError?.message);
            setError({login: loginError?.message});
        }
    }, [loginError])

    const handleChange = (name: string, value: any) => {
        setLoginInput({...loginInput, [name]: value});
        setError({});
    }

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
        catch(err: any) {
            var { path, message, type }:any = err;
           
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
            // console.log('errorArray', errorArray);
            setError(errorArray);

            if (document.querySelector(`input[name=${path}]`)) {
                (document.querySelector(`input[name=${path}]`) as HTMLInputElement).focus();
            }
            else if (document.querySelector(`div[name=${path}]`)) {
                (document.querySelector(`div[name=${path}]`) as HTMLInputElement).focus();
            }
        }
    }

    // useEffect(() => {
    //     console.log('error', error);
    // },[error])

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