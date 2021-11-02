import { isNil, isUndefined, omitBy } from 'lodash';

const PatientModel = (data:any) => {
    console.log('data', data);
    const id = (data.url.split('s')[1]).split('/')[1];
    console.log('data.ic', data.ic);
    console.log('data, array', typeof(data.comments));
    console.log('data, comments', data.comments);
   
    return omitBy({
        dateOfBirth: data.dob,
        race: data.race,
        reportID: data.report_id,
        patientID: id,
        profilePicBlob: data?.image,
        email: data.email,
        ic: data.ic,
        phoneNumber: data.phone,
        // height: data.height? data.height: '',
        // weight: data.weight? data.weight: '',
        fullName: data.name,
        gender: data.gender,
        comments: data.comments? data.comments: [],
        // healthHistory: data?.healthHistory || {},
        // familyHistory: data?.familyHistory || {},
        lifestyleInformation: data?.lifestyleInformation || {},
        diagnosisPicBlobArray: data?.comments?.image || [],
        reasonForConsultation: data?.reasonForConsultation || '',
    }, (value) => isNil(value) || isUndefined(value));
}

export default PatientModel;
