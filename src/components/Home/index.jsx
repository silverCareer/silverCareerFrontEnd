import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HomeCarousel from './Carousel/Carousel';
import MainCategory from '../Category/MainCategory';
import ProductList from '../Product'
import { getProductList } from '../../api/product/productList';
import { ReactComponent as LeftIcon } from '../../assets/svg/icon-left.svg';
import { ReactComponent as RightIcon } from '../../assets/svg/icon-right.svg';

const CAROUSEL_IMAGES = [
    'https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg',
    'https://img.freepik.com/premium-vector/abstract-pastel-color-background-with-pink-purple-gradient-effect-graphic-design-decoration_120819-463.jpg',
    'https://media.architecturaldigest.com/photos/6080a73d795a7b010f3dd2e0/2:1/w_2700,h_1350,c_limit/GettyImages-1213929929.jpg'
]

const Paging = styled.div `
    display: flex;
    justify-content: center;
    border: 1px solid black;
    align-items: center;
`

function Home() {
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태 추가
    const [totalPage, setTotalPage]  = useState(1);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getProductList('all', currentPage, 9);
                console.log('Product List:', response);
                
                setProductList(response.response.content);
                setTotalPage(response.response.totalPages);
                

            } catch (error) {
                console.error("Error fetching product List:", error);
            }
        }
        fetchData();
    }, [currentPage]);

    return (
        <div>
            <HomeCarousel carouselList={CAROUSEL_IMAGES}/>
            <MainCategory />
            <ProductList productList={productList}/>
            <Paging>
                <LeftIcon />
                <div>{currentPage} </div>
                /
                <div> {totalPage}</div>
                <RightIcon />
            </Paging>
        </div>
    );
}

export default Home;