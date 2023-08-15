import React, { useContext } from 'react';
import styled from 'styled-components';
import { MypageContext } from '../../hooks/mypageContext';

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
    const { myPageForm } = useContext(MypageContext);
    const { authority, name, email, phoneNumber, age, career } = myPageForm;


    return (
        <MainContainer>
            <PayInfo>
                <InfoContainer>
                    <Title>가입정보</Title>
                    <Contents>{ authority }</Contents>
                </InfoContainer>
                <InfoContainer>
                    <Title>이름</Title>
                    <Contents>{ name }</Contents>
                </InfoContainer>
                <InfoContainer>
                    <Title>이메일</Title>
                    <Contents>{ email }</Contents>
                </InfoContainer>
                <InfoContainer>
                    <Title>휴대폰</Title>
                    <Contents>{ phoneNumber}</Contents>
                </InfoContainer>
                <InfoContainer>
                    <Title>나이</Title>
                    <Contents>{ age }</Contents>
                </InfoContainer>
                {authority === '멘토' && (
                    <InfoContainer>
                        <Title>경력</Title>
                        <Contents>{ career }</Contents>
                    </InfoContainer>
                )}
            </PayInfo>

            
        </MainContainer>
    );
}

export default UserInfo;