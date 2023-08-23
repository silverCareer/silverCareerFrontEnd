import React from 'react';
import styled from 'styled-components';
import BidListForm from '../../components/RequestForm/BidListForm'
import MainHeader from '../../components/Common/MainHeader'
import Footer from "../../components/Common/Footer"

const MainContainer = styled.div`
    margin-top:0px;
    margin-left:0px;
    margin-right:0px;
`;

function BidList() {

    return (
        <MainContainer>
            <MainHeader />
            <BidListForm />
            <Footer />
        </MainContainer>
    );
}

export default BidList;