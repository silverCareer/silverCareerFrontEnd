import axios from 'axios';

export const getChatRooms = async (name) => {
    try {
        const response = await axios.get(`https://www.silvercareer.shop/api/chat`, {
            params: { senderId: name }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};