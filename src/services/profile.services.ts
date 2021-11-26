import axios from 'axios';
import _, { omit } from 'lodash';
import normalizer from 'Utils/normalizer';

export const fetchProfile = async(userID: number) => {
    const url = process.env.PUBLIC_PATH;
    
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await axios({
            method: 'GET',
            url: `${url}/userprofiles/`,
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        }).then((response: any) => {
            const userProfile = response.data.filter((profile: any) => {
                return profile.user == userID
            });

            return userProfile;
        });
        return normalizer.model.profile(response[0]);
    }
    catch(err: any) {
        return { error: err.message }
    }
}
export const updateProfile = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    
    var normalizedData = normalizer.response.profile(data);
    var dataWithoutProfilePic:any = null;

    if(normalizedData.image instanceof Blob) {
        let tempData = normalizedData;
        normalizedData = _.omit(normalizedData, ['image']);
        dataWithoutProfilePic =  new FormData();
        dataWithoutProfilePic.append('image', tempData.image);
    }
    else {
        normalizedData = _.omit(normalizedData, ['image']);
    }

    try {
        var response = await axios({
            method: 'PUT',
            url: `${url}/userprofiles/${data.profileID}/`,
            data: normalizedData
        });

        if(dataWithoutProfilePic) {
            response = await axios({
                method: 'PUT',
                url: `${url}/userprofiles/${data.profileID}/`,
                data: dataWithoutProfilePic
            });
        }
        
        return normalizer.model.profile(response.data);
    }
    catch(err: any) {
        return { error: err.message }
    }
}