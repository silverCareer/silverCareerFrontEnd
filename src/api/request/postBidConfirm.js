import axios from "axios";

export const postBidConfirm = async (bidIdx) => {
    const token = localStorage.getItem('jwttoken')
    const response = await axios.post(`https://www.silvercareer.shop/api/bid/${bidIdx}/confirm`, 
    {},
    {
        headers : {
            'Authorization': `Bearer ${token}`
        }
    })

    return response.data
}