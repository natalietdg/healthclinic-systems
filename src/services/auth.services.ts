import axios from 'axios';
import errorHandler from 'Utils/error-handler';
import { base64Url, decodeBase64Url, validateToken } from 'Helpers/';

export const login = async(data: any) => {
    const url = process.env.PUBLIC_PATH;
    
    try {
        const response = await axios({
            method: 'POST',
            url: `${url}/auth/login/`,
            // url: `/auth/login/`,
            responseType: 'json',
            data: data,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "X-Requested-With"
            }
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

            localStorage.setItem('accessTokenExpiry', validatedAccessToken.payload.exp);
            localStorage.setItem('refreshTokenExpiry', validatedRefreshToken.payload.exp);

            if(refreshToken && accessToken) {
                localStorage.setItem('user', data.username);
                localStorage.setItem('userID', validatedAccessToken.payload.user_id);
            }
    
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
    const refreshToken = localStorage.getItem('refreshToken');

    try {
        const response = await axios({
            method: 'POST',
            url: `${url}/auth/login/refresh/`,
            // url: `/auth/login/refresh/`,
            data: {
                refresh: refreshToken
            },
            responseType: 'json'
        });

        const validatedAccessToken = validateToken(response.data.access);
        if(validatedAccessToken.error) {
            return validatedAccessToken;
        }
        else {
            localStorage.setItem('userID', validatedAccessToken.payload.user_id);
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('accessTokenExpiry', validatedAccessToken.payload.exp);

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
    
    const accessToken = localStorage.getItem('accessToken');
    
    try {
        const response = await axios({
            method: 'POST',
            // url: `${url}/auth/logout/`,
            url: `/auth/logout/`,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${accessToken}`        
            },
        });

        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenExpiry');
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
