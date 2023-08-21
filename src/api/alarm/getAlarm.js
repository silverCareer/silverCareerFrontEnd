import axios from 'axios';

export const getAlarm = async () => {

    const token = localStorage.getItem('jwttoken');

    const response = await axios.get('https://www.silvercareer.shop/api/notification' , {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data.response

}