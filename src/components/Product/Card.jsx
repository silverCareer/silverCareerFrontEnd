
import styled from 'styled-components';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductDetailContext } from '../../hooks/productDetailContext';
import { getProductDetail } from '../../api/product/productDetail';

/* svg */
import likeIconImage from '../../assets/svg/icon-heart.svg'

const ProductItem = styled.li `
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    cursor: pointer;
`
const ProductImg = styled.div `
    height: 350px;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    overflow: hidden;
`
const Product1 = styled.div `
    align-items: center;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    font-size: 15px;
    color: rgb(157, 157, 157);

    .productLike {
        display: flex;
        align-items: center;
        color: black;
    }

    .like-btn {
        width: 20px;
        cursor: pointer;

        &:hover {

        }
    }   
`
const LikeIcon = styled.div `
    width: 22px;
    height: 22px;
    color: black;
    background-image: url(${likeIconImage});
    background-repeat: no-repeat;

    cursor: pointer;
`
export default function Card({product}) {
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const navigate = useNavigate();
    const { setProductDetailInfo } = useContext(ProductDetailContext); //useContext로 넘길 상품 자세 페이지
    
    const handleCardClick = async () => {
        try {
            const productDetailResponse = await getProductDetail(product.productIdx);
            console.log('Product Detail:', productDetailResponse);
            
            if (productDetailResponse.success) {
                //setProductTitle(product);
                setProductDetailInfo(productDetailResponse.response);

                navigate(`/product/${product.productIdx}`);
            } else {
                console.error("Failed to fetch product Detail:", productDetailResponse.error);
            }
        } catch (error) {
            console.error("Error fetching product Detail:", error);
        }
    };

    return (
        <ProductItem onClick={handleCardClick}>
            <ProductImg>
                <img src={product.productImage} alt="img"/>
            </ProductImg>
            <Product1>
                <div>{product.category}</div>
                <div className="productLike">
                    <LikeIcon />
                    <span>&nbsp;{product.productLikes}</span>
                </div>
            </Product1>
            <div className="product-detail">
                <span>{product.productName}</span>
            </div>            
            <div className="product-price">
                <span>{numberWithCommas(product.productPrice ?? 0)} 원</span>
            </div>
            <div className="product-rate">
                
            </div>
        </ProductItem>
    );
}