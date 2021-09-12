import { isNil, isUndefined, omitBy } from 'lodash';

const PatientModel = (data:any) => {
    return omitBy({
        fullName: data.fullName,
        gender: data.gender,
        dob: data.dob
    }, (value) => isNil(value) || isUndefined(value))
}

export default PatientModel;
