import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { paymentApi } from './../../api/pay/payment';
import { LoginContext } from '../../hooks/loginContext';
import { useNavigate } from 'react-router-dom';
import { ProductDetailContext } from '../../hooks/productDetailContext';
import { getProductDetail } from '../../api/product/productDetail';

const InfoContainer = styled.div `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px 50px;
    gap: 30px;

    border-radius: 10px;
    border: 1px solid #84A080;
`
const ProductInfo = styled.div `
    display: flex;
    flex-direction: column;
    gap: 10px;
    .mentorName,
    .ownCash {
        font-size: 12px;
        color: #b6b6b6;
        
        span {
            padding-left: 20px;
        }
    }
    .price span {
        width: 500px;
        padding-left: 20px;
    }
`
const Title = styled.div `
    font-size: 19px;
    font-weight: bold;
`
const PayInfo = styled.div `
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 18px;

    div {
        width: 400px;

        span {
            width: 200px;
        }
    } 
`
const PriceInfo = styled.div `
    display: flex;
    width: 100%;

    .title {
        width: 80px;
    }
    div {
        width: 300px;
    }    
    
    span {
        width: 200px;
        text-align: right;
        padding-right: 5px;
    }
    
    #subTitle {
        font-size: 12px;
        color: #b6b6b6;
    }
    
    .warning {
        font-size: 12px;
        color: red;
        display: flex;
        flex-direction: column;
    }
`
const TotalContainer = styled.div `
    display: flex;
    padding: 20px;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    border-radius: 10px;
    border: 1px solid #84A080;
`
const PriceInfoSub = styled.div `
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
const ButtonList = styled.div `
    display: inline-flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    gap: 10px;
`

export default function PaymentInfo({ productDetailInfo }) {
    const navigate = useNavigate();
    const { loginForm, setLoginForm } = useContext(LoginContext);
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    //numberWithCommas
    const price = numberWithCommas(productDetailInfo.price);
    const cash = numberWithCommas(loginForm.balance ?? 0);
    
    const availableCash = parseInt(loginForm.balance ?? 0); // 사용 가능한 캐시
    const usedCash = parseInt(productDetailInfo.price); // 사용 할 캐시

    const remainingCash = availableCash - usedCash;
    const isCashInsufficient = remainingCash < 0;
    
    const [showWarning, setShowWarning] = useState(isCashInsufficient);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false); // State for payment success
    const [confirmPayment, setConfirmPayment] = useState(false);

    const { setProductDetailInfo } = useContext(ProductDetailContext);

    const openModal = () => {
        setConfirmPayment(true);
    }

    const closeModal = () => {
        setConfirmPayment(false);
    };

    const handlePaymentSubmit = async () => {
        try {
            const response = await paymentApi(productDetailInfo.productIdx);
            
            if(response.productIdx === productDetailInfo.productIdx) {
                setIsPaymentSuccess(true); 
                setLoginForm(prevLoginForm => ({
                    ...prevLoginForm,
                    balance: remainingCash
                }));
            }

            const productDetailResponse = await getProductDetail(productDetailInfo.productIdx);
            console.log('Product Detail:', productDetailResponse);
            if (productDetailResponse.success) {
                //setProductTitle(product);
                setProductDetailInfo(productDetailResponse.response);

                navigate(`/product/${productDetailInfo.productIdx}`);
            }
        } catch (error) {
            console.log('Error sending payment: ', error);
        }
    };

    return (
        <>
        <InfoContainer>
            <ProductInfo>
                <Title>주문 내역</Title>
                <div className="productName">{productDetailInfo.productName}</div>
                <div className="mentorName">{productDetailInfo.memberName}</div>
                <PriceInfo>
                    <div className="title">가격</div>
                    <span>{price}</span>원
                </PriceInfo>
            </ProductInfo>
            <ProductInfo>
                <Title>캐시</Title>
                <PriceInfo>
                    <div className="title">캐시 사용</div>
                    <span>{price}</span>원
                </PriceInfo>
                <PriceInfo id="subTitle">
                    <div className="title">보유 캐시</div>
                    <span>{cash}</span>원
                </PriceInfo>
            </ProductInfo>
            <ProductInfo>
                <PayInfo>
                    <PriceInfo>
                        <div>사용 가능한 캐시 </div>
                        <span>{cash} 원</span>
                    </PriceInfo>
                    <PriceInfo>
                        <div>사용 할 캐시 </div>
                        <span>{price} 원</span>
                    </PriceInfo>
                    <PriceInfo className={showWarning ? 'warning' : 'normal'}>
                        <div>사용 후 캐시 </div>
                        {!showWarning && <span className="normal">{numberWithCommas(Math.abs(remainingCash))} 원</span>}
                        {showWarning && <span className="warning">금액이 부족합니다!</span>}
                    </PriceInfo>
                </PayInfo>
            </ProductInfo>
        </InfoContainer>
        <TotalContainer>
            <PriceInfoSub>
                <div className="title">주문 금액</div>
                <span>{price} 원</span>
            </PriceInfoSub>
            <PriceInfoSub>
                <div className="title">수수료</div>
                <span>0 원</span>
            </PriceInfoSub>
            <PriceInfoSub>
                <div className="title">캐시</div>
                <span>{price} 원</span>
            </PriceInfoSub>
            <Line />
            <PriceInfoSub>
                <div className="total">총 결제 금액</div>
                <span className="total">{price} 원</span>
            </PriceInfoSub>
            <SubmitInfo>
                <span>위 내용을 확인하였습니다.</span>
                <SubmitButton disabled={showWarning} onClick={openModal}>결제하기</SubmitButton>
            </SubmitInfo>

            {confirmPayment && (
                <ModalBackground>
                    <ModalContainer>
                        <div>결제 하시겠습니까?</div>
                        <ButtonList>
                            <Button onClick={handlePaymentSubmit}>확인</Button>
                            <Button onClick={closeModal}>취소</Button>
                        </ButtonList>                       
                    </ModalContainer>
                </ModalBackground>
            )}
            </TotalContainer>
        </> 
    );
}