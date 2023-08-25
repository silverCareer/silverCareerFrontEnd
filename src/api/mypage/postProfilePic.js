import axios from 'axios';
import { isTokenExpired, timeUntilTokenExpiry } from '../../utils/checkTokenExpired';
import { getNewAccessToken } from '../getNewAccessToken';
export const postProfilePic = async (formData) => {
    try {
        const token = localStorage.getItem('jwttoken');
        if (isTokenExpired(token)) {
            const response = await getNewAccessToken()
            localStorage.setItem('jwttoken', response.response.accessToken);      
        }
    
        if (timeUntilTokenExpiry(token) < 1200) {
            const response = await getNewAccessToken()
            localStorage.setItem('jwttoken', response.response.accessToken);
        }
        const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        },
        };

        const response = await axios.patch('https://www.silvercareer.shop/api/updateProfileImg', formData, config);

        
        return response.data;
    } catch (error) {
        throw error;
    }
};