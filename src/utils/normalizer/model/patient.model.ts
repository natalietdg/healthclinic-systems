import { isNil, isUndefined, omitBy } from 'lodash';

const PatientModel = (data:any) => {
    const id = (data.url.split('s')[1]).split('/')[1];
    console.log(data.url.split('s')[1]);
    console.log('id', id);
    console.log('data', data);
    return omitBy({
        dateOfBirth: data.dob,
        race: data.race,
        reportID: data.report_id,
        id: id,
        profilePicBlob: data.image,
        email: data.email,
        ic: data.ic,
        phoneNumber: data.phone,
        fullName: data.name,
        gender: data.gender,
    }, (value) => isNil(value) || isUndefined(value));
}

export default PatientModel;
