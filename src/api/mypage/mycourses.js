import axios from 'axios';

export const getMyCourses = async () => {

    const token = localStorage.getItem('jwttoken');
    const response = await axios.get('https://www.silvercareer.shop/api/paymentHistory' , {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data

}