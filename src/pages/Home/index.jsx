import React from 'react';
import Home from '../../components/Home';
import MainHeader from '../../components/Common/MainHeader'
import styled from 'styled-components';
import Footer from '../../components/Common/Footer'

const MainContainer = styled.div`
    margin-top:0px;
    margin-left:0px;
    margin-right:0px;
    margin-bottom: 20px;
`;

function HomePage() {

    return (
        <MainContainer>
            <MainHeader />
            <Home />
            <Footer />
        </MainContainer>
    );
}

export default HomePage;