import axios from 'axios';

export const emailCheck = async (email) => {
    try {
        const response = await axios.get(`https://www.silvercareer.shop/api/checkEmail/${email}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};