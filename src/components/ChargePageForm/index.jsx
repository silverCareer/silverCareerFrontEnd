import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { cashChargeApi } from '../../api/charge/cashCharge';
import { MypageContext } from './../../hooks/mypageContext';

const ChargeContainer = styled.div `
    margin: 10px 450px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`
const Title = styled.div `
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 5px;
`
const ChargeInfo = styled.div `
    display: flex;
    justify-content: space-between;


    div {
        width: 200px;
    }
    span {

    }
    input {
        width: 300px;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #a0a0a0;

        &::placeholder {
            color: #a0a0a0;
            align-items: center;
        }
    }
`
const Line = styled.div`
    height: 1px;
    width: 100%;
    background-color: #ccc; 
    margin: 10px 0; 
`
const Button = styled.div `
    margin-top: 10px;
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: stretch;

    border-radius: 5px;
    background: #84A080;
    color: white;

    cursor: pointer;
    &:hover {
        background: #6f8a6a;
    }
`
/* modal */
const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
`;
const ButtonList = styled.div `
    display: inline-flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    gap: 10px;
`

function ChargePageForm() {
    const { myPageForm, setMyPageForm } = useContext(MypageContext);
    const balance = myPageForm.balance;
    
    const navigate = useNavigate();
    const location = useLocation();
    const [ chargeAmount, setChargeAmount ] = useState('');
    const [ isModalOpen, setIsModalOpen ] = useState(false); // 모달의 열림/닫힘 상태

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleChargeAmountChange = (event) => {
        const value = event.target.value;
        setChargeAmount(value);
    };

    // 합산된 값을 계산
    const newCharge = parseInt(balance ?? 0) + parseInt(chargeAmount || 0);
    
    // 모달 열기
    const openModal = () => {
        setIsModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 충전 처리 함수
    const handleCharge = async () => {
        //cashChargeApi
        try {
            const response = await cashChargeApi(chargeAmount);
            alert("캐시 충전이 완료되었습니다!");

            setMyPageForm(prevMyPageForm => ({
                ...prevMyPageForm,
                balance: newCharge
            }));

            //if(response.success) {
                navigate(`/mypage`);        
            //}
        } catch (error) {            
            console.log('Error sending payment: ', error);
            if(error.response.status === 403 || error.response.status === 406) {
                alert("계좌 잔액이 부족합니다!");
            }
            else if(error.response.status === 404) {
                alert("계좌 정보가 존재하지 않습니다!");
            }
            closeModal();
        }
    };

    return (
        <>
            <ChargeContainer>
                <Title>충전하기</Title>
                <ChargeInfo>
                    <div>잔여금</div>
                    <span>{numberWithCommas(balance ?? 0)} 원</span>
                </ChargeInfo>
                <ChargeInfo>
                    <div>충전 할 금액</div>
                    <input
                        placeholder="천원 단위로 입력해주세요."
                        type="text"
                        id="chargeAmount"
                        value={chargeAmount}
                        onChange={handleChargeAmountChange}
                    />
                </ChargeInfo>
                <Line />
                <ChargeInfo>
                    <div>충전 후 금액</div>
                    <span>
                        {numberWithCommas(newCharge ?? 0)} 원
                    </span>
                </ChargeInfo>
                <Button onClick={openModal}>충전하기</Button>
            </ChargeContainer>

            {/* 모달 */}
            {isModalOpen && (
                <ModalBackground>
                    <ModalContainer>
                        <div>충전하시겠습니까?</div>
                        <ButtonList>
                            <Button onClick={handleCharge}>확인</Button>
                            <Button onClick={closeModal}>취소</Button>
                        </ButtonList>
                    </ModalContainer>
                </ModalBackground>
            )}
        </>
    );
}

export default ChargePageForm;