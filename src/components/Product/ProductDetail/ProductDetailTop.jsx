import { useContext, useState  } from 'react';
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
    color: black;
    background-image: url(${likeIconImage});
    background-repeat: no-repeat;
    margin-right: 5px;
    cursor: pointer;
`
const LikeOnIcon = styled.div `
    width: 22px;
    height: 22px;
    color: black;
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

function InquiryModal({ isOpen, onClose, name }) {
    const { productDetailInfo } = useContext(ProductDetailContext);
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


export default function ProductDetailTop({avgRating}) {
    const { loginForm } = useContext(LoginContext);
    const { name } = loginForm;

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const { productDetailInfo, setProductDetailInfo } = useContext(ProductDetailContext);
    const { liked, productIdx, productName, address, description, price, image, likes, memberCareer } = productDetailInfo;

    const [ islike, setIsLike ] = useState(liked);

    console.log(liked, islike, "ㅁㅇㄻㅇㄻㅇㅁㅇㄻㅇㄻㄴㅇㄹㄻㅇ");

    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const handlePaymentClick = () => {
        navigate(`/product/${productIdx}/payment`);
    };

    const toggleLikeOn = async () => {
        try {
            const response = await productLikeOn(productIdx);

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

        }
    }

    return (
        <>
        <ProductTopSection>
            <TopLeft>
                <TopIcon>
                    {liked ? (
                        <LikeOnIcon onClick={toggleLikeOff} />
                    ) : (
                        <LikeIcon onClick={toggleLikeOn} />
                    )}
                    <span>{likes}</span>
                </TopIcon>
                <Title>{productName}</Title>
                <Location>
                    <LocationIcon />
                    <span>{address}</span>
                </Location>
                <div className="description">
                    {description}
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
                    {/* <Button onClick={name ? handlePaymentClick : null} disabled={!name}>결제하기</Button>
                    <Button onClick={name ? () => setModalOpen(true) : null} disabled={!name}>문의하기</Button> */}
                    <Button onClick={name && productDetailInfo.status === 3 ? handlePaymentClick : null} 
                            disabled={!name || productDetailInfo.status !== 3}>결제하기</Button>
                    <Button onClick={name && productDetailInfo.status === 3 ? () => setModalOpen(true) : null} 
                            disabled={!name || productDetailInfo.status !== 3}>문의하기</Button>
                </ButtonList>
            </TopLeft>
            <TopRightImage>
                <img src={image} alt="Product" />
            </TopRightImage>
        </ProductTopSection>
        <InquiryModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} name={name} />
        </>
    );
}