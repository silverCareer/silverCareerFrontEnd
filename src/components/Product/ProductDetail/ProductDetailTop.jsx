import { useContext } from 'react';
import styled from 'styled-components';
import { ProductContext } from '../../../hooks/productContext';
import shareIconImage from '../../../assets/svg/icon-share.svg'
import likeIconImage from '../../../assets/svg/icon-heart-on.svg'
import locationIconImage from '../../../assets/svg/icon-location.svg'

const ProductTopSection = styled.div `
    display: flex;
    height: 500px;
    align-self: stretch;
    justify-content: space-evenly;
`;

const TopLeft = styled.div `
    display: flex;
    width : 550px;
    flex-direction: column;
    gap: 20px;
    font-size: 20px;
`;

const TopIcon = styled.div `
    display: flex;
    height: 30px;
    align-items: center;
    justify-content: space-between;
`;

const ShareIcon = styled.div `
    width: 500px;
    height: 22px;
    background-image: url(${shareIconImage});
    background-repeat: no-repeat;
`

const LikeIcon = styled.div `
    width: 22px;
    height: 22px;
    background-image: url(${likeIconImage});
    background-repeat: no-repeat;
`
const LocationIcon = styled.div `
    width: 18px;
    height: 18px;
    background-image: url(${locationIconImage});
    background-repeat: no-repeat;
`
const Location = styled.div `
    display: flex;
    padding-bottom: 0px;
    align-items: center;

    font-weight: 500;
    font-size: 25px;
`
const TopRightImage = styled.div `
    width: 442px;
    height: 442px;
    border-radius: 10px;
    border: 1px solid #000;
`
const Title = styled.div `
    font-weight: 600;
    font-size: 40px;
`
const Price = styled.div `
    font-weight: 500;
    font-size: 25px;
`
const ClassInfo = styled.div `
    display: flex;
    height: 84px;
    padding: 30px 100px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    align-self: stretch;
    border-radius: 15px;
    background: #FDF8F8;
`
const ButtonList = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`
const Button = styled.div`
    display: flex;
    padding: 29px 38px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;

    border-radius: 15px;
    border: 1px solid #84A080;
    cursor: pointer;
`


export default function ProductDetailTop() {
    const { productDetail } = useContext(ProductContext)
    
    return (
        <ProductTopSection>
            <TopLeft>
                <TopIcon>
                    <ShareIcon />
                    <LikeIcon /><span>{productDetail.productLikes}</span>
                </TopIcon>
                <Title>{productDetail.productName}</Title>
                <Location>
                    <LocationIcon />
                    <span>서울시 성수동</span>
                </Location>
                <div className="description">{productDetail.productDescription}
                <br />
                20년간의 노하우를 알려드리겠습니다. (멘토 한마디 느낌)
                </div>
                <Price>
                    {productDetail.productPrice} 원
                </Price>

                <ClassInfo>
                    <div>리뷰 ⭐5.0</div>
                    <div>총 경력 <strong>20년</strong></div>
                </ClassInfo>

                <ButtonList>
                    <Button>결제하기</Button>
                    <Button>문의하기</Button>
                </ButtonList>
            </TopLeft>
            <TopRightImage>
                <img src={productDetail.productImage} alt="Product" />
            </TopRightImage>
        </ProductTopSection>
    );
}