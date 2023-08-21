import axios from 'axios';

//const response = await axios.post('http://localhost:8888/api/productpayment',
export const paymentApi = async (productIdx) => {
    const token = localStorage.getItem('jwttoken'); 
    const response = await axios.post('https://www.silvercareer.shop/api/productPayment', 
    {
        productIdx : productIdx
    },
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;
}