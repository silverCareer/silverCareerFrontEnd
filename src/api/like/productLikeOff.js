import axios from 'axios';
import { isTokenExpired, timeUntilTokenExpiry } from '../../utils/checkTokenExpired';
import { getNewAccessToken } from '../getNewAccessToken';
export const productLikeOff = async (productIdx) => {
    const token = localStorage.getItem('jwttoken'); 
    if (isTokenExpired(token)) {
        const response = await getNewAccessToken()
        localStorage.setItem('jwttoken', response.response.accessToken);      
    }

    if (timeUntilTokenExpiry(token) < 1200) {
        const response = await getNewAccessToken()
        localStorage.setItem('jwttoken', response.response.accessToken);
    }
    const response = await axios.delete(`https://www.silvercareer.shop/api/product/detail/${productIdx}/likes`,
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;
}