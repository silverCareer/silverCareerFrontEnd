import axios from 'axios';

export const postMyInfo = async (password, phoneNum) => {
    const token = localStorage.getItem('jwttoken'); 
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