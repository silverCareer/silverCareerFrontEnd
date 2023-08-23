import axios from "axios";

export const postBid = async (bidPrice, suggestionIdx) => {
    const token = localStorage.getItem('jwttoken')
    const response = await axios.post(`https://www.silvercareer.shop/api/suggestion/${suggestionIdx}/bid`, 
    {
        price : bidPrice
    },
    {
        headers : {
            'Authorization': `Bearer ${token}`
        }

    })

    return response.data
}