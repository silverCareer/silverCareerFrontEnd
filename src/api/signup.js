import axios from 'axios';

export const signup = async (data) => {
    try {
        console.log(data)
        const response = await axios.post('/api/signup', data);
        return response;
    } catch (error) {
        console.error(error);
    }
}
