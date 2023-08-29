import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ProductDetailContext } from '../../../hooks/productDetailContext';
import ProductDetailTop from './ProductDetailTop'
import ProductDetailBottom from './ProductDetailBottom'
import ProductReview from './ProductReview'
import { getProductDetail } from '../../../api/product/productDetail';
import { LoginContext } from '../../../hooks/loginContext';
import { useParams } from 'react-router';

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
    const { productDetailInfo, setProductDetailInfo } = useContext(ProductDetailContext);
    const [ avgRating, setAvgRating ] = useState();
    const { isLoggedIn } = useContext(LoginContext);
    const [isLoading, setIsLoading] = useState(!productDetailInfo.productIdx);
    
    // useParams를 사용하여 productIdx 추출
    const { productIdx } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productDetailResponse = await getProductDetail(productIdx, isLoggedIn);
                setProductDetailInfo(productDetailResponse.response);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching product detail:", error);
            }
        };

        fetchData();
    }, [isLoggedIn]);

    return (
        <ProductContianer>
            { isLoading ? (
                <div>Loadding...</div>    
            ) : (
                <>
                <ProductDetailTop productDetailInfo={productDetailInfo} avgRating={avgRating} />
                <ProductDetailBottom productDetailInfo={productDetailInfo} />
                <ProductReview productDetailInfo={productDetailInfo} setAvgRating={setAvgRating} />
                </>
            )}
        </ProductContianer>
    );
}

export default ProductDetail;