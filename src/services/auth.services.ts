import axios from 'axios';
import errorHandler from 'Utils/error-handler';
import jwt_decode from 'jwt-decode';
import CryptoJS from 'crypto-js';
import { base64Url, decodeBase64Url } from 'src/helpers/base64Url';

export const login = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;

    try {
        const response = await axios({
            method: 'POST',
            url: `http://${url}:${port}/auth/login/`,
            responseType: 'json',
            data: data
        });
        console.log('response', response);
        console.log('response', response.data);
        const refreshToken = response.data.refresh;
        const accessToken = response.data.access;
        console.log('accessToken', accessToken);
        const header = accessToken.split('.')[0];
        const payload = accessToken.split('.')[1];
        const secret = accessToken.split('.')[2];
        console.log('header', header);
        console.log('payload', payload);
        console.log('secret', secret);
        console.log('decode header', decodeBase64Url(header));
        console.log('payload', decodeBase64Url(payload));
        console.log('secret',  CryptoJS.SHA256(secret).toString(CryptoJS.enc.Hex)
        
        );


        const decodedAccesToken = jwt_decode(accessToken);
        const decodedRefreshToken = jwt_decode(refreshToken);
        console.log(decodedAccesToken, decodedAccesToken);
        console.log(decodedRefreshToken, decodedRefreshToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('accessToken', accessToken);
        if(refreshToken && accessToken) localStorage.setItem('user', data.username);
        console.log('localStorage', localStorage);

        return "success";
    }
    catch (err) {
        console.log('error', err);
        console.log(errorHandler.api(err));
        let {path, value}: any = errorHandler.api(err);
        console.log('path', path);
        console.log('value', value);
        // const { error } = err?.response?.data || {};
        return { error: { message: value}};
    }
}

export const refreshAccessToken = async() => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const refreshToken = localStorage.getItem('refreshToken');

    try {
        const response = await axios({
            method: 'POST',
            url: `http://${url}:${port}/auth/login/refresh/`,
            data: {
                refresh: refreshToken
            },
            responseType: 'json'
        });
        console.log('response', response);
        localStorage.setItem('accessToken', response.data.access);

        return "success";
    }
   catch(err: any) {
        const { error }:any = err?.response?.data || {};
        return { error: { message: err?.message }};
   }

}

export const logout = async() => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    try {
        const response = await axios({
            method: 'POST',
            url: `http://${url}:${port}/auth/logout/`,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${accessToken}, Basic ${refreshToken}`        
            },
        });

        console.log('response', response.data);
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        console.log('localStorage', localStorage);
        // const refreshToken = response.data.refresh;
        // const accessToken = response.data.access;
        // localStorage.setItem('refreshToken', refreshToken);
        // localStorage.setItem('accessToken', accessToken);

        return "success";
    }
    catch (err: any) {
        const { error }:any = err?.response?.data || {};
        return { error: { message: err?.message }};
    }
}

export const newPassword = () => {

}
