import axios from 'axios';

export const getMyProfile = async () => {
    const token = localStorage.getItem('jwt'); 
    const response = await axios.get('/api/mypage', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;
}