import CryptoJS from 'crypto-js';
export const base64Url = (image: any) => {
    try {
        const response = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => resolve(reader.result);
        }).then((base64String: any) => {
            return base64String;
        });
       
        if(!response)  return false;
        else return response;
    }
    catch (err) {

    }
    
}

export const decodeBase64Url = (string: any) => {
    try {
        var parsedBase64 = CryptoJS.enc.Base64.parse(string);
        const stringifiedBase64 = CryptoJS.enc.Utf8.stringify(parsedBase64);
        if (stringifiedBase64) return stringifiedBase64;
        else return { error: 'Failed to decode string'}
    }
    catch(err) {
        const { error }:any = err;
        return error;
    }
}