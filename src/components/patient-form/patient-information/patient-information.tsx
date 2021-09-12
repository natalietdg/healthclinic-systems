import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './patient-information.scss';
import { Container, Page } from 'Components/shared';
import PagePane from 'Components/shared/page/page-pane'
import { TextInput, AlertBox } from 'Components/shared';
interface PatientInformation {

}

const PatientInformation:React.FC<PatientInformation> = ()=> {
    const [ pageVisibility, setPageVisibility ] = useState(0);
    const [maxSize, setMaxSize] = useState(0);
    const [ error, setError ] = useState<any>({});
    const { t } = useHistory();

    const nextPage = () => {
        if (pageVisibility < maxSize - 1) {
            setPageVisibility(pageVisibility + 1);
        }
    }

    const prevPage = () => {
        if (pageVisibility > 0) {
            setPageVisibility(pageVisibility - 1);
        }
    }


    return (
        <div className="patient-info">
            <div className="content">
                <h3>Add a New Patient</h3>
                <Page visibility= {pageVisibility} numOfChildren={setMaxSize}>
                    <PagePane index={0}>
                        <div>
                            <TextInput required error={error?.fullName} label={t('label.fullName')} />
                            <AlertBox />
                        </div>
                    </PagePane>
                    <PagePane index={1}>
                    </PagePane>
                </Page>
                <button onClick={nextPage}>Next</button>
                <button onClick={prevPage}>Prev</button>
                
            </div>
        </div>
    )
}

export default PatientInformation;