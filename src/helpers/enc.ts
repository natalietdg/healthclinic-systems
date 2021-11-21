import CryptoJS from 'crypto-js';

export const encode = (message: any) => {
    if (!message) return;
    message = CryptoJS.enc.Utf8.parse(message);
  
    return(CryptoJS.enc.Base64.stringify(message)).replace('=', '');
}

export const decode = (message: any) => {
    if (!message) return;
    message = CryptoJS.enc.Base64.parse(message);
    return CryptoJS.enc.Latin1.stringify(message);
}