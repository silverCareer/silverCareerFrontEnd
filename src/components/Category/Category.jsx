import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryItem from './CategoryItem'; // Import the CategoryItem component from the new file
import ProductList from '../Product';
import { getProductList } from '../../api/product/productList';
import PagingContent from '../Common/Paging';

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

const Category = ({ category }) => {
  const categories = ["현장직", "사무직", "문화", "기술직", "요리"];
  const [selectedCategory, setSelectedCategory] = useState(category); // 초기값 설정
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태 추가
  const [totalPage, setTotalPage]  = useState(1);

  const handleBoxClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
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
              setTotalPage(1);
          }
      }
      fetchData();
  }, [selectedCategory, currentPage]);

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
      <PagingContent currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
    </>
  );
};

export default Category;
