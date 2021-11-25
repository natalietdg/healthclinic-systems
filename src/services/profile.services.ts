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
                profile.user == userID
            });

            return userProfile;
        });

        return normalizer.response.profile(response);
    }
    catch(err: any) {
        return { error: err.message }
    }
}
export const updateProfile = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    
    const accessToken = localStorage.getItem('accessToken');

    var normalizedData = normalizer.model.profile(data);
    var dataWithoutProfilePic:any = null;

    if(normalizedData.image instanceof Blob) {
        let tempData = normalizedData;
        normalizedData = _.omit(normalizedData, ['image']);
        dataWithoutProfilePic =  new FormData();
        dataWithoutProfilePic.append('name', tempData.name);
        dataWithoutProfilePic.append('image', tempData.image);
    }
    else {
        normalizedData = _.omit(normalizedData, ['image']);
    }

    try {
        var response = await axios({
            method: 'PUT',
            url: `${url}/userprofiles/${data.profileID}/`,
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
            data: normalizedData
        });

        if(dataWithoutProfilePic) {
            response = await axios({
                method: 'PUT',
                url: `${url}/userprofiles/${data.profileID}/`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`        
                },
                data: dataWithoutProfilePic
            });
        }
        
        return normalizer.response.profile(response.data);
    }
    catch(err: any) {
        return { error: err.message }
    }
}