import React, { useContext } from 'react';
import styled from 'styled-components';
import PaymentInfo from './PaymentInfo';
import PaymentTotal from './PaymentTotal';
import { ProductDetailContext } from '../../hooks/productDetailContext';
import { MypageContext } from '../../hooks/mypageContext';

const PaymentContainer = styled.div `
    display: flex;
    padding: 10px 250px;
    height: 600px;
    gap: 20px;
    flex-direction: column;
    align-items: center;
`
const PaymentSubContainer = styled.div `
    display: grid;
    grid-template-columns: 60% 40%;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 20px;    
`
const Title = styled.div `
    display: flex;
    align-items: center;
    gap: 10px;
    align-self: stretch;

    font-size: 25px;
    font-weight: bold;
`

function Payment() {
    const { myPageForm } = useContext(MypageContext);
    const { productDetailInfo } = useContext(ProductDetailContext);
    
    return (
        <PaymentContainer>
            <Title>결제하기</Title>
            <PaymentSubContainer>
                <PaymentInfo myPageForm={myPageForm} productDetailInfo={productDetailInfo} />
                <PaymentTotal myPageForm={myPageForm} productDetailInfo={productDetailInfo} />
            </PaymentSubContainer>
        </PaymentContainer>    
    );
}

export default Payment;