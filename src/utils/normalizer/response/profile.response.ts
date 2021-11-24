import { omitBy, isUndefined } from 'lodash';

const ProfileResponse = (data: any) => {
    return omitBy({
        username: data.username,
        image: data.image || undefined
    }, (value) => isUndefined(value));
}

export default ProfileResponse;