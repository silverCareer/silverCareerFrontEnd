import axios from 'axios';

export const postMyInfo = async (phoneNum, birth) => {
    const token = localStorage.getItem('jwt'); 
    const response = await axios.post('/api/editMyInfo', 
    {
        phoneNum: phoneNum,
        birth: birth
    },
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;
}