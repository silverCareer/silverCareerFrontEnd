import React from 'react';
import CategoryHome from '../../components/Category';
import MainHeader from '../../components/Common/MainHeader'
import styled from 'styled-components';

const MainContainer = styled.div`
    margin-top:0px;
    margin-left:0px;
    margin-right:0px;
    
`;

function CategoryHomePage() {

    return (
        <MainContainer>
            <MainHeader />
            <CategoryHome />;
        </MainContainer>
    );
}

export default CategoryHomePage;