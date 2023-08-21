import axios from 'axios';

//const response = await axios.post('http://localhost:8888/api/login', data);
export const login = async (data) => {
    try {
        const response = await axios.post('https://www.silvercareer.shop/api/login', data);
        return response;
    } catch (error) {
        console.error(error);
    }
}
