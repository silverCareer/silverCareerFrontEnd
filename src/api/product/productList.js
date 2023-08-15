import axios from 'axios';

export const getProductList = async (category) => {
    const token = localStorage.getItem('jwttoken');
    const encodedCategory = encodeURIComponent(category);
    const response = await axios.get(`https://www.silvercareer.shop/api/product/category/${encodedCategory}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    
    return response.data;
}