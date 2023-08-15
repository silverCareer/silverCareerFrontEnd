import React, { useContext } from 'react';
import styled from 'styled-components';
import Profile from './Profile';
import InfoOfPay from './InfoOfPay';
import UserInfo from './UserInfo';
import { MypageContext } from '../../hooks/mypageContext';

const MainContainer = styled.div`
    margin-top:20px;
    margin-left:100px;
    margin-right:100px;
`;

const Title = styled.div`
    padding: 20px 100px;
    font-size: 1.3rem;
    font-weight: 600;
`

const Title2 = styled.div`
    padding: 20px 100px;
    font-size: 1.1rem;
    font-weight: 600;
`

const Line = styled.div`
    height: 1px;
    width: 100%;
    background-color: #ccc; 
    margin: 1em 0; 
`

function MyPageForm() {
    const { myPageForm } = useContext(MypageContext);
    const { authority } = myPageForm;

    return (
        <MainContainer>
            <Title>마이페이지</Title>
            <Profile />
            { authority === '멘티' && (
            <>
            <Line></Line>
            <Title2>페이 정보</Title2>
            <InfoOfPay />
            </>
            )}
            <Line></Line>
            <Title2>사용자 정보</Title2>
            <UserInfo />
            
        </MainContainer>
    );
}

export default MyPageForm;