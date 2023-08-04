import React from 'react';
import MainHeader from '../../components/Common/MainHeader'
import styled from 'styled-components';
import Container from '../../components/MyPageForm/AccountEdit'
import Footer from '../../components/Common/Footer';


const MainContainer = styled.div`
    margin-top:0px;
    margin-left:0px;
    margin-right:0px;
    
`;

function AccountEdit() {

    return (
        <MainContainer>
            <MainHeader />
            <Container />
            <Footer />
        </MainContainer>
    );
}

export default AccountEdit;