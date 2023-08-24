import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../hooks/loginContext';
import { createChatRoom } from '../../../api/chat/createChatRoom';
import { postBidPayment } from './../../../api/request/postBidPayment';

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

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`
const ModalContent = styled.div`
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`
const ModalLabel = styled.label`
    display: block;
    margin-bottom: 10px;
    font-size: 20px;
`
const ModalInput = styled.textarea`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
`
const ModalButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`
const ModalButton = styled.button`
    padding: 10px 20px;
    background-color: #84A080;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #6f896d;
    }
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
    const bidIdx = requestInfo.bidIdx;

    const { loginForm } = useContext(LoginContext);
    const { name } = loginForm;
    const [isModalOpen, setModalOpen] = useState(false);

    const handleAccepted = async (bidIdx, bidprice, bidtitle, mentor) => {

        try{
            // const response = await postBidPayment(bidIdx);

            if (true){
                setShowAlarm(true);
                setTimeout(() => {
                    setShowAlarm(false); 
                    navigate('/bidList/payment',{ state : { requestInfo: { bidIdx, bidprice, bidtitle, mentor }}}) 
                }, 1000); 
            }

        } catch (error){
            console.log("입찰수락 API 에러닷! : "+ error)
        }
    };

    return (
        <>
            <Alarm visible={showAlarm}>
                결제창으로 이동합니다...
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
                    <Button onClick={() => handleAccepted(bidIdx, requestPrice, requestTitle, mentorName )}>결제하기</Button>
                    <Button onClick={name ? () => setModalOpen(true) : null} disabled={!name}>문의하기</Button>
                </ButtonContainer>
            </MainContainer>
            <InquiryModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} name={name} memtorName={mentorName}/>
        </>
    );
}

function InquiryModal({ isOpen, onClose, name, memtorName }) {
    
    const [inquiryContent, setInquiryContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const newMessage = {
            content: inquiryContent,
            sender: name, 
            timestamp: new Date().toISOString() 
        };

        try {
            const result = await createChatRoom(name, memtorName, newMessage);
            console.log("Chat room created:", result);
            onClose();
            navigate("/chatroom");

        } catch (error) {
            console.error("Error creating chat room:", error);
        }

    };

    return (
        isOpen && (
            <ModalWrapper onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalLabel>To {memtorName}</ModalLabel>
                <ModalInput 
                    placeholder="첫 채팅할 내용을 적어주세요." 
                    rows="5"
                    value={inquiryContent}
                    onChange={(e) => setInquiryContent(e.target.value)}
                />

                <ModalButtonWrapper>
                <ModalButton onClick={handleSubmit}>보내기</ModalButton>
                <ModalButton onClick={onClose}>닫기</ModalButton>
                </ModalButtonWrapper>
            </ModalContent>
            </ModalWrapper>
        )
    );
}

export default BidRequestForm;