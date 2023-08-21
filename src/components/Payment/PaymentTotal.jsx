import React, { useState } from 'react';
import styled from 'styled-components';
import { paymentApi } from './../../api/pay/payment';

const TotalContainer = styled.div `
    display: flex;
    padding: 20px;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    border-radius: 10px;
    border: 1px solid #84A080;
`
const PriceInfo = styled.div `
    display: flex;
    width: 100%;
    font-size: 20px;
    color: gray;

    div {
        width: 300px;
    }    
    span {
        width: 200px;
        text-align: right;
        padding-right: 5px;
    }
    .title {
        font-weight: bold;
    }
    .total {
        font-size: 21px;
        font-weight: 600;
        color: black;
    }    
`
const Line = styled.div `
    height: 2px;
    width: 100%;
    background-color: black; 
    margin: 10px 0; 
`;
const SubmitInfo = styled.div `
    display: flex;
    height: 150px;
    padding: 0px 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    align-self: stretch;
    border-radius: 10px;
    background: #FDF8F8;

    span {
        color: #818080;
    }
`;
const SubmitButton = styled.div `
    display: flex;
    width: 100%;
    height: 50px;
    padding: 3px 10px;
    justify-content: center;
    align-items: center;

    flex-shrink: 0;
    border-radius: 10px;
    background: ${props => props.disabled ? 'gray' : '#84A080'};

    font-weight: 500;
    font-size: 18px;
    color: white;
    
    
    cursor: ${props => props.disabled ? '' : 'pointer'};
    ${props => !props.disabled && `
        &:hover {
            color: white;
            background-color: #6f896d;
        }
    `}
`;

export default function PaymentTotal({myPageForm, productDetailInfo}) {
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const price = numberWithCommas(productDetailInfo.price);
    
    const availableCash = parseInt(myPageForm.balance ?? 0); // 사용 가능한 캐시
    const usedCash = parseInt(productDetailInfo.price); // 사용 할 캐시

    const remainingCash = availableCash - usedCash;
    const isCashInsufficient = remainingCash < 0;
    
    const [showWarning, setShowWarning] = useState(isCashInsufficient);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false); // State for payment success

    const handlePaymentSubmit = async () => {
        try {
            console.log(productDetailInfo.productName, "ㅋㅋ");
            const response = await paymentApi(productDetailInfo.productIdx);
            
            if(response.success) {
                setIsPaymentSuccess(true); 
            }
        } catch (error) {
            console.log('Error sending payment: ', error);
        }
    };

    return (
        <TotalContainer>
            <PriceInfo>
                <div className="title">주문 금액</div>
                <span>{price} 원</span>
            </PriceInfo>
            <PriceInfo>
                <div className="title">수수료</div>
                <span>0 원</span>
            </PriceInfo>
            <PriceInfo>
                <div className="title">캐시</div>
                <span>{price} 원</span>
            </PriceInfo>
            <Line />
            <PriceInfo>
                <div className="total">총 결제 금액</div>
                <span className="total">{price} 원</span>
            </PriceInfo>
            <SubmitInfo>
                <span>위 내용을 확인하였습니다.</span>
                <SubmitButton disabled={showWarning} onClick={handlePaymentSubmit}>결제하기</SubmitButton>
            </SubmitInfo>

            {isPaymentSuccess && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>결제가 완료되었습니다!</h2>
                        <button onClick={() => setIsPaymentSuccess(false)}>닫기</button>
                    </div>
                </div>
            )}
        </TotalContainer>
    );
}