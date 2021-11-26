import { omitBy, isUndefined } from 'lodash';

const ProfileResponse = (data: any) => {
    return omitBy({
        id: data.profileID || -1,
        image: data.image || '',
        ic: data.ic || -1,
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        gender: data.gender || '',
        race: data.race || '',
        dob: data.dob || ''
    }, (value) => isUndefined(value));
}

export default ProfileResponse;