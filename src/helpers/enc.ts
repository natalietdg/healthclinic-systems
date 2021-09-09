import CryptoJS from 'crypto-js';

export const encode = (message: any) => {
    message = CryptoJS.enc.Utf8.parse(message);
    
    return (CryptoJS.enc.Base64.parse(message));
}

export const decode = (message: any) => {
    
}