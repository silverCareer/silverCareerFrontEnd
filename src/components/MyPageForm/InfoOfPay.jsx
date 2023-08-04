import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 100px;
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
    color: #84A080;;
    border-radius: 5px;
    margin-left: 30px;
    cursor: pointer;
`;

const Title = styled.div`
    font-size: 1.2rem;
`;

function InfoOfPay() {
    return (
        <MainContainer>
            <PayInfo>
                <InfoContainer>
                    <Title>잔여금</Title>
                    <div>1000000원</div>
                    <Button onClick={()=>{}}>충전하기</Button>
                </InfoContainer>
                <InfoContainer>
                    <Title>충전 / 사용 내역</Title>
                    <Button onClick={()=>{}}>보러가기</Button>
                </InfoContainer>
            </PayInfo>

            
        </MainContainer>
    );
}

export default InfoOfPay;