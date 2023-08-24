import axios from 'axios';

export const searchAPI = async (content, page, size) => {
    const token = localStorage.getItem('jwttoken');
    const encodedCategory = encodeURIComponent(content);
    const response = await axios.get(`https://www.silvercareer.shop/api/search?q=${encodedCategory}&page=${page}&size=${size}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    
    return response.data;
}