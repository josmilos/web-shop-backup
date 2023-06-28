import jwt_decode from "jwt-decode";


export function storeAuthToken(token){
    localStorage.setItem('token', token);

}

export function getAuthToken() {
    const token = localStorage.getItem('token');

    if(!token){
        return null;
    }

    const tokenDuration = getTokenDuration();
    if(tokenDuration < 0){
        return 'EXPIRED';
    }

    return token;
}

export function getTokenDuration(){
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();

    return duration;
}

export function tokenLoader() {
    return getAuthToken();
}


export function extractTokenData(){
    const token = getAuthToken();
    if(token === null || token === 'EXPIRED'){
        return null;
    }

    const decodedToken = jwt_decode(token);
    const tokenData ={
        "role": decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        "userId": decodedToken.userId,
        "verification": decodedToken.verification,
        "userType": decodedToken.userType
    }
    return tokenData;
}