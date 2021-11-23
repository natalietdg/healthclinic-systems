import React from 'react';
import { decodeBase64Url } from './base64Url';
import CryptoJS from 'crypto-js';

export function validateToken (JWTToken: any) {
    const JWTType = process.env.JWT_TYPE;
    const JWTAlg = process.env.JWT_ALG;
    const secretKey:string = process.env.SECRET_KEY || 'undefined';
    
    const [ headers, payload, signature ] :any = JWTToken.split('.');
    const now = Math.trunc(new Date().getTime() /1000);

    var base64Headers = decodeBase64Url(headers);
    var base64Payload = decodeBase64Url(payload);

    var parsedHeaders = JSON.parse(base64Headers);
    var parsedPayload = JSON.parse(base64Payload);

    //validating jwt structure
    if(parsedHeaders.alg != JWTAlg && parsedHeaders.type != JWTType) {
        return { error: 'Invalid Token'}
    }

    //validating expiry time
    const expiryTime = parseInt(parsedPayload.exp);  

    if (now >= expiryTime) {
        return { error: 'Invalid Token'}
    }

    //validating signature
    const tempSignature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(headers+'.'+payload, secretKey));
    const replaceTempSignature = ((tempSignature.replaceAll('=', " ")).replaceAll('/', "_")).replaceAll('+', '-');

    if (replaceTempSignature.trim()  != signature.trim() ) {
        return { error: 'Invalid Token'}
    }

    return {
        headers: parsedHeaders,
        payload: parsedPayload
    }
}