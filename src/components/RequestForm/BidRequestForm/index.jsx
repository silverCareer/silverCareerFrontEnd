import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { postBidConfirm } from '../../../api/request/postBidConfirm'

const MainContainer = styled.div`
    border: 1px solid #E0E0E0;
    display: flex;
    flex-direction: column;
    padding: 20px 50px;
    width: 650px;
    color: #84A080;
    margin: 20px auto;
    border-radius: 5px;
`;

const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const Title = styled.div`
    font-size: 1.2rem;
`;

const Contents = styled.div`
    font-size: 1.2rem;
    font-weight: 300;
    color: #808080;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const Button = styled.button`
    background-color: #84A080;
    color: white;
    margin: 0 10px;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const Alarm = styled.div`
    background: #84A080;
    color: white;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    z-index: 1000;
    display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const BidRequestForm = () => {
    const [showAlarm, setShowAlarm] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const requestInfo = location.state?.requestInfo;
    
    const category = requestInfo.category;
    const mentorName = requestInfo.mentorName;
    const requestTitle = requestInfo.title;
    const requestPrice = requestInfo.price;

    const handleAccepted = async () => {
        const bidIdx = requestInfo.bidIdx;

        try{
            const response = await postBidConfirm(bidIdx);

            if (response.response){
                setShowAlarm(true);
                setTimeout(() => {
                    setShowAlarm(false); 
                    navigate('/') 
                }, 2000); 
            }

        } catch (error){
            console.log("입찰수락 API 에러닷! : "+ error)
        }
    };

    return (
        <>
            <Alarm visible={showAlarm}>
                유익한 시간 보내슈
            </Alarm>
            <MainContainer>
                <InfoContainer>
                    <Title>카테고리</Title>
                    <Contents>{category}</Contents>
                </InfoContainer>
                
                <InfoContainer>
                    <Title>멘토 닉네임</Title>
                    <Contents>{mentorName}</Contents>
                </InfoContainer>

                <InfoContainer>
                    <Title>의뢰 타이틀</Title>
                    <Contents>{requestTitle}</Contents>
                </InfoContainer>

                <InfoContainer>
                    <Title>멘토의 입찰 가격</Title>
                    <Contents>{requestPrice}원</Contents>
                </InfoContainer>


                <ButtonContainer>
                    <Button onClick={handleAccepted}>수락하기</Button>
                    <Button>채팅하기</Button>
                </ButtonContainer>
            </MainContainer>
        </>
    );
}

export default BidRequestForm;