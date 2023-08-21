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
    margin: 10px;
    align-items: center;
    font-size: 25px;
    margin: 10px;
    margin-bottom: 1000px;;
`
const PagingNumber = styled.div`
    cursor: pointer;
    font-weight: ${props => props.isActive ? 'bold' : 'normal'};
    margin-right: 5px; /* 간격 조정 */
    border: 1px solid #ccc; /* 테두리 추가 */
    padding: 5px 10px; /* 내부 패딩 추가 */
    border-radius: 5px; /* 둥근 모서리 추가 */
`;

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

    const handlePageChange = (newPage) => {
        // 페이지 변경 시 데이터를 다시 불러옴
        setCurrentPage(newPage);
    };

    return (
        <div>
            <HomeCarousel carouselList={CAROUSEL_IMAGES}/>
            <MainCategory />
            <ProductList productList={productList}/>
            <Paging>
                <LeftIcon onClick={() => {
                        if (currentPage > 1) {
                            handlePageChange(currentPage - 1);
                        }
                    }}/>
                    {Array.from({ length: totalPage }, (_, index) => (
                        <PagingNumber
                            key={index}
                            isActive={currentPage === index + 1}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </PagingNumber>
                    ))}
                <RightIcon onClick={() => {
                        if (currentPage < totalPage) {
                            handlePageChange(currentPage + 1);
                        }
                    }}/>
            </Paging>
        </div>
    );
}

export default Home;