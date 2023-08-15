// CategoryItem.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const imageUrls = {
  '현장직': 'https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f477-1f3fb.svg',
  '사무직': 'https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f9d1-1f3fb-200d-1f4bb.svg',
  '문화': 'https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f9d1-1f3fb-200d-1f3a8.svg',
  '기술직': 'https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f468-1f3fb-200d-1f527.svg',
  '요리': 'https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f9d1-1f3fb-200d-1f373.svg'
};

const ItemBox = styled.div`
  border: 1px solid #D3D3D3;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 15%;
  height: 100%;
  cursor: pointer;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);

  &:hover {
        background-color: #84A080;
        color: white;
  }
`;

const ItemImage = styled.div`
  width: 100%;
  height: 70%;
  margin: auto;
  background-image: url('${props => imageUrls[props.id]}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  
`;

const ItemTitleBox1 = styled.div`
  width: 100%;
  height: 20%;
  font-size: 1.3em;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

const CategoryItem = ({ category, selected, onClick }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    onClick(category);
    navigate(`/category/${encodeURIComponent(category)}`);
  };

  return (
    <ItemBox onClick={handleItemClick} 
            style={{
              backgroundColor: selected ? '#84A080' : '',
              color: selected ? 'white' : ''
    }}>
      <ItemImage id={category} />
      <ItemTitleBox1>{category}</ItemTitleBox1>
    </ItemBox>
  );
};

export default CategoryItem;
