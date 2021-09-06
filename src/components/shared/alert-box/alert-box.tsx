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
        console.log('error', error);
        console.log('!!error', !!error);
    },[error])

    return (
        <div className="alert-box">
            <div className={classNames({error: !!error})}>
                <p>{error}</p>
            </div>
        </div>
    )
}
export default AlertBox;