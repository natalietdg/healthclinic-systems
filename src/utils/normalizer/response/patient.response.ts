import { omitBy, isNil, isUndefined, isEmpty } from 'lodash';

const PatientResponse = (data:any) => {
    return omitBy({
        
        id: data.patientID || undefined,
        name: data.fullName,
        gender: data.gender || undefined,
        email: data.email || undefined,
        dob: data.dateOfBirth || undefined,
        race: data.race || undefined,
        image: data.profilePicBlob || undefined,
        ic: data.ic || undefined,
        phone: data.phoneNumber || undefined ,
        height: data.height || undefined ,
        weight: data.weight || undefined,
        comments: !isEmpty(data.comments)? data.comments: undefined
    }, (value) => isNil(value) || isUndefined(value))
}

export default PatientResponse;