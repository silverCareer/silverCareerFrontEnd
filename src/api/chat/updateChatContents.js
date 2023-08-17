import axios from 'axios';

export const updateChatContents = async (chatId, newMessage) => {
    try {
        const response = await axios.post(
            `http://localhost:8888/api/chat/update`, 
            {
                _id: chatId, 
                message: {
                    content: newMessage.content,
                    sender: newMessage.sender,
                    timestamp: newMessage.timestamp
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};