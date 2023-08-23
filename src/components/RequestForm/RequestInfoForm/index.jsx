import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { postBid } from '../../../api/request/postBid';

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

const DetailedContents = styled.div`
    background-color: #F7F7F7;
    font-size: 1.2rem;
    font-weight: 300;
    color: #808080;
    margin: 20px 0;
    padding: 15px;
    border-radius: 4px;
    text-align: justify;
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
                    <Contents>{requestPrice}원</Contents>
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
                    <Button>채팅하기</Button>
                </ButtonContainer>
            </MainContainer>
        </>
    );
}

export default RequestDetail;