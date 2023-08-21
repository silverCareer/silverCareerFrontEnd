import axios from 'axios';

export const postReview = async (productIdx, formdata) => {
    const token = localStorage.getItem('jwttoken');
    try {
        const response = await axios.post(
            `https://www.silvercareer.shop/api/review/create/${productIdx}`,
            {
                context: formdata.context,
                rating: formdata.rating
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