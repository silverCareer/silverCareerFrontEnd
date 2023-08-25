import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [ searchProductList, setSearchProductList] = useState({});
    const [ searchContent, setSearchContent ] = useState(); // 현재 페이지 추가

    return (
        <SearchContext.Provider value={{ searchProductList, setSearchProductList, searchContent, setSearchContent }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;