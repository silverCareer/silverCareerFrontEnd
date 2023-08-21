import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from '../../assets/image/logoImage.jpg';

const Header = styled.header`
    display: flex;
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
const PageTitle = styled.div `
    display: flex;
    height: 40px;
    padding: 3px 10px;
    justify-content: left;
    align-items: center;

    font-size: 20px;
    color: gray;
    span {
        color: #414141;
        font-weight: 600;
    }
`;

function RegisterHeader() {
    const navigate = useNavigate();

    return (
        <>
            <Header>
                <Logo onClick={() => navigate('/')}></Logo>
                <PageTitle><span>주문 확인 및 결제&nbsp;</span>
                &nbsp;주문완료
                </PageTitle>
            </Header>
            <Line />
        </>
    );
}

export default RegisterHeader;