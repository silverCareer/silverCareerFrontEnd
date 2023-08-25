import axios from 'axios';
import { isTokenExpired, timeUntilTokenExpiry } from '../../utils/checkTokenExpired';
import { getNewAccessToken } from '../getNewAccessToken';
export const postRequest = async (formdata) => {
    const token = localStorage.getItem('jwttoken');
    if (isTokenExpired(token)) {
        const response = await getNewAccessToken()
        localStorage.setItem('jwttoken', response.response.accessToken);      
    }

    if (timeUntilTokenExpiry(token) < 1200) {
        const response = await getNewAccessToken()
        localStorage.setItem('jwttoken', response.response.accessToken);
    }
    try {
        const response = await axios.post(
            `https://www.silvercareer.shop/api/suggestion/register`,
            {
                title: formdata.title,
                description: formdata.description,
                category : formdata.category,
                price : formdata.price
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};