import axios from 'axios';

export const getProductList = async (category, page, size) => {
    const token = localStorage.getItem('jwttoken');
    const encodedCategory = encodeURIComponent(category);
    const response = await axios.get(`https://www.silvercareer.shop/api/product/category/${encodedCategory}?page=${page}&size=${size}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    
    return response.data;
}