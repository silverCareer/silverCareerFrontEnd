import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PayInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const Button = styled.button`
    padding: 10px;
    border: 1px solid #84A080;
    color: white;
    background-color: #84A080;
    border-radius: 5px;
    margin-left: 30px;
    cursor: pointer;
    &:hover {
        background-color: #6f8a6a;
    }
`;

const Title = styled.div`
    font-size: 1.2rem;
    width: 200px;
`;

function InfoOfPay({myPageForm}) {
    const navigate = useNavigate();

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleCharge = () => {
        navigate('/mypage/charge', { state: { balance: myPageForm.balance } });
    };

    return (

        <MainContainer>
            <PayInfo>
                <InfoContainer>
                    <Title>잔여금</Title>
                        <div>{numberWithCommas(myPageForm.balance ?? 0)} 원</div>
                    <Button onClick={handleCharge}>충전하기</Button>
                </InfoContainer>
            </PayInfo>
        </MainContainer>
    );
}

export default InfoOfPay;