import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HomeCarousel from './Carousel/Carousel';
import MainCategory from '../Category/MainCategory';
import ProductList from '../Product'
import { getProductList } from '../../api/product/productList';
// import { ReactComponent as LeftIcon } from '../../assets/svg/icon-left.svg';
// import { ReactComponent as RightIcon } from '../../assets/svg/icon-right.svg';

const CAROUSEL_IMAGES = [
    'https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg',
    'https://img.freepik.com/premium-vector/abstract-pastel-color-background-with-pink-purple-gradient-effect-graphic-design-decoration_120819-463.jpg',
    'https://media.architecturaldigest.com/photos/6080a73d795a7b010f3dd2e0/2:1/w_2700,h_1350,c_limit/GettyImages-1213929929.jpg'
]

const Paging = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PageNumber = styled.div`
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    cursor: pointer;
    ${({ isActive }) =>
        isActive &&
        `
        background-color: #84A080;
        color: white;
        `
    }
`;

const LeftIcon = styled.div`
    cursor: pointer;
    margin-right: 10px;
    display: ${({ currentPage }) => (currentPage > 10 ? 'block' : 'none')};
`;

const RightIcon = styled.div`
    cursor: pointer;
    margin-left: 10px;
    display: ${({ currentPage }) => (currentPage >= 10 ? 'block' : 'none')};
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

    const onPageChange = (page) => {
        // Ensure the page is within valid bounds
        if (page >= 1 && page <= totalPage) {
            setCurrentPage(page);
        }
    };
    
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxDisplayedPages = 9;
        let startPage = 1;
    
        if (totalPage > maxDisplayedPages) {
            if (currentPage > Math.floor(maxDisplayedPages / 2)) {
                startPage = currentPage - Math.floor(maxDisplayedPages / 2);
                if (startPage + maxDisplayedPages > totalPage) {
                    startPage = totalPage - maxDisplayedPages + 1;
                }
            }
        }
    
        const endPage = Math.min(startPage + maxDisplayedPages - 1, totalPage);
    
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
            <PageNumber
                key={i}
                isActive={i === currentPage}
                onClick={() => onPageChange(i)}
            >
                {i}
            </PageNumber>
            );
        }
    
        return pageNumbers;
    };
    

    return (
        <div>
            <HomeCarousel carouselList={CAROUSEL_IMAGES}/>
            <MainCategory />
            <ProductList productList={productList}/>
            <Paging>
                <LeftIcon currentPage={currentPage} onClick={() => onPageChange(currentPage - 1)}>
                    Left
                </LeftIcon>
                    {renderPageNumbers()}
                <RightIcon onClick={() => onPageChange(currentPage + 1)}>Right</RightIcon>
            </Paging>
        </div>
    );
}

export default Home;