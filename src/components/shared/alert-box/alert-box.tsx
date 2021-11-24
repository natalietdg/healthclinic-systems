import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './alert-box.scss';
import { isEmpty } from 'lodash';

interface AlertBoxProps {
    error: any;
    name: any;
}

const AlertBox: React.FC<AlertBoxProps> = ({error, name}) => {   
    useEffect(()=> {
        (document.querySelectorAll('.alert-box')).forEach(alertBox => (alertBox as HTMLElement).style.setProperty('--alert-box-display', 'none'));
    },[]);

    useEffect(()=> {
        
        if(error) {
            (document.querySelectorAll('.alert-box')).forEach(alertBox => (alertBox as HTMLElement).style.setProperty('--alert-box-display', 'block'));
        }
    },[error]);

    return (
        <div className="alert-box">
            <div className={classNames({error: !!error})}>
                <p>{error}</p>
            </div>
        </div>
    )
}
export default AlertBox;