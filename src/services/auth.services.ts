import axios from 'axios';
import errorHandler from 'Utils/error-handler';
import jwt_decode from 'jwt-decode';
import CryptoJS from 'crypto-js';
import { base64Url, decodeBase64Url, validateToken } from 'Helpers/';

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
       
        const refreshToken = response.data.refresh;
        const accessToken = response.data.access;
  
        const validatedAccessToken = validateToken(accessToken);
        const validatedRefreshToken = validateToken(refreshToken);
      
        if (validatedAccessToken.error || validatedRefreshToken.error) {
            return { error: 'Invalid Token'};
        }
        else {
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('accessToken', accessToken);
            if(refreshToken && accessToken) localStorage.setItem('user', data.username);
            console.log('localStorage', localStorage);
    
            return "success";
        }
    }
    catch (err) {
        let {path, value}: any = errorHandler.api(err);

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

        const validatedAccessToken = validateToken(response.data.access);
        
        if(validatedAccessToken.error) {
            return validatedAccessToken;
        }
        else {
            localStorage.setItem('accessToken', response.data.access);

            return "success";
        }
        
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
    
    try {
        const response = await axios({
            method: 'POST',
            url: `http://${url}:${port}/auth/logout/`,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        });

        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');

        return "success";
    }
    catch (err: any) {
        const { error }:any = err?.response?.data || {};
        return { error: { message: err?.message }};
    }
}

export const newPassword = () => {

}
