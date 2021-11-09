import React, { useEffect, useState } from 'react';
import { Modal, Toaster } from 'Components/shared';
import { TextInput, AlertBox } from 'Components/shared';
import { useHistory } from 'react-router-dom';
import './fetch-report.scss';
import {encode} from 'Helpers/';
import { styles } from 'Components/shared/animation';
import { IgnorePlugin } from 'webpack';

interface FetchReportProps {
    onFetch: (data:any) => void;
    error: any;
    
}

const FetchReport: React.FC<FetchReportProps> = ({onFetch, error}) => {
    
    const [ reportNumber, setReportNumber ] = useState('');

    function handleChange(name: string, value: string) {
        setReportNumber(value);
    }
    
    
    
    return(
        <div className="report-container">
            <div>
                <h1 className="homepage-title">Application for<br/>Healthcare<br/>Intervention</h1>
                <p className="homepage-subtitle">Caring for your needs, one step at a time</p>
            </div>
            <div className="block">
                <h3 className="heading">Are you a <label style={{color: '#8f60df'}}>patient</label>?</h3>
                <TextInput name="reportNo" value={reportNumber} label='Please key in your report number here.' error={error?.reportNo} onChange={handleChange} />
                <AlertBox name="reportNo" error={error?.reportNumber}/>
                <button className="button" onClick={()=> {onFetch(reportNumber)}}>View Report</button>
            </div>
            
        </div>
    )
}

export default FetchReport;