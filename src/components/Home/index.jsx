import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HomeCarousel from './Carousel/Carousel';
import MainCategory from '../Category/MainCategory';
import ProductList from '../Product'
import { getProductList } from '../../api/product/productList';
import PagingContent from '../Common/Paging';
import { getCarouselList } from '../../api/carousel/carouselList';



const Carousel_dommy = [
    {
        "productImage": "https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg",
        "productIdx": 43,
        "category" :"기술직",
        "productName" : "수리해줍니다!"
    },
    {
        "productImage": "https://img.freepik.com/premium-vector/abstract-pastel-color-background-with-pink-purple-gradient-effect-graphic-design-decoration_120819-463.jpg",
        "productIdx": 42,
        "category" :"기술직",
        "productName" : "코딩알려드려요!"
    },
    {
        "productImage": "https://media.architecturaldigest.com/photos/6080a73d795a7b010f3dd2e0/2:1/w_2700,h_1350,c_limit/GettyImages-1213929929.jpg",
        "productIdx": 3,
        "category" :"기술직",
        "productName" : "데이터전처리!"
    },
    {
        "productImage": "https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg",
        "productIdx": 4,
        "category" :"현장직",
        "productName" : "노가다 알려드려요!"
    },
    {
        "productImage": "https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg",
        "productIdx": 5,
        "category" :"요리",
        "productName" : "계란말이 아직도 어렵니?"
    },
    {
        "productImage": "https://media.architecturaldigest.com/photos/6080a73d795a7b010f3dd2e0/2:1/w_2700,h_1350,c_limit/GettyImages-1213929929.jpg",
        "productIdx": 6,
        "category" :"요리",
        "productName" : "치킨 더이상 사먹지마"
    },
    {
        "productImage": "https://img.freepik.com/premium-vector/abstract-pastel-color-background-with-pink-purple-gradient-effect-graphic-design-decoration_120819-463.jpg",
        "productIdx": 7,
        "category" :"요리",
        "productName" : "제2의 백종원 바로 너에유"
    },
    {
        "productImage": "https://media.architecturaldigest.com/photos/6080a73d795a7b010f3dd2e0/2:1/w_2700,h_1350,c_limit/GettyImages-1213929929.jpg",
        "productIdx": 8,
        "category" :"현장직",
        "productName" : "정년퇴직후 노가다 야 너두 좆될수있어"
    },
    {
        "productImage": "https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg",
        "productIdx": 9,
        "category" :"문화",
        "productName" : "강남 약쟁이!"
    },
    {
        "productImage": "https://img.freepik.com/premium-vector/abstract-pastel-color-background-with-pink-purple-gradient-effect-graphic-design-decoration_120819-463.jpg",
        "productIdx": 10,
        "category" :"문화",
        "productName" : "수리해줍니다!"
    },
]

function Home() {
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태 추가
    const [totalPage, setTotalPage]  = useState(1);
    const [CarouselList, setCarouselListList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getProductList('all', currentPage, 9);

                setProductList(response.response.content);
                setTotalPage(response.response.totalPages);

                const responseList = await getCarouselList();
                setCarouselListList(responseList.response)

            } catch (error) {
                console.error("Error fetching product List:", error);
            }
        }
        fetchData();
    }, [currentPage]);

    return (
        <div>
            <HomeCarousel carouselList={CarouselList}/>
            <MainCategory />
            <ProductList productList={productList}/>
            <PagingContent currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
        </div>
    );
}

export default Home;