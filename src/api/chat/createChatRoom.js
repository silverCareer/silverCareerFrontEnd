import axios from 'axios';

export const createChatRoom = async (sender, mentor, newMessage) => {
    try {
        const response = await axios.post(
            `http://localhost:8888/api/chat/create`, 
            {
                user1 : sender,
                user2 : mentor, 
                newMessage: {
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