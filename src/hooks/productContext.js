import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [productTitle, setProductTitle] = useState({});

    return (
        <ProductContext.Provider value={{ productTitle, setProductTitle }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;