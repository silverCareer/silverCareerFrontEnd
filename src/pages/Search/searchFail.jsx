import React from 'react';
import MainHeader from '../../components/Common/MainHeader'
import styled from 'styled-components';
import Footer from '../../components/Common/Footer'
import SearchFail from '../../components/Search/SearchFail';

const MainContainer = styled.div`
    margin-top:0px;
    margin-left:0px;
    margin-right:0px;
    margin-bottom: 20px;
`;

function SearchFailPage() {
    return (
        <MainContainer>
            <MainHeader />
            <SearchFail />
            <Footer />
        </MainContainer>
    );
}

export default SearchFailPage;