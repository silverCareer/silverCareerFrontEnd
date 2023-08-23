import React from 'react';
import styled from 'styled-components';
import RequestRorm from '../../components/RequestForm'
import MainHeader from '../../components/Common/MainHeader'
import Footer from "../../components/Common/Footer"

const MainContainer = styled.div`
    margin-top:0px;
    margin-left:0px;
    margin-right:0px;
`;

function Request() {

    return (
        <MainContainer>
            <MainHeader />
            <RequestRorm />
            <Footer />
        </MainContainer>
    );
}

export default Request;