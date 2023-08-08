import axios from 'axios';

export const getMyProfile = async () => {
    const token = localStorage.getItem('jwttoken'); 
    const response = await axios.get('https://www.silvercareer.shop/api/members', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;
}