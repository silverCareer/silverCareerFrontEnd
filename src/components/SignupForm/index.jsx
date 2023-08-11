import React, { useState, useContext  } from 'react';
import styled from 'styled-components';
import { useNavigate   } from 'react-router-dom';
import { SignupContext } from '../../hooks/signupContext';
import { sendSMS } from '../../api/signup/sendSMS';


const Container = styled.div`
    margin-top: 5em;
`;

const FormContainer = styled.div`
    margin: 0 auto;
    width: 50%;
`;

const StyledForm = styled.form`
    padding: 2em;
    border: 1px solid #ccc;
    border-radius: 15px;

`;

const FormGroup = styled.div`
    margin-bottom: 1em;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 1em;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 0.5em;
    font-size: 0.9em;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.5em;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
`;

const UserType = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const Option = styled.div`
    padding: 0.5em;
    cursor: pointer;
    transition: background-color 0.3s ease; 
    border-radius: 15px;
    &:hover {
        background-color: #84A080;
    }
    ${({ selected }) =>
        selected &&
        `
        background-color: #84A080;
        color: white;
    `}
`;

const Button = styled.button`
    display: block;
    font-size: 1.2em;
    font-weight: 900;
    width: 15%;
    border-radius: 15px;

    border: none;
    color: white;
    background-color: #84A080;
    border-radius: 15px;
    cursor: pointer;
    text-align: center;
    margin: 0 auto; 
    text-decoration: none;
`;

const PhoneInputGroup = styled.div`
    display: flex;
    align-items: center;
`;

const AuthButton = styled.button`
    border: none;
    background-color: #84A080;
    color: white;
    padding: 0.5em 0.7em; 
    border-radius: 10px;
    cursor: pointer;
    margin-left: 0.5em;
    white-space: nowrap; 
    line-height: 1.2em; 
    font-size: 0.9em; 
`;

const SignupForm = () => {

    const { updateSignupData } = useContext(SignupContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});
    const [isAuthVerified, setIsAuthVerified] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleBirthChange = (e) => {
        const birthYear = e.target.value.slice(0, 4);
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear + 1; 
    
        setFormData({
            ...formData,
            age: age, 
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isAuthVerified) {
            alert('인증번호를 확인해주세요.');
            return;
        }
        updateSignupData(formData);
        console.log(formData);
        const nextPage = formData.authority === '멘토' ? '/signup/mentor' : '/signup/mentee';
        navigate(nextPage);
    };

    const handleSendAuthCode = async () => {
        try {
            const phone = formData.phoneNumber;
            const response = await sendSMS(phone);

            localStorage.setItem('authCode', response.authCode);

            alert('인증번호가 전송되었습니다.');
        } catch (error) {
            console.error('인증번호 전송에 실패했습니다.', error);
            alert('인증번호 전송에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleVerifyAuthCode = () => {
        const storedAuthCode = localStorage.getItem('authCode');
        const inputAuthCode = formData.authCode;

    
        if (storedAuthCode === inputAuthCode) {
            alert('인증번호가 확인되었습니다.');
            setIsAuthVerified(true);
        } else {
            alert('인증번호가 일치하지 않습니다. 다시 입력해주세요.');
            setIsAuthVerified(false); 
        }
    };
    return (

        <Container>
        <FormContainer>
            <StyledForm onSubmit={handleSubmit}>
                <Title className="mb-4">회원가입</Title>
                <FormGroup>
                    
                    <UserType>
                        <Option 
                        onClick={() => handleInputChange({ target: { name: 'authority', value: '멘토' } })}
                        selected={formData.authority === '멘토'}
                        >
                        멘토
                        </Option>
                        <Option 
                        onClick={() => handleInputChange({ target: { name: 'authority', value: '멘티' } })}
                        selected={formData.authority === '멘티'}
                        >
                        멘티
                        </Option>
                    </UserType>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="name">이름</Label>
                    <div>
                        <Input id="name" type="text" name="name" onChange={handleInputChange} placeholder="이름을 입력해주세요." />
                    </div>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="birthDate">생년월일</Label>
                    <div>
                        <Input id="birthDate" type="date" name="birthDate" onChange={handleBirthChange} />
                    </div>
                </FormGroup>
                
                <FormGroup>
                    <Label htmlFor="email">이메일</Label>
                    <div>
                        <Input id="email" type="text" name="email" onChange={handleInputChange} placeholder="이메일을 입력해주세요."/>
                    </div>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="password">비밀번호 입력</Label>
                    <div>
                        <Input id="password" type="password" name="password" onChange={handleInputChange} placeholder="비밀번호를 입력해주세요."/>
                    </div>
                    <div>
                        <Input id="passwordForCheck" type="password" name="passwordForCheck" onChange={handleInputChange} placeholder="비밀번호를 한번 더 입력해주세요."/>
                    </div>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="phoneNumber">휴대전화 번호</Label>
                    <PhoneInputGroup>
                        <Input id="phoneNumber" type="text" name="phoneNumber" onChange={handleInputChange} placeholder="'-'없이 입력해주세요."/>
                        <AuthButton onClick={handleSendAuthCode}>인증번호 보내기</AuthButton>
                    </PhoneInputGroup>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="authCode">인증번호 입력</Label>
                    <PhoneInputGroup>
                        <Input id="authCode" type="text" name="authCode" onChange={handleInputChange} placeholder="인증번호를 입력해주세요."/>
                        <AuthButton onClick={handleVerifyAuthCode}>인증번호 확인</AuthButton>
                    </PhoneInputGroup>
                </FormGroup>

                <Button type="submit">다음</Button>
                </StyledForm>
        </FormContainer>
        </Container>
    );
};

export default SignupForm;