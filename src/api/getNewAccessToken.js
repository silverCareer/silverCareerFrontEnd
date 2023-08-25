import axios from 'axios';

export const getNewAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    const token = localStorage.getItem('jwttoken')

    const response = await axios.post('https://www.silvercareer.shop/api/reissue' , 
    {
        token : refreshToken
    },
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    );

    return response.data

}
