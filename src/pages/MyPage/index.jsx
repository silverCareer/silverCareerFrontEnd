import React from 'react';
import MainHeader from '../../components/Common/MainHeader'
import styled from 'styled-components';
import MyPageForm from '../../components/MyPageForm'
import Footer from '../../components/Common/Footer';

const MainContainer = styled.div`
    margin-top:0px;
    margin-left:0px;
    margin-right:0px;
    
`;

function MyPage() {

    return (
        <MainContainer>
            <MainHeader />
            <MyPageForm />
            <Footer />
        </MainContainer>
    );
}

export default MyPage;