import base64 from 'base-64';

export const isTokenExpired = (token) => {
    
    try {
        const payload =  token.substring(token.indexOf('.')+1,token.lastIndexOf('.'));
        const dec = base64.decode(payload);
        const parsedPayload = JSON.parse(dec);  
        const exp = parsedPayload.exp;
        const currentTime = Date.now() / 1000;
        return exp < currentTime;
    } catch (e) {
        return true;
    }
}

export const timeUntilTokenExpiry = (token) => {
    try {
        const payload =  token.substring(token.indexOf('.')+1,token.lastIndexOf('.'));
        const dec = base64.decode(payload);
        const parsedPayload = JSON.parse(dec);  
        const exp = parsedPayload.exp;
        const currentTime = Date.now() / 1000;
        return exp - currentTime;
    } catch (e) {
        return 0;
    }
}