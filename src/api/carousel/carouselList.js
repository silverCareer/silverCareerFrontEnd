import axios from 'axios';


export const getCarouselList = async () => {

    const response = await axios.get(`https://www.silvercareer.shop/api/product/recommend`
    );
    
    return response.data;
}