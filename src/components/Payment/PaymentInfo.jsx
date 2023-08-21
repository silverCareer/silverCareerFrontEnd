import React, { useState } from 'react';
import styled from 'styled-components';

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
        width: 400px;
    }    
    span,
    .normal {
        width: 150px;
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

export default function PaymentInfo({myPageForm, productDetailInfo}) {
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    //numberWithCommas
    const price = numberWithCommas(productDetailInfo.price);
    const cash = numberWithCommas(myPageForm.balance ?? 0);
    
    const availableCash = parseInt(myPageForm.balance ?? 0); // 사용 가능한 캐시
    const usedCash = parseInt(productDetailInfo.price); // 사용 할 캐시

    const remainingCash = availableCash - usedCash;
    const isCashInsufficient = remainingCash < 0;
    
    const [showWarning, setShowWarning] = useState(isCashInsufficient);

    return (
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
    );
}