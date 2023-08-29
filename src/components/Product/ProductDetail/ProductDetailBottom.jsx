import styled from 'styled-components';
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

    .top {
        margin-top: 30px;
    }
    .content {
        line-height: 1.5;
    }
`
const Title = styled.h1`
    font-size: 25px;
    font-weight: bold;

    .restrict {
        font-size: 20px;
    }
`;
const Line = styled.div`
    height: 1px;
    background-color: #ededed;
`;
const MentorCareer = styled.div `
    margin-top: 10px;
    color: gray;
    font-size: 15px;
`;
const MentorName = styled.div `
    font-size: 18px;
`

export default function ProductDetailBottom({productDetailInfo}) {
    const { description, memberName, memberCareer } = productDetailInfo
    console.log(productDetailInfo);
    return (
        <ProductBottomsection>
            <BottomMenu>
                <div className="menu-mentor">멘토정보</div>
                <div className="menu-info">상세설명</div>
                <div className="menu-review">리뷰</div>
            </BottomMenu>
            <BottomContents>
                <ContentComponent className="top">
                    <Title>멘토정보</Title>
                    <MentorCareer>경력 {memberCareer}</MentorCareer>     
                    <MentorName>{memberName} 멘토님</MentorName>
                </ContentComponent>
                <Line />
                <ContentComponent>
                    <Title>서비스 상세설명</Title>
                    <div className="content">{description}</div>         
                </ContentComponent>
                <Line />
                <ContentComponent>
                    <Title className="restrict">취소 규정</Title>
                    <CancelInfo />
                </ContentComponent>
                <Line />                
            </BottomContents>
        </ProductBottomsection>
    );
}