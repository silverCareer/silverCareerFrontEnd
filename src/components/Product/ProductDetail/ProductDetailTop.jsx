import { useContext, useState  } from 'react';
import styled from 'styled-components';
import shareIconImage from '../../../assets/svg/icon-share.svg'
import likeIconImage from '../../../assets/svg/icon-heart.svg'
import locationIconImage from '../../../assets/svg/icon-location.svg'
import { ProductDetailContext } from '../../../hooks/productDetailContext';
import { MypageContext } from '../../../hooks/mypageContext';
import { createChatRoom } from '../../../api/chat/createChatRoom';


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
    color: black;
    background-image: url(${likeIconImage});
    background-repeat: no-repeat;

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

    border-radius: 15px;
    border: 1px solid #84A080;
    cursor: pointer;
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
`;

const ModalContent = styled.div`
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ModalLabel = styled.label`
    display: block;
    margin-bottom: 10px;
    font-size: 20px;
`;

const ModalInput = styled.textarea`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const ModalButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

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

function InquiryModal({ isOpen, onClose }) {

    const { productDetailInfo } = useContext(ProductDetailContext);
    const { memberName } = productDetailInfo;
    const { myPageForm } = useContext(MypageContext);
    const { name } = myPageForm;

    const [inquiryContent, setInquiryContent] = useState('');

    const handleSubmit = async () => {

        const newMessage = {
            content: inquiryContent,
            sender: name, // sender name
            timestamp: new Date().toISOString() // 현재 시간을 ISO 문자열로 전환
        };

        try {
            const result = await createChatRoom(name, memberName, newMessage);
            console.log("Chat room created:", result);
            onClose(); // 모달 닫기
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


export default function ProductDetailTop() {
    const { productDetailInfo } = useContext(ProductDetailContext);
    const { productName, address, description, price, likes, memberCareer } = productDetailInfo;
    const [isModalOpen, setModalOpen] = useState(false);
    
    return (
        <>
        <ProductTopSection>
            <TopLeft>
                <TopIcon>
                    <ShareIcon />
                    <LikeIcon /><span>{likes}</span>
                </TopIcon>
                <Title>{productName}</Title>
                <Location>
                    <LocationIcon />
                    <span>{address}</span>
                </Location>
                <div className="description">
                    {description}
                    <br />
                    20년간의 노하우를 알려드리겠습니다. (멘토 한마디 느낌)
                </div>
                <Price>
                    {price} 원
                </Price>

                <ClassInfo>
                    <div>리뷰 ⭐5.0</div>
                    <div>총 경력 <strong>{memberCareer}</strong></div>
                </ClassInfo>

                <ButtonList>
                    <Button>결제하기</Button>
                    <Button onClick={() => setModalOpen(true)}>문의하기</Button>
                </ButtonList>
            </TopLeft>
            <TopRightImage>
                <img src="" alt="Product" />
            </TopRightImage>
        </ProductTopSection>
        <InquiryModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
}