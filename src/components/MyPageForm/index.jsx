import React, { useContext } from 'react';
import styled from 'styled-components';
import Profile from './Profile';
import InfoOfPay from './InfoOfPay';
import UserInfo from './UserInfo';
import MyCourses from './MyCourses';
import { MypageContext } from '../../hooks/mypageContext';

const MainContainer = styled.div`
    margin: 20px 170px;
`;
const SubContainer = styled.div `
    padding: 20px;
`
const Title = styled.div`
    padding-bottom: 20px;
    font-size: 1.3rem;
    font-weight: 600;

    .subTitle {
        font-size: 1.1rem;
    }
`
const Line = styled.div`
    height: 1px;
    width: 100%;
    background-color: #ccc; 
    margin: 1em 0; 
`

function MyPageForm() {
    const { myPageForm } = useContext(MypageContext);

    return (
        <MainContainer>
            <SubContainer>
                <Title>마이페이지</Title>
                <Profile />
                { myPageForm.authority === '멘티' && (
                    <>
                        <Line />
                        <Title className="subTitle">페이 정보</Title>
                        <InfoOfPay myPageForm={myPageForm} />
                        <Line />
                        <Title className="subTitle">구매 이력</Title>
                        <MyCourses />
                    </>
                )}
                <Line />
                <Title className="subTitle">사용자 정보</Title>
                <UserInfo />
            </SubContainer>
        </MainContainer>
    );
}

export default MyPageForm;