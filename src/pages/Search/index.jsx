import React from 'react';
import MainHeader from '../../components/Common/MainHeader'
import styled from 'styled-components';
import Footer from '../../components/Common/Footer'
import Search from '../../components/Search';

const MainContainer = styled.div`
    margin-top:0px;
    margin-left:0px;
    margin-right:0px;
    margin-bottom: 20px;
`;

function SearchPage() {

    return (
        <MainContainer>
            <MainHeader />
            <Search />
            <Footer />
        </MainContainer>
    );
}

export default SearchPage;