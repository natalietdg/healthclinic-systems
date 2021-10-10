import { isNil, isUndefined, omitBy } from 'lodash';

const PatientModel = (data:any) => {
    const id = (data.url.split('s')[1]).split('/')[1];
   
    return omitBy({
        dateOfBirth: data.dob,
        race: data.race,
        reportID: data.report_id,
        patientID: id,
        profilePicBlob: data.image,
        email: data.email,
        ic: data.ic,
        phoneNumber: data.phone,
        height: data.height? data.height: '',
        weight: data.weight? data.weight: '',
        fullName: data.name,
        gender: data.gender,
    }, (value) => isNil(value) || isUndefined(value));
}

export default PatientModel;
