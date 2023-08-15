import React, { createContext, useState } from 'react';

export const ProductDetailContext = createContext();

const ProductDetailProvider = ({ children }) => {
    const [productDetailInfo, setProductDetailInfo] = useState({});

    return (
        <ProductDetailContext.Provider value={{ productDetailInfo, setProductDetailInfo }}>
            {children}
        </ProductDetailContext.Provider>
    );
};

export default ProductDetailProvider;