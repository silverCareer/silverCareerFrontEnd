import '../../style/style.css';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../../hooks/productContext';

export default function Card({product}) {
    const navigate = useNavigate();
    const { setProductDetail } = useContext(ProductContext);

    const handleCardClick = (product) => {
        setProductDetail(product)
        navigate(`/product/${product.productIdx}`);
    };

    return (
        <li className="product-item" onClick={() => handleCardClick(product)}>
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