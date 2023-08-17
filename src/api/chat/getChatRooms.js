import axios from 'axios';

export const getChatRooms = async (name) => {
    try {
        const response = await axios.get(`https://www.silvercareer.shop/api/chat`, {
            params: { username: name }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


// `https://www.silvercareer.shop/api/chat`
//`http://localhost:8888/api/chat`