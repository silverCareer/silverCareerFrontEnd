import axios from 'axios';

export const login = async (data) => {
    try {
        const response = await axios.post('/api/login', data);
        return response;
    } catch (error) {
        console.error(error);
    }
}
