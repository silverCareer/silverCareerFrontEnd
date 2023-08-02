import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const Container = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
    height: 200px;
    margin-left: 50px;
    margin-right: 50px;
`;

const ItemBox = styled.div`
    border : 1px solid #D3D3D3;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 15%;
    height: 100%;
`

const ItemImage1 = styled.div`
    width: 100%;
    height: 70%;
    margin: auto;
    background-image: url('https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f477.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain; 
`
const ItemImage2 = styled.div`
    width: 100%;
    height: 70%;
    margin: auto;
    background-image: url('https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f9d1-200d-1f4bb.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain; 
`
const ItemImage3 = styled.div`
    width: 100%;
    height: 70%;
    margin: auto;
    background-image: url('https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f9d1-1f3fb-200d-1f3a8.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain; 
`
const ItemImage4 = styled.div`
    width: 100%;
    height: 70%;
    margin: auto;
    background-image: url('https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f468-1f3fb-200d-1f527.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain; 
`
const ItemImage5 = styled.div`
    width: 100%;
    height: 70%;
    margin: auto;
    background-image: url('https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f9d1-1f3fb-200d-1f373.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain; 
`

const ItemTitleBox1 = styled.div`
    width: 100%;
    height: 20%;
    margin : auto;
    font-size: 1.3em;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SelectedCategory = styled.div`
    margin-top: 30px;
    margin-left : 100px;
    font-size: 2em;
    font-weight: bold;
    

`


const Category = () => {

    const [selectedCategory, setSelectedCategory] = useState("현장직");

    const handleBoxClick = (category) => {
        setSelectedCategory(category);
    }
    return (
        <>
            <Container>
                <ItemBox onClick={() => handleBoxClick("현장직")}>
                    <ItemImage1></ItemImage1>
                    <ItemTitleBox1>현장직</ItemTitleBox1>
                </ItemBox>
                <ItemBox onClick={() => handleBoxClick("사무직")}>
                    <ItemImage2></ItemImage2>
                    <ItemTitleBox1>사무직</ItemTitleBox1>
                </ItemBox>
                <ItemBox onClick={() => handleBoxClick("문화")}>
                    <ItemImage3></ItemImage3>
                    <ItemTitleBox1>문화</ItemTitleBox1>
                </ItemBox>
                <ItemBox onClick={() => handleBoxClick("기술직")}>
                    <ItemImage4></ItemImage4>
                    <ItemTitleBox1>기술직</ItemTitleBox1>
                </ItemBox>
                <ItemBox onClick={() => handleBoxClick("요리")}>
                    <ItemImage5></ItemImage5>
                    <ItemTitleBox1>요리</ItemTitleBox1>
                </ItemBox>
            </Container>
            <SelectedCategory>선택된 카테고리: {selectedCategory}</SelectedCategory>
        </>
    );
}

export default Category;

