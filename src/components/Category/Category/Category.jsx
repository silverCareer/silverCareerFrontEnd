import React, { useState } from 'react';
import styled from 'styled-components';
import CategoryItem from './CategoryItem.jsx'; // Import the CategoryItem component from the new file

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  height: 200px;
  margin-left: 50px;
  margin-right: 50px;
`;

const SelectedCategory = styled.div`
  margin-top: 30px;
  margin-left: 100px;
  font-size: 2em;
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
    </>
  );
};

export default Category;
