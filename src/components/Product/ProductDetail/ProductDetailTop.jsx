import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import likeIconImage from '../../../assets/svg/icon-heart.svg'
import likeOnIconImage from '../../../assets/svg/icon-heart-on.svg'
import locationIconImage from '../../../assets/svg/icon-location.svg'
import { ProductDetailContext } from '../../../hooks/productDetailContext';
import { createChatRoom } from '../../../api/chat/createChatRoom';
import { useNavigate } from "react-router-dom";
import { LoginContext } from '../../../hooks/loginContext';
import { productLikeOn } from '../../../api/like/productLikeOn';
import { getProductDetail } from '../../../api/product/productDetail';
import { productLikeOff } from '../../../api/like/productLikeOff';

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
`;
const LikeIcon = styled.div `
    width: 22px;
    height: 22px;
    background-image: url(${likeIconImage});
    background-repeat: no-repeat;
    margin-right: 5px;
    ${({ isMentor }) => isMentor && 'cursor: '}
`
const LikeOnIcon = styled.div `
    width: 22px;
    height: 22px;
    background-image: url(${likeOnIconImage});
    background-repeat: no-repeat;
    margin-right: 5px;
    cursor: pointer;
    
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
    overflow: hidden;

    /* display: flex;
    justify-content: center;
    align-items: center; */

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

    background-color: ${props => props.disabled ? '#a9a9a9' : ''};
    color: ${props => props.disabled ? 'white' : '#84A080'};
    border-radius: 15px;
    border: 1px solid ${props => props.disabled ? '#a9a9a9' : '#84A080'};
    font-weight: 600;
    cursor: ${props => props.disabled ? '' : 'pointer'};

    &:hover {
        background-color: ${props => props.disabled ? '' : '#84A080'};
        color: ${props => props.disabled ? '' : 'white'};
    }
`
const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`
const ModalContent = styled.div`
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`
const ModalLabel = styled.label`
    display: block;
    margin-bottom: 10px;
    font-size: 20px;
`
const ModalInput = styled.textarea`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
`
const ModalButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`
const ModalButton = styled.button`
    padding: 10px 20px;
    background-color: #84A080;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #6f896d;
    }
`;

function InquiryModal({ productDetailInfo, isOpen, onClose, name }) {
    const { memberName } = productDetailInfo;
    
    const [inquiryContent, setInquiryContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const newMessage = {
            content: inquiryContent,
            sender: name, 
            timestamp: new Date().toISOString() 
        };

        try {
            const result = await createChatRoom(name, memberName, newMessage);
            console.log("Chat room created:", result);
            onClose();
            navigate("/chatroom");

        } catch (error) {
            console.error("Error creating chat room:", error);
        }

    };

    return (
        isOpen && (
            <ModalWrapper onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalLabel>멘토에게 문의할 내용</ModalLabel>
                <ModalInput 
                    placeholder="첫 채팅할 내용을 적어주세요." 
                    rows="5"
                    value={inquiryContent}
                    onChange={(e) => setInquiryContent(e.target.value)}
                />

                <ModalButtonWrapper>
                <ModalButton onClick={handleSubmit}>보내기</ModalButton>
                <ModalButton onClick={onClose}>닫기</ModalButton>
                </ModalButtonWrapper>
            </ModalContent>
            </ModalWrapper>
        )
    );
}

export default function ProductDetailTop({productDetailInfo, avgRating}) {
    const { isLoggedIn, loginForm } = useContext(LoginContext);
    const { name } = loginForm;
    console.log(loginForm, " afadfadfadfadsf");
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    const { setProductDetailInfo } = useContext(ProductDetailContext);
    const { liked, productIdx, productName, address, description, price, image, likes, memberCareer } = productDetailInfo;
    const [ islike, setIsLike ] = useState(liked);
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const handlePaymentClick = () => {
        navigate(`/product/${productIdx}/payment`);
    };

    const toggleLikeOn = async () => {
        if(loginForm.authority === '멘토') return;
        
        try {
            const response = await productLikeOn(productIdx);
            console.log(response);
            if(response.success) {
                setIsLike((prevIsLiked) => !prevIsLiked);
                
                const productDetailResponse = await getProductDetail(productIdx, isLoggedIn);
                const newLikes = productDetailResponse.response.likes;

                setProductDetailInfo((prevProductDetailInfo => ({
                    ...prevProductDetailInfo,
                    likes: newLikes,
                    liked: productDetailResponse.response.liked
                })));
            }

        } catch (error) {
            console.log(error);
        }
    }

    const toggleLikeOff = async () => {
        try {
            const response = await productLikeOff(productIdx);
            
            if(response.success) {
                setIsLike((prevIsLiked) => !prevIsLiked);
                
                const productDetailResponse = await getProductDetail(productIdx);
                const newLikes = productDetailResponse.response.likes;

                setProductDetailInfo((prevProductDetailInfo => ({
                    ...prevProductDetailInfo,
                    likes: newLikes,
                    liked: productDetailResponse.response.liked
                })));
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <ProductTopSection>
            <TopLeft>
                <TopIcon>
                    {console.log(liked)}
                    {liked ? (
                        <LikeOnIcon onClick={toggleLikeOff} />
                    ) : (
                        <LikeIcon isMentor={loginForm.authority === '멘토'} onClick={toggleLikeOn} />
                    )}
                    <span>{likes}</span>
                </TopIcon>
                <Title>{productName}</Title>
                <Location>
                    <LocationIcon />
                    <span>{address}</span>
                </Location>
                <div className="description">
                    {description.length > 20 ? `${description.slice(0, 20)}...` : description}
                </div>
                <Price>
                    {numberWithCommas(price)} 원
                </Price>

                <ClassInfo>
                    {isNaN(avgRating) ? (
                        <div>⭐평가 없음</div>
                    ) : (
                        <div>리뷰 ⭐ {avgRating.toFixed(1)}</div>
                    )}
                    <div>
                        경력 <strong>{memberCareer === null || memberCareer === '' ? '5년 미만' : memberCareer}</strong>
                    </div>
                </ClassInfo>

                <ButtonList>
                    <Button onClick={productDetailInfo.status === 3 ? handlePaymentClick : null} 
                            disabled={productDetailInfo.status !== 3}>결제하기</Button>
                    <Button onClick={productDetailInfo.status === 3 ? () => setModalOpen(true) : null} 
                            disabled={productDetailInfo.status !== 3}>문의하기</Button>
                </ButtonList>
            </TopLeft>
            <TopRightImage>
                <img src={image} alt="Product" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                {/* <img src={image} alt="Product" style={{ maxWidth: '100%', maxHeight: '100%' }} /> */}
            </TopRightImage>
        </ProductTopSection>
        <InquiryModal productDetailInfo={productDetailInfo} isOpen={isModalOpen} onClose={() => setModalOpen(false)} name={name} />
        </>
    );
}