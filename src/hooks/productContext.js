import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [productDetail, setProductDetail] = useState({});

    return (
        <ProductContext.Provider value={{ productDetail, setProductDetail }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;