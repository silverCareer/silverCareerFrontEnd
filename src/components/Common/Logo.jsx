import React from 'react';
import styled from 'styled-components';
import logoImage from '../../assets/image/logoImage.jpg';
import { useNavigate } from 'react-router-dom';

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

    cursor: pointer;
`
const Logo = () => {
    const navigate = useNavigate();

    const handleLogo = () => {
        navigate('/');
    }

    return (
        <Container>
            <LogoFrame onClick={handleLogo}></LogoFrame>
        </Container>
        
    );
};

export default Logo;