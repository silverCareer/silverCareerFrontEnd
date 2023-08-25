import axios from 'axios';
import { isTokenExpired, timeUntilTokenExpiry } from '../../utils/checkTokenExpired';
import { getNewAccessToken } from '../getNewAccessToken';
export const postMyInfo = async (password, phoneNum) => {
    const token = localStorage.getItem('jwttoken'); 
    if (isTokenExpired(token)) {
        const response = await getNewAccessToken()
        localStorage.setItem('jwttoken', response.response.accessToken);      
    }

    if (timeUntilTokenExpiry(token) < 1200) {
        const response = await getNewAccessToken()
        localStorage.setItem('jwttoken', response.response.accessToken);
    }
    const response = await axios.patch('https://www.silvercareer.shop/api/modify', 
    {
        password : password,
        phoneNum : phoneNum
    },
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.data.success === false) {
        throw response; // 예외 발생
    }

    return response.data;
}