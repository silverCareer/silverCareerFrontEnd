import axios from 'axios';

export const signup = async (data) => {
    try {
        const response = await axios.post('https://www.silvercareer.shop/api/signup', data);
        return response;
    } catch (error) {
        console.error(error);
    }
}
