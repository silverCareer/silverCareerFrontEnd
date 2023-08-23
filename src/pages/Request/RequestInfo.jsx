import React from 'react';
import styled from 'styled-components';
import RequestInfoForm from '../../components/RequestForm/RequestInfoForm'
import MainHeader from '../../components/Common/MainHeader'
import Footer from "../../components/Common/Footer"

const MainContainer = styled.div`
    margin-top:0px;
    margin-left:0px;
    margin-right:0px;
`;

function RequestInfo() {

    return (
        <MainContainer>
            <MainHeader />
            <RequestInfoForm />
            <Footer />
        </MainContainer>
    );
}

export default RequestInfo;