import React, { useState } from 'react';
import TextInput from 'Components/shared/text-input';
import { useHistory } from 'react-router-dom';
import './fetch-report.scss';
import {encode} from 'Helpers/';
const FetchReport: React.FC = ({}) => {
    const [ reportNumber, setReportNumber ] = useState('');
    let history = useHistory();
    const [ error, setError ] = useState<any>({});

    function handleChange(name: string, value: string) {
        console.log('')
        console.log('value', value);
        setReportNumber(value);
    }
    
    const fetchReport = () => {
        // const reportID = encode(123);
        console.log('pushh');
        history.push('/report/'+encode(reportNumber));
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
                <button className="button" onClick={fetchReport}>View Report</button>
            </div>
        </div>
    )
}

export default FetchReport;