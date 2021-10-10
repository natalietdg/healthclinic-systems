import { omitBy, isNil, isUndefined } from 'lodash';

const PatientResponse = (data:any) => {
    return omitBy({
        id: data.patientID,
        name: data.fullName,
        gender: data.gender,
        email: data.email,
        dob: data.dateOfBirth,
        race: data.race,
        image: data.profilePicBlob,
        ic: data.ic,
        phone: data.phone,
        height: data.height,
        weight: data.weight

    }, (value) => isNil(value) || isUndefined(value))
}

export default PatientResponse;