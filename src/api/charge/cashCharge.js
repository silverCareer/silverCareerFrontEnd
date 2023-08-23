import axios from 'axios';

export const cashChargeApi = async (balance) => {
    console.log("여기부터에러니");

    const token = localStorage.getItem('jwttoken'); 
    const response = await axios.post('https://www.silvercareer.shop/api/cashCharge', 
    {
        balance : balance
    },
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;
}