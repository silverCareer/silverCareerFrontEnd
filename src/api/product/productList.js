import axios from 'axios';

export const getProductList = async (category, page, size, isLoggedIn) => {
    const encodedCategory = encodeURIComponent(category);
    
    if(isLoggedIn) {
        const token = localStorage.getItem('jwttoken');
        const response = await axios.get(`https://www.silvercareer.shop/api/product/category/${encodedCategory}?page=${page}&size=${size}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        return response.data;
    }
    else {
        const response = await axios.get(`https://www.silvercareer.shop/api/product/category/${encodedCategory}?page=${page}&size=${size}`);        

        return response.data;
    }
}