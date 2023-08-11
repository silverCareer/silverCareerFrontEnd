import React, { useState } from 'react';
import styled from 'styled-components';
import CategoryItem from './CategoryItem.jsx'; // Import the CategoryItem component from the new file
import ProductList from '../../Home/ClassComponents/ProductList'

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

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("현장직");

  const handleBoxClick = (category) => {
    setSelectedCategory(category);
  };

  const categories = ["현장직", "사무직", "문화", "기술직", "요리"];

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
      <ProductList />
    </>
  );
};

export default Category;
