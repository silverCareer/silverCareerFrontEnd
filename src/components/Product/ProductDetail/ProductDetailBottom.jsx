import { useContext } from 'react';
import styled from 'styled-components';
import { ProductContext } from '../../../hooks/productContext';

const ProductBottomsection = styled.div `
    display: flex;
    padding: 10px 20px;
    gap: 20px;
    flex-direction: column;
    align-items: flex-start;
`
const BottomMenu = styled.div `
    display: flex;
    width: 1000px;
    padding: 10px 0;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;

    font-weight: 700;
    font-size: 20px;
    border-bottom: 1px solid #CDCDCD;
    background: #FFF;
`
const BottomContents = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
`

export default function ProductDetailBottom() {

    const { productDetail } = useContext(ProductContext)

    return (
        <ProductBottomsection>
            <BottomMenu>
                <div className="menu-item">멘토정보</div>
                <div className="menu-item">사진</div>
                <div className="menu-item">리뷰</div>
                <div className="menu-item">질문답변</div>
            </BottomMenu>
            
            <BottomContents>
                <div className="mentorInfo">멘토정보</div>
                <div className="content">내용</div>         
            
                <div className="serviceDetail">서비스 상세설명</div>
                <div className="content">내용</div>         
            </BottomContents>
        </ProductBottomsection>
    );
}