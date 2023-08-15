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
  margin-top: 30px;
  margin-left: 125px;
  font-size: 27px;
  font-weight: bold;
`;

const Category = ({ category }) => {
  const categories = ["현장직", "사무직", "문화", "기술직", "요리"];
  const [selectedCategory, setSelectedCategory] = useState(category); // 초기값 설정
  const [productList, setProductList] = useState([]);

  const handleBoxClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
      async function fetchData() {
          try {
              const productList = await getProductList(selectedCategory);
              
              if (productList.success) {
                  setProductList(productList.response);
              } else {
                  console.error("Failed to fetch product List:", productList.error);
                  console.log("123");

              }
          } catch (error) {
              console.error("Error fetching product List:", error);
              setProductList([]);

          }
      }
      fetchData();
  }, [selectedCategory]);

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
    </>
  );
};

export default Category;
