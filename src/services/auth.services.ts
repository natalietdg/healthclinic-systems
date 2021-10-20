import axios from 'axios';
import errorHandler from 'Utils/error-handler';

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

export const logout = async() => {
    const url = process.env.PUBLIC_PATH;
    const port = process.env.PORT;
    
    try {
        const response = await axios({
            method: 'POST',
            url: `http://${url}:${port}/auth/logout/`,
            responseType: 'json'
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
    catch (err) {
        const { error } = err?.response?.data || {};
        return { error: { message: err?.message }};
    }
}

export const newPassword = () => {

}
