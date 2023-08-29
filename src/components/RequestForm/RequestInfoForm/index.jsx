import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { postBid } from '../../../api/request/postBid';
import { ProductDetailContext } from '../../../hooks/productDetailContext';
import { LoginContext } from '../../../hooks/loginContext';
import { createChatRoom } from '../../../api/chat/createChatRoom';

const MainContainer = styled.div`
    border: 1px solid #E0E0E0;
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
    width: 650px;
    margin: auto;
    border-radius: 5px;
`;
const MainTitle = styled.div `
    font-size: 23px;
    margin-bottom: 10px;
    font-weight: 600;
    margin: 20px auto;
    width: 650px;
`
const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;
const Title = styled.div`
    font-size: 1.1rem;
    font-weight: 400;
`;
const Contents = styled.div`
    font-size: 1.1rem;
    font-weight: 300;
`;
const DetailedContents = styled.div`
    background-color: #F7F7F7;
    font-size: 1.1rem;
    font-weight: 300;
    margin: 20px 0;
    padding: 15px;
    border-radius: 4px;
    text-align: justify;
    line-height: 1.5;
`;

const InputBox = styled.input`
    width: 60%;
    padding: 10px;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    font-size: 1rem;
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

const RequestDetail = () => {
    const [showAlarm, setShowAlarm] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const requestInfo = location.state?.requestInfo;
    
    const category = requestInfo.category;
    const clientName = requestInfo.suggester;
    const requestTitle = requestInfo.title;
    const requestDetail = requestInfo.description;
    const requestPrice = requestInfo.price;

    const [isModalOpen, setModalOpen] = useState(false);
    const { productDetailInfo } = useContext(ProductDetailContext);
    const { productIdx, productName, address, description, price, image, likes, memberCareer } = productDetailInfo;
    const { loginForm } = useContext(LoginContext);
    const { name } = loginForm;

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    const [formData, setFormData] = useState({
    });


    const handleInputChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleBidClick = async () => {
        const suggestionIdx = requestInfo.suggestionIdx;

        try{
            const response = await postBid(formData.bidPrice, suggestionIdx);
            console.log(response)

            if (response.success){
                setShowAlarm(true); 
                setTimeout(() => {
                    setShowAlarm(false); 
                    navigate('/') 
                }, 2000); 
            }

        } catch (error){
            console.log("error : "+ error)
        }


    };

    return (
        <>
            <Alarm visible={showAlarm}>
                의뢰인에게 입찰가를 전달했습니다. 잠시만 기다려 주세요.
            </Alarm>
            <MainTitle>의뢰 정보</MainTitle>
            <MainContainer>
                <InfoContainer>
                    <Title>카테고리</Title>
                    <Contents>{category}</Contents>
                </InfoContainer>
                
                <InfoContainer>
                    <Title>의뢰자 성명</Title>
                    <Contents>{clientName}</Contents>
                </InfoContainer>

                <InfoContainer>
                    <Title>의뢰 타이틀</Title>
                    <Contents>{requestTitle}</Contents>
                </InfoContainer>

                <Title>의뢰 내용</Title>
                <DetailedContents>{requestDetail}</DetailedContents>

                <InfoContainer>
                    <Title>의뢰 가격</Title>
                    <Contents>{numberWithCommas(requestPrice)}원</Contents>
                </InfoContainer>

                <InfoContainer>
                    <Title>입찰 가격</Title>
                    <InputBox
                        id="bidPrice" 
                        type="text"
                        name="bidPrice" 
                        placeholder="입찰 가격을 입력하세요" 
                        onChange={handleInputChange}
                    />
                </InfoContainer>

                <ButtonContainer>
                    <Button onClick={handleBidClick}>입찰하기</Button>
                    <Button onClick={name ? () => setModalOpen(true) : null} disabled={!name}>채팅하기</Button>
                </ButtonContainer>
            </MainContainer>
            <InquiryModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} name={name} memteeName={clientName}/>
        </>
    );
}


function InquiryModal({ isOpen, onClose, name, memteeName }) {
    const { productDetailInfo } = useContext(ProductDetailContext);
    const { memberName } = productDetailInfo;
    
    const [inquiryContent, setInquiryContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const newMessage = {
            content: inquiryContent,
            sender: name, 
            timestamp: new Date().toISOString() 
        };

        try {
            const result = await createChatRoom(name, memteeName, newMessage);
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
                <ModalLabel>To {memteeName}</ModalLabel>
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


export default RequestDetail;