import React, { useContext } from 'react';
import styled from 'styled-components';
import { SearchContext } from '../../hooks/searchContext';

const SearchContainer = styled.div `
    padding: 10px 100px;
`;
const Title = styled.div `
    padding-left: 100px;
    font-size: 20px;
    font-weight: bolder;
`;

export default function SearchFail() {
    const { searchContent } = useContext(SearchContext);
    console.log(searchContent);

    return (
        <SearchContainer>
            <Title>
                '{searchContent}'에 대한 검색 결과가 없습니다.
            </Title>
        </SearchContainer>
    );
}