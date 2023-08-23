import React from 'react';
import MainHeader from '../../components/Common/MainHeader'
import styled from 'styled-components';
import ChargePageForm from '../../components/ChargePageForm'
import Footer from '../../components/Common/Footer';

const MainContainer = styled.div`
    margin-top:0px;
    margin-left:0px;
    margin-right:0px;
    
`;

function ChargePage() {

    return (
        <MainContainer>
            <MainHeader />
            <ChargePageForm />
            <Footer />
        </MainContainer>
    );
}

export default ChargePage;