import React, { useEffect, useState } from 'react';
import './ml-prediction-report-page.scss';
import { useParams } from 'react-router-dom';
import { fetchBackground } from 'Services/background.services';

interface MLPredictionReportPageProps {
    data: any;
}
const MLPredictionReportPage: React.FC<MLPredictionReportPageProps> = ({data}) => {
    const [reportData, setReportData] = useState<any>({});
    const [ bg, setBg ] = useState<any>({});

    const getBackground = async() => {
        const response = await fetchBackground();
        setBg(response);
    }

    useEffect(() => {
        getBackground();
    },[]);

    useEffect(() => {
        setReportData(data);
    }, [data]);

    return (
        <div className="ml-prediction-report-page-bg" style={{backgroundImage:`url(${bg['vertical-bg-2']?.imageUrl})`}}>
            <div className="ml-prediction-report-page">
                <h2>Obesity Prediction Report</h2>
            </div>
        </div>
    )
}

export default MLPredictionReportPage;