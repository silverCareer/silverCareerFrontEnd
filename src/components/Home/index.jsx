import React, { useEffect, useState } from 'react';
import HomeCarousel from './Carousel/Carousel'
import MainCategory from './MainCategory/MainCategory'
import ProductList from './ClassComponents/ProductList'
import { getProductList } from '../../api/product/productList';

const CAROUSEL_IMAGES = [
    'https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg',
    'https://img.freepik.com/premium-vector/abstract-pastel-color-background-with-pink-purple-gradient-effect-graphic-design-decoration_120819-463.jpg',
    'https://media.architecturaldigest.com/photos/6080a73d795a7b010f3dd2e0/2:1/w_2700,h_1350,c_limit/GettyImages-1213929929.jpg'
]


function Home() {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const productList = await getProductList('all');
                console.log('Product List:', productList);
                setProductList(productList.response);
                
                /*const response = await getProductList('all');
                const productListData = await response.json();
                console.log('Product List:', productListData);
                setProductList(productListData.products);*/
            } catch (error) {
                // 에러 처리
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <HomeCarousel carouselList={CAROUSEL_IMAGES}/>
            <MainCategory />

            {console.log(Array.isArray(productList) + " ???????????? ")}
            {console.log(productList)}
            
            <ProductList productList={productList}/>
        </div>
    );
}

export default Home;