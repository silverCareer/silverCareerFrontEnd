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
    width: 100%;
`;

const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;


const Title = styled.div`
    font-size: 1.2rem;
`;

const Contents = styled.div`
    font-size: 1.2rem;
    font-weight: 300;
    color: #808080;
`

function UserInfo() {
    return (
        <MainContainer>
            <PayInfo>
                <InfoContainer>
                    <Title>가입정보</Title>
                    <Contents>멘토</Contents>
                </InfoContainer>
                <InfoContainer>
                    <Title>이름</Title>
                    <Contents>백연정</Contents>
                </InfoContainer>
                <InfoContainer>
                    <Title>이메일</Title>
                    <Contents>cnf101219@gmail.com</Contents>
                </InfoContainer>
                <InfoContainer>
                    <Title>휴대폰</Title>
                    <Contents>010-5149-9161</Contents>
                </InfoContainer>
                <InfoContainer>
                    <Title>생년월일</Title>
                    <Contents>93.12.12</Contents>
                </InfoContainer>
            </PayInfo>

            
        </MainContainer>
    );
}

export default UserInfo;