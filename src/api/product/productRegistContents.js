import axios from 'axios';

export const productRegistContents = async (product, formData) => {
    const token = localStorage.getItem('jwttoken');
    
    // 이미지 파일 따로 추출
    // const productImage = formData.get('image');

    // if (productImage) {
    //     newFormData.append('productImage', productImage);
    // }

    // newFormData.append('createProductReq', new Blob(JSON.stringify(createProductReq), {type: "application/json"}))

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

    // const response = await axios.post('https://www.silvercareer.shop/api/product/create', 
    try {   
        const response = await axios.post('http://localhost:8888/api/product/create', 
        newFormData, config);
        
        console.log("success", response.data);
        
        return response.data;
    } catch (error) {
        console.error('Error sending data to backend:', error);
        throw error;
    }
}