import axios from "axios";

export const postBidPayment = async (bidIdx) => {
    const token = localStorage.getItem('jwttoken')
    const response = await axios.post(`https://www.silvercareer.shop/api/bidPayment`, 
    {
        bidIdx : bidIdx
    },
    {
        headers : {
            'Authorization': `Bearer ${token}`
        }
    })

    return response.data
}