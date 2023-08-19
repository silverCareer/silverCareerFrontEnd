import axios from 'axios';

export const productRegistContents = async (createProductReq, formData) => {
    const token = localStorage.getItem('jwttoken');
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
    };
    
    const blob = new Blob([JSON.stringify(createProductReq)], {type: 'application/json'});
    formData.append('createProductReq', blob, {type: 'application/json'});
    

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