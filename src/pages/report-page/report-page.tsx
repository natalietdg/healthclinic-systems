import React , { useEffect, useState }from 'react';
import DisplayReport from 'Components/report/display-report';
import { fetchReport } from 'Services/patient.services';
import { useParams } from 'react-router-dom';
import { fetchBackground } from 'Services/background.services';
import Radium from 'radium';
import { styles } from 'Components/shared/animation';
import { decode } from 'Helpers/';
import { Toaster } from 'Components/shared';
import './report-page.scss';
import report from 'Components/report';
import { Helmet } from 'react-helmet';

const ReportPage = ({}) => {
    const [patientData, setPatientData] = useState<any>({});
    const [toasterProps, setToasterProps ] = useState<any>({type: '', message: ''});
    const [ bg, setBg ] = useState<any>({});
    const url = useParams();
    const { id }:any = useParams();
    const reportID = id? decode(id): undefined;
    
    const getBackground = async() => {
        const response = await fetchBackground();
        setBg(response);
    }                                                                                                                                                                       

    const fetchPatientReport = async(reportID: string | undefined) => {

        if (reportID != null && reportID!='') {
            const response = await fetchReport(reportID);

            if(!response.error) {
                setPatientData(response);
            }
            else {
                setToasterProps({
                    type: 'errors',
                    message: "Unable to fetch patient's report."
                })
            }
        }
       
    }
    useEffect(()=> {
        getBackground();
        fetchPatientReport(reportID);                                                                                    
    },[])
    return(
        <div className="report-page-bg" style={{backgroundImage:`url(${bg['vertical-bg-3']?.imageUrl})`}}>
            <Helmet><title>Report Page</title></Helmet>
            <Toaster toasterID="reportPage-toaster" style={{...styles.fadeInRight}} props={toasterProps}/>
            <div className="report-page">
                <DisplayReport patientData={patientData}/>
            </div>
        </div>
    )
}

export default ReportPage; 