import { IToken } from "types";
// import jwt from 'jsonwebtoken';


export const decodeJwtToken = (token: string): IToken | null => {
    try {
        const arrayToken = token.split('.');
        const decoded = JSON.parse(atob(arrayToken[1])) as IToken;// jwt.decode(token) as IToken;

        if (decoded && decoded.userid && decoded.login && decoded.exp) {
            const curTime = Math.floor(Date.now() / 1000);
            if (decoded.exp <= curTime)
                return null;
            return decoded;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Failed to decode JWT token:', error);
        return null;
    }
}

export const isExpired = (exp: number): boolean => {
    const curTime = Math.floor(Date.now() / 1000);
    return exp <= curTime
}