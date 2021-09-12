import { omitBy, isNil, isUndefined } from 'lodash';

const PatientResponse = (data:any) => {
    return omitBy({
        patientID: data.patientID,
        fullName: data.fullName,
        gender: data.gender,
        dob: data.dob,

    }, (value) => isNil(value) || isUndefined(value))
}

export default PatientResponse;