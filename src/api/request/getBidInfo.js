import axios from "axios";


export const getBidInfo = async (bidIdx) => {
    const token = localStorage.getItem('jwttoken');
    const response = await axios.get(`https://www.silvercareer.shop/api/bid/${bidIdx}` , {
        headers : {
            'Authorization': `Bearer ${token}`
        }       
    });
    
    return response.data.response


}