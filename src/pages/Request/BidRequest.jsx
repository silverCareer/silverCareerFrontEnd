import React from 'react';
import styled from 'styled-components';
import BidRequestForm from '../../components/RequestForm/BidRequestForm'
import MainHeader from '../../components/Common/MainHeader'
import Footer from "../../components/Common/Footer"

const MainContainer = styled.div`
    margin-top:0px;
    margin-left:0px;
    margin-right:0px;
`;

function BidRequest() {

    return (
        <MainContainer>
            <MainHeader />
            <BidRequestForm />
            <Footer />
        </MainContainer>
    );
}

export default BidRequest;