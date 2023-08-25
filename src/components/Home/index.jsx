import React, { useEffect, useState } from 'react';
import HomeCarousel from './Carousel/Carousel';
import MainCategory from '../Category/MainCategory';
import ProductList from '../Product'
import PagingContent from '../Common/Paging';
import { getProductList } from '../../api/product/productList';
import { getCarouselList } from '../../api/carousel/carouselList';

function Home() {
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태 추가
    const [totalPage, setTotalPage]  = useState(1);
    const [carouselList, setCarouselList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getProductList('all', currentPage, 9);
                setProductList(response.response.content);
                setTotalPage(response.response.totalPages);
    
                const responseList = await getCarouselList();
                setCarouselList(responseList.response);
    
                console.log(response.response.content, " , ", responseList.response);
            } catch (error) {
                console.error("Error fetching product List:", error);
            }
        }
        fetchData();
    }, [currentPage]);

    return (
        <div>
            <HomeCarousel carouselList={carouselList}/>
            <MainCategory />
            <ProductList productList={productList}/>
            <PagingContent currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
        </div>
    );
}

export default Home;