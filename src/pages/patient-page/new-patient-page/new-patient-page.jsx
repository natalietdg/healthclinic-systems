import React from 'react';
import Patient from 'Components/patient-form';



const NewPatientPage = ( ) => {
    return(
        <div className="new-patient-page">
            
            <Patient.PatientInformation />

            {/* <Patient.MedicalRecord /> */}
        </div>
    )
}

export default NewPatientPage;