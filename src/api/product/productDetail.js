import axios from 'axios';

export const getProductDetail = async (productIdx, isLoggedIn) => {
    if(isLoggedIn) {
        const token = localStorage.getItem('jwttoken');
        const response = await axios.get(`https://www.silvercareer.shop/api/product/detail/${productIdx}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    }
    else {
        const response = await axios.get(`https://www.silvercareer.shop/api/product/detail/${productIdx}`);        
        return response.data;
    }
}

