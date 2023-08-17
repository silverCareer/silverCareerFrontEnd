import React, { useContext } from 'react';
import { ProductContext } from '../../hooks/productContext';
import Card from './Card'

function ProductList({ productList }) {
    // const { setProductTitle } = useContext(ProductContext);

    // const handleCardClick = (product) => {
    //     setProductTitle(product);
    // };

    return (
        <main className="product">
                <ul className="product-list">
                    {productList.map((product) => 
                    <Card product={product} key={product.productIdx} />)}
                </ul>

        </main>
    );
}
export default ProductList;