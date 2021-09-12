import React from 'react';
import './medical-record.scss';

interface MedicalRecordProps {

}

const MedicalRecord:React.FC<MedicalRecordProps> = ()=> {
    return (
        <div className="medical-record">
            <div className="content">
                <h3>Medical Record</h3>
            </div>
        </div>
    )
}

export default MedicalRecord;