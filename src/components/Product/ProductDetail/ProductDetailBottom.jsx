import { useContext } from 'react';
import styled from 'styled-components';
import { ProductDetailContext } from './../../../hooks/productDetailContext';
import CancelInfo from './PageComponent/CancelInfo';

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
    gap: 50px;
    align-self: stretch;
`
const ContentComponent = styled.div `
    width: 800px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const Title = styled.h1`
    font-size: 25px;
    font-weight: bold;
`;
const Line = styled.div`
    height: 1px;
    background-color: #ededed;
`;

export default function ProductDetailBottom() {
    const { productDetailInfo } = useContext(ProductDetailContext);
    const { description, memberName } = productDetailInfo
    
    return (
        <ProductBottomsection>
            <BottomMenu>
                <div className="menu-item">멘토정보</div>
                <div className="menu-item">사진</div>
                <div className="menu-item">리뷰</div>
                <div className="menu-item">질문답변</div>
            </BottomMenu>
            <BottomContents>
                <ContentComponent style={{'margin-top':'30px'}}>
                    <Title>멘토정보</Title>
                    <div className="content">{memberName}</div>      
                </ContentComponent>
                <Line />
                <ContentComponent>
                    <Title>서비스 상세설명</Title>
                    <div className="content">{description}</div>         
                </ContentComponent>
                <Line />
                <ContentComponent>
                    <Title style={{ 'font-size':'23px'}}>취소 규정</Title>
                    <CancelInfo />
                </ContentComponent>
                <Line />                
            </BottomContents>
        </ProductBottomsection>
    );
}