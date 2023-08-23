import axios from "axios";

export const getBidList = async() => {
    const token = localStorage.getItem('jwttoken')

    const response = await axios.get(`https://www.silvercareer.shop/api/bid`, {
        headers : {
            'Authorization': `Bearer ${token}`
        }  
    });

    return response.data
}