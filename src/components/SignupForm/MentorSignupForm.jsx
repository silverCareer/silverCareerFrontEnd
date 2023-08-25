import React, { useState, useContext  } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SignupContext } from '../../hooks/signupContext';
import { signup } from '../../api/signup/signup';

const Container = styled.div`
    margin-top: 20px;
`;
const FormContainer = styled.div`
    margin: auto;
    width: 50%;
`;
const StyledForm = styled.form`
    border: 1px solid #84a0808e;
    border-radius: 5px;
    padding: 2em;
`;
const Title = styled.h1`
    font-size: 25px;
    font-weight: bolder;
    margin-bottom: 1em;
    margin-left: 2px;
`;
const SubTitle = styled.div `
    font-size: 16px;
    margin-bottom: 10px;
`;
const FormGroup = styled.div`
    margin-bottom: 1em;
`;
const Label = styled.label`
    display: block;
    margin-bottom: 0.5em;
    font-size: 0.9em;
`;
const UserType = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 10px;
`;
const Option = styled.div`
    transition: background-color 0.3s ease; 
    border-radius: 5px;
    margin-top: 1px;
    padding: 5px;
    cursor: pointer;
    &:hover {
        background-color: #84A080;
        color: white;
    }
    ${({ selected }) =>
        selected &&
        `
        background-color: #84A080;
        color: white;
        padding: 5px;
    `}
`;
const Button = styled.button`
    display: block;
    width: 15%;
    padding: 5px;
    margin: 0 auto; 
    text-decoration: none;
    text-align: center;
    border-radius: 5px;
    border: none;
    color: white;
    background-color: #84A080;
    font-size: 1.2em;
    
    cursor: pointer;
`;
const Select = styled.select`
    width: 30%;
    padding: 0.5em;
    margin-bottom: 0.5em;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
`;
const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ModalContent = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    border: 2px solid #84A080; // 경계선 색상 추가
`;
const ModalButton = styled.button`
    background-color: #84A080; // 버튼 배경 색상
    color: white; // 텍스트 색상
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    margin-top: 10px;
`;

function MentorSignupForm() {

    const { signupData, updateSignupData } = useContext(SignupContext);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    
    const [formData, setFormData] = useState({
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        const finalData = { ...signupData, ...formData };
        updateSignupData(finalData);
        signup(finalData) 
        .then(response => {
            if (response.data.success) {
                setShowModal(true);
            }
        })
        .catch(error => {
            console.error(error);
        });
    };

    const handleInputChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const closeModal = () => {
        setShowModal(false);
        navigate('/login'); 
    };

    return (
        <Container>
            <FormContainer>
                <StyledForm onSubmit={handleSubmit}>
                <Title className="mb-4">멘토 회원가입</Title>
                    <FormGroup>
                        <SubTitle>서비스 분야를 선택해주세요!</SubTitle>
                        <UserType>
                            <Option 
                                onClick={() => handleInputChange({ target: { name: 'category', value: '현장직' } })}
                                selected={formData.category === '현장직'}
                            >
                                현장직
                            </Option>
                            <Option 
                            onClick={() => handleInputChange({ target: { name: 'category', value: '사무직' } })}
                            selected={formData.category === '사무직'}
                            >
                            사무직
                            </Option>
                            <Option 
                            onClick={() => handleInputChange({ target: { name: 'category', value: '문화' } })}
                            selected={formData.category === '문화'}
                            >
                            문화
                            </Option>
                            <Option 
                            onClick={() => handleInputChange({ target: { name: 'category', value: '기술직' } })}
                            selected={formData.category === '기술직'}
                            >
                            기술직
                            </Option>   
                            <Option 
                            onClick={() => handleInputChange({ target: { name: 'category', value: '요리' } })}
                            selected={formData.category === '요리'}
                            >
                            요리
                            </Option>                                                        
                        </UserType>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="career">경력</Label>
                        <div>
                            <Select
                                id ="career"
                                name="career"
                                onChange={handleInputChange}
                            >
                                <option value="">경력을 기입해주세요.</option>
                                <option value="5년 미만">5년 미만</option>
                                <option value="10년 미만">10년 미만</option>
                                <option value="15년 미만">15년 미만</option>
                                <option value="15년 이상">15년 이상</option>
                            </Select>
                        </div>
                    </FormGroup>

                    <Button type="submit">가입 완료</Button>

                </StyledForm>
            </FormContainer>

            {showModal && (
                <Modal onClick={closeModal}>
                    <ModalContent>
                        <p>회원가입 되셨습니다.</p>
                        <ModalButton onClick={closeModal}>확인</ModalButton>
                    </ModalContent>
                </Modal>
            )}
        </Container>
    );
}

export default MentorSignupForm;