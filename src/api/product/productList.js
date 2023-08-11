import axios from 'axios';

export const getProductList = async (category) => {
    const token = localStorage.getItem('jwttoken'); 
    const response = await axios.get(`https://www.silvercareer.shop/api/product/category/${category}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    return response.data;
}