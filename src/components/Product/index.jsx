import React from 'react';
import styled from 'styled-components';
import Card from './Card'

const ProductContainer = styled.div `
    margin: 10px 100px;
    display: flex;
    flex-direction: column;
`
const ProductListContainer = styled.div `
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;

    list-style: none;
`

function ProductList({ productList }) {
    return (
        <ProductContainer>
            <ProductListContainer>
                {productList.map((content) => 
                    <Card product={content} key={content.productIdx} />)
                }
            </ProductListContainer>
        </ProductContainer>
    );
}
export default ProductList;