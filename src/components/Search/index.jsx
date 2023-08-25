import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { SearchContext } from '../../hooks/searchContext';
import ProductList from '../Product';
import { searchAPI } from '../../api/search/productSearch';
import PagingContent from '../Common/Paging';
//test
const SearchContainer = styled.div `
    padding: 10px 100px;
`;
const Title = styled.div `
    padding-left: 100px;
    font-size: 20px;
    font-weight: bolder;
`;

function Search() {
    const { searchProductList, setSearchProductList, searchContent } = useContext(SearchContext);
    const totalPage = searchProductList.totalPages;
    const [ currentPage, setCurrentPage ] = useState(searchProductList.currentPage);
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await searchAPI(searchContent, currentPage, 9);
                setSearchProductList(result.response);
            } catch (error) {
                console.error("Error fetching product List:", error);
                if(error.response.status === 404) {
                    alert("검색 결과가 없습니다!");
                }
                
                setSearchProductList('');
            }
        }
        fetchData();
    }, [currentPage]);
    
    return (
        <>
            <SearchContainer>
                <Title>
                '{searchContent}'에 대한 {searchProductList.totalResults}개의 검색 결과</Title>
                <ProductList productList={searchProductList.content} />
            </SearchContainer>
            <PagingContent currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
        </>
    );
}

export default Search;