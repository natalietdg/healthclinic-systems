import { omitBy, isUndefined } from 'lodash';

const ProfileModel = (data: any) => {
    return omitBy({
        profileID: data.id || -1,
        image: data.image|| '',
        ic: data.ic || -1,
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        gender: data.gender || '',
        race: data.race || '',
        dob: data.dob || '',
        userID: data.user,
    }, (value) => isUndefined(value));
}

export default ProfileModel;