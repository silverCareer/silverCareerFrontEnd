import axios from 'axios';

export const postMyInfo = async (phoneNum, age) => {
    const token = localStorage.getItem('jwttoken'); 
    const response = await axios.post('/api/editMyInfo', 
    {
        phoneNum : phoneNum,
        age : age
    },
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;
}