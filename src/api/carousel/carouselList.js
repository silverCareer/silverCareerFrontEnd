import axios from 'axios';

export const getCarouselList = async () => {
    const token = localStorage.getItem('jwttoken');
    const response = await axios.get(`https://www.silvercareer.shop/api/product/recommend`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    
    return response.data;
}