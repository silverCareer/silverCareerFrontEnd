// import React, { useState  } from 'react';
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { postMyInfo } from '../../../api/mypage/postMyInfo';
import { MypageContext } from '../../../hooks/mypageContext';
import { useNavigate } from 'react-router-dom';

const MainContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 100px;
`;

const PayInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;


const Title = styled.div`
    font-size: 1.2rem;
`;

const Contents = styled.div`
    font-size: 1.2rem;
    font-weight: 300;
    color: #808080;
`

const Label = styled.label`
    font-size: 1.2rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.5em;
    margin-bottom: 0.5em;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
`;

const Button = styled.button`
    width: 10%;
    padding: 10px;
    
    border-radius: 5px;
    border: 1px solid #84A080;
    color: white;
    background-color: #84A080;
    cursor: pointer;
    &:hover {
        background-color: #6f8a6a;
    }
    margin: auto;
`;

const Alarm = styled.div`
    background: #84A080;
    color: white;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    z-index: 1000;
    display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const ModalCloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
`;

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: ${({ visible }) => (visible ? 'block' : 'none')};
    border: 2px solid #84A080;
`;

const StyledModalCloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    margin-top: 50px; 
    background: none;
    border: 1px solid #84A080;
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 0.9rem;
    cursor: pointer;
    color: #84A080;
    transition: background-color 0.3s;
    
    &:hover {
        background-color: #84A080;
        color: white;
    }
`;

const ErrorMessage = styled.p`
    color: #84A080;
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 20px;  
`;

function UserInfoEditor() {
    const navigate = useNavigate();
    const { myPageForm, setMyPageForm } = useContext(MypageContext);
    const { phoneNumber, authority, name, email } = myPageForm;
    const [showAlarm, setShowAlarm] = useState(false);
    const [formData, setFormData] = useState({
    });

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");


    const handleInputChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await postMyInfo(formData.password, formData.phoneNum);
            console.log("Success!", response.success);
            console.log(formData.password)

            if (response.success){
                setMyPageForm({
                    ...myPageForm,
                    phoneNumber : formData.phoneNum,
                    password: formData.password,
                });

                setShowAlarm(true);
                setTimeout(() => {
                    setShowAlarm(false); 
                    navigate('/') 
                }, 2000); 
    
            } 


        } catch (error) {
            console.error("An error occurred:", error);
            
            const errorCode = error?.response?.data?.error?.code;
        
            if (errorCode === "AUTH_003") {
                setModalMessage("같은 비밀번호입니다.");
            } else if (errorCode === "AUTH_004") {
                setModalMessage("같은 전화번호입니다.");  // 추가된 부분
            } else if (errorCode === "AUTH_005") {
                setModalMessage("잘못된 비밀번호 형식입니다.(알파벳,숫자,특수문자 조합 8~20자 사이)");
            } else {
                setModalMessage("알 수 없는 오류 발생");
            }
            setModalOpen(true);
        }
    };


    return (
        <>
            <Alarm visible={showAlarm}>
            회원정보가 수정되었습니다.
            </Alarm>
            <MainContainer>
                <PayInfo>
                    <InfoContainer>
                        <Title>가입정보</Title>
                        <Contents>{authority}</Contents>
                    </InfoContainer>
                    <InfoContainer>
                        <Title>이메일</Title>
                        <Contents>{email}</Contents>
                    </InfoContainer>
                    <InfoContainer>
                        <Title>닉네임</Title>
                        <Contents>{name}</Contents>
                    </InfoContainer>
                    <InfoContainer>
                        <Label htmlFor="phoneNum">휴대폰</Label>
                            <div>
                                <Input id="phoneNum" type="text" name="phoneNum" onChange={handleInputChange} placeholder={phoneNumber} />
                            </div>
                    </InfoContainer>
                    <InfoContainer>
                        <Label htmlFor="password">비밀번호</Label>
                            <div>
                                <Input id="password" type="password" name="password" onChange={handleInputChange} placeholder="변경할 비밀번호 입력" />
                            </div>
                    </InfoContainer>
                    <Button onClick={handleSubmit}>수정 하기</Button>
                </PayInfo>

                
            </MainContainer>
            <ErrorModal visible={isModalOpen} onClose={() => setModalOpen(false)} errorMessage={modalMessage} /> 
        </>
    );
}

function ErrorModal({ visible, onClose, errorMessage }) {
    return (
        <StyledModal visible={visible}>
            <StyledModalCloseButton onClick={onClose}>닫기</StyledModalCloseButton>
            <ErrorMessage>{errorMessage}</ErrorMessage>
        </StyledModal>
    );
}

export default UserInfoEditor;