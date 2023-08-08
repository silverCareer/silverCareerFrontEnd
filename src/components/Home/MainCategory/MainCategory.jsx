import React from 'react';
// import React, { useState } from 'react';
import styled from 'styled-components';
// import CategoryItem from '../../Category/Category/CategoryItem'; // Import the CategoryItem component from the new file

const imageUrls = {
    '현장직': 'https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f477-1f3fb.svg',
    '사무직': 'https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f9d1-1f3fb-200d-1f4bb.svg',
    '문화': 'https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f9d1-1f3fb-200d-1f3a8.svg',
    '기술직': 'https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f468-1f3fb-200d-1f527.svg',
    '요리': 'https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f9d1-1f3fb-200d-1f373.svg'
};


const Container = styled.div`
    display: flex;
    height: 157px;
    padding: 0px 100px;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
`;

const ItemBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 220px;
    height: 80px;
    padding: 9px 19px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 10px;
    border: 1px solid #84A080;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const ItemImage = styled.img`
    width: 100%;
    height: 70%;
    margin: auto;
    object-fit: contain;
`;

const ItemTitleBox1 = styled.div`
    width: 100%;
    height: 20%;
    margin: auto;
    font-size: 1.3em;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

const ItemDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1 0 0;
    align-self: stretch;
`
const ItemTitle = styled.div`
    color: #000;
    text-align: center;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Expletus Sans;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 41.6px */
`
const categories = ["현장직", "사무직", "문화", "기술직", "요리"];

const MainCategory = () => {
    return (
        <>
            
            <Container>
                <ItemTitle>이런 카테고리는 어때요?</ItemTitle>
                <ItemDiv>
                    {categories.map((category, index) => (
                        <ItemBox key={index}>
                            <ItemImage src={imageUrls[category]} alt={category} />
                            <ItemTitleBox1>{category}</ItemTitleBox1>
                        </ItemBox>
                    ))}
                </ItemDiv>
            </Container>
        </>
    );
};

export default MainCategory;
