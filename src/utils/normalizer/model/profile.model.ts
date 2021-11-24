import { omitBy, isUndefined } from 'lodash';

const ProfileModel = (data: any) => {
    return omitBy({
        username: data.username,
        profilePicBlob: data.image || ''
    }, (value) => isUndefined(value));
}

export default ProfileModel;