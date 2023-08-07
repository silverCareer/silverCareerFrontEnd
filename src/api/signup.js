import axios from 'axios';

export const signup = async (data) => {
    try {
        const response = await axios.post('/api/signup', data);
        return response;
    } catch (error) {
        console.error(error);
    }
}
