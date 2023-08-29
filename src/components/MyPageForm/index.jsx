import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Profile from './Profile';
import InfoOfPay from './InfoOfPay';
import UserInfo from './UserInfo';
import MyCourses from './MyCourses';
import { MypageContext } from '../../hooks/mypageContext';
import { LoginContext } from '../../hooks/loginContext';
import { getMyProfile } from '../../api/mypage/mypage';

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
    const { loginForm } = useContext(LoginContext);
    const { myPageForm, setMyPageForm } = useContext(MypageContext);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("여기가 계속 되나?");
                const data = await getMyProfile();
                setMyPageForm(data);
            } catch (error) {
                console.error("Error fetching product detail:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <MainContainer>
            <SubContainer>
                <Title>마이페이지</Title>
                <Profile myPageForm={myPageForm} />
                {loginForm.authority === '멘티' && (
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
                <UserInfo myPageForm={myPageForm} />
            </SubContainer>
        </MainContainer>
    );
}

export default MyPageForm;