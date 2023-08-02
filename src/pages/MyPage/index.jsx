import React from 'react';
import MainHeader from '../../components/Common/MainHeader'
import styled from 'styled-components';

const MainContainer = styled.div`
    margin-top:0px;
    margin-left:0px;
    margin-right:0px;
    
`;

function MyPage() {

    return (
        <MainContainer>
            <MainHeader />
        </MainContainer>
    );
}

export default MyPage;