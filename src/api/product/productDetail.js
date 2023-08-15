import axios from 'axios';

export const getProductDetail = async (productIdx) => {
    const token = localStorage.getItem('jwttoken');
    const response = await axios.get(`https://www.silvercareer.shop/api/product/detail/${productIdx}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    
    return response.data;
}