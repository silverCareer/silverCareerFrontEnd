import axios from 'axios';
import { isTokenExpired, timeUntilTokenExpiry } from '../../utils/checkTokenExpired';
import { getNewAccessToken } from '../getNewAccessToken';
export const getMyProfile = async () => {
    const token = localStorage.getItem('jwttoken'); 
    if (isTokenExpired(token)) {
        const response = await getNewAccessToken()
        localStorage.setItem('jwttoken', response.response.accessToken);      
    }

    if (timeUntilTokenExpiry(token) < 1200) {
        const response = await getNewAccessToken()
        localStorage.setItem('jwttoken', response.response.accessToken);
    }
    const response = await axios.get('https://www.silvercareer.shop/api/members', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data.response;
}