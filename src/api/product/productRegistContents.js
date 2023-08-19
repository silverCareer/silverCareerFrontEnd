import axios from 'axios';

export const productRegistContents = async (product, formData) => {
    const token = localStorage.getItem('jwttoken');
    

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
    };
    
    const blob = new Blob([JSON.stringify(product)], {type: 'application/json'});
    
    const newFormData = new FormData();
    newFormData.append('productImage', formData);
    newFormData.append('createProductReq', blob, { type: 'application/json' });

    try {   
        const response = await axios.post('https://www.silvercareer.shop/api/product/create', 
        newFormData, config);
        
        console.log("success", response.data);
        
        return response.data;
    } catch (error) {
        console.error('Error sending data to backend:', error);
        throw error;
    }
}