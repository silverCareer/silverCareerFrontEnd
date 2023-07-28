import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: white;
    border-bottom: 1px solid #ddd;
`;

const Header = () => (
    <HeaderContainer>
        <Logo />
    </HeaderContainer>
);

export default Header;