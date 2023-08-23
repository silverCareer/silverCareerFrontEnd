import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryItem from './CategoryItem'; // Import the CategoryItem component from the new file
import ProductList from '../Product';
import { getProductList } from '../../api/product/productList';

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  height: 200px;
  margin: 25px 0px;
`;
const SelectedCategory = styled.div`
  margin: 30px 10px 20px 125px;
//  margin-left: 125px;
  font-size: 27px;
  font-weight: bold;
`;
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

const Category = ({ category }) => {
  const categories = ["현장직", "사무직", "문화", "기술직", "요리"];
  const [selectedCategory, setSelectedCategory] = useState(category); // 초기값 설정
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태 추가
  const [totalPage, setTotalPage]  = useState(1);

  const handleBoxClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
      async function fetchData() {
          try {
              const productList = await getProductList(selectedCategory, currentPage, 9);

              if (productList.success) {
                  setProductList(productList.response.content);
                  setTotalPage(productList.response.totalPages);
              } else {
                  console.error("Failed to fetch product List:", productList.error);
              }
          } catch (error) {
              console.error("Error fetching product List:", error);
              setProductList([]);
          }
      }
      fetchData();
  }, [selectedCategory, currentPage]);

  //paging
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
    <>
      <Container>
        {categories.map((category) => (
          <CategoryItem
            key={category}
            category={category}
            selected={category === selectedCategory}
            onClick={handleBoxClick}
          />
        ))}
      </Container>
      <SelectedCategory>선택된 카테고리: {selectedCategory}</SelectedCategory>
      <ProductList productList={productList}/>
      <Paging>
          <LeftIcon currentPage={currentPage} onClick={() => onPageChange(currentPage - 1)}>
              Left
          </LeftIcon>
              {renderPageNumbers()}
          <RightIcon onClick={() => onPageChange(currentPage + 1)}>Right</RightIcon>
      </Paging>
    </>
  );
};

export default Category;
