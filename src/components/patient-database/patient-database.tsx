import React, { useState, useEffect } from 'react';
import { Table, Row, SearchInput } from 'Components/shared';
import { useTranslation } from 'react-i18next';
import './patient-database.scss';

interface PatientDatabseProps {
    patients: any;
}

const PatientDatabse: React.FC<PatientDatabseProps> = ({patients}) => {
    const [patientList, setPatientList ] = useState(patients);
    const { t } = useTranslation();
    const [filter, setFilter] = useState<any>();

    const showOptions = (e: any) => {
       const selector =  e.target.parentElement.nextElementSibling;
        if(selector.style.display=='none') selector.style.display = 'flex';
        else selector.style.display = 'none';
    }

    const handleSearchChange = (name: string, value: any) => {
        setFilter(value);
    }
   
    const tableData: any = 
        [
            {
                ID: '123132',
                'Full Name': <><a href='https://www.google.com'>angelina jolie</a></>,
                'Last Edited': '20/10/2018',
                'Form Status': 'In Progress',
                'Predictive Report Status': 'Completed',
                "": <div style={{display: 'flex'}}>
                        <button onClick={showOptions}>
                            <img src="/assets/images/menu-vertical.png" />
                        </button>
                        <span id="span">
                            <a href="https://google.com">google</a><br></br>
                            <a href="https://google.com">mika</a>
                        </span>
                    </div>
            },
            {
                ID: '123132',
                'Full Name': <><a href='https://www.google.com'>kun</a></>,
                'Last Edited': '20/10/2018 10.42am',
                'Form Status': 'In Progress',
                'Predictive Report Status': 'Completed',
                "": <div style={{display: 'flex'}}>
                <button onClick={showOptions}>
                    <img src="/assets/images/menu-vertical.png" />
                </button>
                <span id="span2">
                    <a href="https://google.com">google</a><br></br>
                    <a href="https://google.com">mika</a>
                </span>
                </div>
            }
        ]
    

    return (
        <div className="patient-database">

            <Row>
                <div style={{width: 'inherit'}}>
                <SearchInput searchOptions={tableData || []} value={filter} required error={''} name='height' label={t('question.height')} onSearch={handleSearchChange} />
                </div>
            </Row>

            <Table 
                columns = {
                    [
                        {
                            colName: 'ID'
                        },
                        {
                            colName: 'Full Name'
                        },
                        {
                            colName: 'Last Edited'
                        },
                        {
                            colName: 'Form Status',
                        },
                        {
                            colName: 'Predictive Report Status'
                        },
                        {
                            colName: ''
                        }
                    ]
                }

                data = {tableData}
            />
        </div>
    )
}

export default PatientDatabse;