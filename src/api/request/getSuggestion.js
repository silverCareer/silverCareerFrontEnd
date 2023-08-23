import axios from "axios";


export const getSuggestion = async (suggestionIdx) => {
    const token = localStorage.getItem('jwttoken');
    const response = await axios.get(`https://www.silvercareer.shop/api/suggestion/${suggestionIdx}` , {
        headers : {
            'Authorization': `Bearer ${token}`
        }       
    });
    
    return response.data.response


}