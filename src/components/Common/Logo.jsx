import React from 'react';
import styled from 'styled-components';
import logoImage from '../../assets/image/logoImage.jpg';

const Container  = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
`;

const LogoFrame = styled.div`
    width : 100px;
    height: 50px;
    background-image: url(${logoImage});
    background-repeat: no-repeat;
`
const Logo = () => {
    return (
        <Container>
            <LogoFrame></LogoFrame>
        </Container>
        
    );
};

export default Logo;