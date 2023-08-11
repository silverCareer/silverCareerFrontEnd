import axios from 'axios';

export const sendSMS = async (phone) => {
    try {
        const response = await axios.get(`https://www.silvercareer.shop/api/sendSMS/${phone}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};