import React from 'react';
import styled from 'styled-components';
import ProductDetailTop from './ProductDetailTop'
import ProductDetailBottom from './ProductDetailBottom'
import ProductReview from './ProductReview'
import ProductQNA from './ProductQNA'

const ProductContianer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 200px;
    gap: 10px;
    flex: 1 0 0;
    align-self: stretch;
`;

function ProductDetail() {
    return (
        <ProductContianer>
            <ProductDetailTop />
            <ProductDetailBottom />
            <ProductReview />
            <ProductQNA />
        </ProductContianer>
    );
}

export default ProductDetail;