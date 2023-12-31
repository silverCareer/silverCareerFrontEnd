import axios from 'axios';
import { isTokenExpired, timeUntilTokenExpiry } from '../../utils/checkTokenExpired';
import { getNewAccessToken } from '../getNewAccessToken';
export const productRegistContents = async (createProductReq, formData) => {
    const token = localStorage.getItem('jwttoken');
    if (isTokenExpired(token)) {
        const response = await getNewAccessToken()
        localStorage.setItem('jwttoken', response.response.accessToken);      
    }

    if (timeUntilTokenExpiry(token) < 1200) {
        const response = await getNewAccessToken()
        localStorage.setItem('jwttoken', response.response.accessToken);
    }
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
    };
    
    const blob = new Blob([JSON.stringify(createProductReq)], {type: 'application/json'});
    formData.append('requestCreateProduct', blob, {type: 'application/json'});
    
    //const response = await axios.post('http://localhost:8888/api/product/create', 
    try {   
        const response = await axios.post('https://www.silvercareer.shop/api/product/create', 
        formData, config);
        
        console.log("success", response.data);
        
        return response.data;
    
    } catch (error) {
        console.error('Error sending data to backend:', error);
        throw error;
    }
}