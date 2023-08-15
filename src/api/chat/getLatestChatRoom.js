import axios from 'axios';

export const getLatestChatRoom = async (chatId) => {
    try {
        const response = await axios.get(`https://www.silvercareer.shop/api/latestChat`, {
            params: { chatId : chatId }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};