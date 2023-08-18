import { useContext, useState } from 'react';
import styled from 'styled-components';
import { ProductDetailContext } from '../../hooks/productDetailContext';

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
        font-size: 23px;
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
    background: #84A080;

    font-weight: 500;
    font-size: 18px;
    color: white;

    cursor: pointer;
    &:hover {
        color: white;
        background-color: #6f896d;
    }
`;

export default function PaymentTotal() {
    const { productDetailInfo } = useContext(ProductDetailContext);
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const price = numberWithCommas(productDetailInfo.price);
    const cash = numberWithCommas(100000);
    
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
                <span>{cash} 원</span>
            </PriceInfo>
            <Line />
            <PriceInfo>
                <div className="total">총 결제 금액</div>
                <span className="total">{cash} 원</span>
            </PriceInfo>
            <SubmitInfo>
                <span>위 내용을 확인하였습니다.</span>
                <SubmitButton>결제하기</SubmitButton>
            </SubmitInfo>
        </TotalContainer>
    );
}