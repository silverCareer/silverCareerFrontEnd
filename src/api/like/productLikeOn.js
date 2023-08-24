import axios from 'axios';

export const productLikeOn = async (productIdx) => {
    const token = localStorage.getItem('jwttoken'); 
    const response = await axios.post(`https://www.silvercareer.shop/api/product/detail/${productIdx}/likes`, 
    {},
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;
}