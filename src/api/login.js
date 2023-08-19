import axios from 'axios';

export const login = async (data) => {
    try {
        //const response = await axios.post('https://www.silvercareer.shop/api/login', data);
        const response = await axios.post('https://www.silvercareer.shop/api/login', data);
        return response;
    } catch (error) {
        console.error(error);
    }
}
