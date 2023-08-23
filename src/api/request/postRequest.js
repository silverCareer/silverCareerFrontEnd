import axios from 'axios';

export const postRequest = async (formdata) => {
    const token = localStorage.getItem('jwttoken');
    try {
        const response = await axios.post(
            `https://www.silvercareer.shop/api/suggestion/register`,
            {
                title: formdata.title,
                description: formdata.description,
                category : formdata.category,
                price : formdata.price
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};