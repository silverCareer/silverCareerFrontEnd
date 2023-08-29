import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getBidList } from '../../../api/request/getBidList';
import { postBidConfirm } from '../../../api/request/postBidPayment'
import { LoginContext } from '../../../hooks/loginContext';
import { createChatRoom } from '../../../api/chat/createChatRoom';

const MainContainer = styled.div`
    border: 1px solid #E0E0E0;
    display: flex;
    flex-direction: column;
    padding: 5px 20px;
    width: 900px;
    margin: 20px auto;
    border-radius: 5px;
`;
const MainTitle = styled.div `
    font-size: 23px;
    margin-bottom: 10px;
    font-weight: 600;
    margin: 20px auto;
    width: 900px;
`;
const BidItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #E0E0E0;
    &:last-child {
        border-bottom: none;
    }
`;
const BidDetail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin: 20px 10px;
`;

const BidTitle = styled.h3`
    margin: 0;
    font-weight: 600;
    font-size: 16px;

    div {
        
    }
`;

const BidButton = styled.button`
    margin-left: 10px;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    background-color: #84A080;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #6f8a6c;
    }
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

const CompletedBid = styled.div`
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    margin-top: 10px;
    color: #666;
`;

const BidListForm = () => {
    const [showAlarm, setShowAlarm] = useState(false);
    const navigate = useNavigate();

    const [bids, setBids] = useState([]);

    const { loginForm } = useContext(LoginContext);
    const { name } = loginForm;
    const [isModalOpen, setModalOpen] = useState(false);

    const [selectedMentorName, setSelectedMentorName] = useState("");
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    useEffect(() => {
        async function fetchBidData() {
            try {
                const response = await getBidList();
                setBids(response.response);

            } catch (error) {
                console.log("입찰내역 API 에러닷 ! : " + error);
            }
        }
        fetchBidData();
    }, []);

    const handleAccepted = async (bidIdx, bidprice, bidtitle, mentor) => { 
        try {
            if (true) {
                setShowAlarm(true);
                setTimeout(() => {
                    setShowAlarm(false); 
                    navigate('/bidList/payment',{ state : { requestInfo: { bidIdx, bidprice, bidtitle, mentor }}}) 
                }, 1000); 
            }
        } catch (error) {
            console.log("입찰수락 API 에러닷! : "+ error)
        }
    };

    const openInquiryModalWithMentor = (mentorName) => {
        setSelectedMentorName(mentorName);
        setModalOpen(true);
    };

    return (
    <>   
        <Alarm visible={showAlarm}>
        결제 페이지 이동...
        </Alarm>
        <MainTitle>입찰 내역</MainTitle>
        <MainContainer>
            {bids.length > 0 ? bids.map((bid) => (
                <BidItem key={bid.bidIdx}>
                    <BidDetail>
                        <BidTitle>{bid.title}</BidTitle>
                        <div>카테고리: {bid.category}</div>
                        <div>입찰 가격: {numberWithCommas(bid.price)}원</div>
                        <div>멘토: {bid.mentorName}</div>
                    </BidDetail>
                    <div>
                        {bid.status === '완료' ? (
                                <CompletedBid>결제가 완료된 건입니다.</CompletedBid>
                            ) : (
                                <>
                                    <BidButton onClick={() => handleAccepted(bid.bidIdx, bid.price, bid.title, bid.mentorName)}>결제하기</BidButton>
                                    <BidButton onClick={name ? () => openInquiryModalWithMentor(bid.mentorName) : null} disabled={!name}>문의하기</BidButton>
                                </>
                            )}
                    </div>
                </BidItem>
            )) : (
                <div>입찰 내역이 없습니다.</div>
            )}
        </MainContainer>
        <InquiryModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} name={name} mentorName={selectedMentorName}/>
    </>
    );
}

function InquiryModal({ isOpen, onClose, name, mentorName }) {
    
    const [inquiryContent, setInquiryContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const newMessage = {
            content: inquiryContent,
            sender: name, 
            timestamp: new Date().toISOString() 
        };

        try {
            const result = await createChatRoom(name, mentorName, newMessage);
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
                <ModalLabel>{mentorName} 멘토님에게</ModalLabel>
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

export default BidListForm;


