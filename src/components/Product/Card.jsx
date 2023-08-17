import '../../style/style.css';
import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
//import { ProductContext } from '../../hooks/productContext';
import { ProductDetailContext } from '../../hooks/productDetailContext';
import { getProductDetail } from '../../api/product/productDetail';

export default function Card({product}) {
    
    const navigate = useNavigate();
    //const { setProductTitle } = useContext(ProductContext); //이건 간단하게 뜨는 상품 정보
    const { setProductDetailInfo } = useContext(ProductDetailContext); //useContext로 넘길 상품 자세 페이지
    
    const handleCardClick = async () => {
        try {
            const productDetailResponse = await getProductDetail(product.productIdx);
            console.log('Product Detail:', productDetailResponse);
            
            if (productDetailResponse.success) {
                //setProductTitle(product);
                setProductDetailInfo(productDetailResponse.response);

                console.log(productDetailResponse.response, "dfsdfsdfsdfsf");

                navigate(`/product/${product.productIdx}`);
            } else {
                console.error("Failed to fetch product Detail:", productDetailResponse.error);
            }
        } catch (error) {
            console.error("Error fetching product Detail:", error);
        }
    };

    return (
        <li className="product-item" onClick={handleCardClick}>
            <div className="product-img">
                <img src={product.productImage} alt="img"/>
            </div>
            <div className="product-category">현장직</div>
            <div className="product-detail">
                <span>{product.productDescription}</span>
            </div>            
            <button className="like-btn"></button>
            <div className="product-price">
                <span>{product.productPrice} 원</span>
            </div>
            <div className="product-rate">
                <span>{product.productLikes}</span>
            </div>
        </li>
    );
}