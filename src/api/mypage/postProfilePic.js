import axios from 'axios';

export const postProfilePic = async (formData) => {
    try {
        const token = localStorage.getItem('jwt');
        const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        },
        };

        const response = await axios.post('https://www.silvercareer.shop/api/updateProfileImg', formData, config);

        
        return response.data;
    } catch (error) {
        throw error;
    }
};