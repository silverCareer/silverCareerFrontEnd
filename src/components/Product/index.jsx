import React, { useContext } from 'react';
import { ProductContext } from '../../hooks/productContext';
import Card from './Card'

const item = [
    {
        "image" : "http://test.api.weniv.co.kr/asset/img/7/thumbnailImg.jpg",
        "contents" : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "price" : 1500,
        "rate" : "⭐ 5.0"
    },
    {
        "image" : "http://test.api.weniv.co.kr/asset/img/7/thumbnailImg.jpg",
        "contents" : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "price" : 1500,
        "rate" : "⭐ 5.0"
    },
    {
        "image" : "http://test.api.weniv.co.kr/asset/img/7/thumbnailImg.jpg",
        "contents" : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "price" : 1500,
        "rate" : "⭐ 5.0"
    },
    {
        "image" : "http://test.api.weniv.co.kr/asset/img/6/thumbnailImg.jpg",
        "contents" : "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "price" : 1500,
        "rate" : "⭐ 5.0"
    }
]

function ProductList({ productList }) {
    const { setProductDetail } = useContext(ProductContext);

    const handleCardClick = (product) => {
        setProductDetail(product);
        // Navigate logic here
    };

    return (
        <main className="product">
                <ul className="product-list">
                    {productList.map((product) => 
                    <Card product={product} key={product.productIdx} handleCardClick={handleCardClick}/>)}
                </ul>

        </main>
    );
}
export default ProductList;