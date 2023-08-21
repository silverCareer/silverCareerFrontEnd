import axios from 'axios';

export const getAlarmStatus = async () => {

    const token = localStorage.getItem('jwttoken');

    const response = await axios.get('https://www.silvercareer.shop/api/alarmStatus' , {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data.response

}