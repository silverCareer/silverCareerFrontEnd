import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from '../../assets/image/logoImage.jpg';

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
    height: 70px;
    margin : 10px 300px 0px 300px;
`;
const Logo = styled.div`
    cursor: pointer;
    width: 100px;
    height: 50px;
    background-image: url(${logoImage});
    background-repeat: no-repeat;
`;
const Line = styled.div`
    height: 1px;
    width: 100%;
    background-color: #ccc; 
    margin: 1em 0; 
`;
const RegistButton = styled.div `
    display: flex;
    width: 140px;
    height: 40px;
    padding: 3px 10px;
    justify-content: center;
    align-items: center;

    flex-shrink: 0;
    border-radius: 10px;
    background: #84A080;

    font-weight: 500;
    font-size: 18px;
    color: white;

    cursor: pointer;
    &:hover {
        color: white;
        background-color: #637560;
    }
`;

function RegisterHeader() {
    const navigate = useNavigate();

    return (
        <>
            <Header>
                <Logo onClick={() => navigate('/')}></Logo>
                <RegistButton>등록 하기</RegistButton>
            </Header>
            <Line />
        </>
    );
}

export default RegisterHeader;