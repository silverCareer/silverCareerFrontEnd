import axios from 'axios';

export const nickNameCheck = async (name) => {
    try {
        const response = await axios.get(`https://www.silvercareer.shop/api/checkName/${name}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};