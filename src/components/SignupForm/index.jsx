import React, { useState, useContext  } from 'react';
import styled from 'styled-components';
import { useNavigate   } from 'react-router-dom';
import { SignupContext } from '../../hooks/signupContext';
import { sendSMS } from '../../api/signup/sendSMS';
import { nickNameCheck } from '../../api/signup/nickNameCheck';
import { emailCheck } from '../../api/signup/emailCheck';

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
const FormGroup = styled.div`
    margin-bottom: 1em;
`;
const SubTitle = styled.div `
    font-size: 14px;
    color: gray;
`;
const Title = styled.h1`
    font-size: 25px;
    font-weight: bolder;
    margin-bottom: 1em;
    margin-left: 2px;
`;
const Label = styled.label`
    display: block;
    margin-bottom: 0.5em;
    font-size: 0.9em;
`;
const Input = styled.input`
    width: 500px;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin-bottom: 5px;
`;
const EmailInput = styled.input `
    width: 300px;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin-bottom: 5px;
`
const SelectInput = styled.select `
    width: 180px;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin-bottom: 5px;
`;
const PwCheck = styled.div `
    color: #ff5252;
    font-size: 10px;
`
const UserType = styled.div`
    display: flex;
    justify-content: flex-start;
    font-size: 20px;
    gap: 10px;
    margin: 5px 0 20px 0;
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
const PhoneInputGroup = styled.div`
    justify-content: left;
    align-items: center;
    display: flex;
`;
const AuthButton = styled.button`
    border: 1px solid #84a080e9;
    margin-bottom: 5px;
    background-color: transparent;
    color: #84a080;
    padding: 5px; 
    border-radius: 5px;
    cursor: pointer;
    margin-left: 0.5em;
    white-space: nowrap; 
    line-height: 1.2em; 
    font-size: 0.7em; 
`;

const SignupForm = () => {
    const { updateSignupData } = useContext(SignupContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    
    /* password검사 */
    const [password, setPassword] = useState('');
    const [passwordForCheck, setPasswordForCheck] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);

    /* 이메일 */
    const [id, setId] = useState('');
    const [domain, setDomain] = useState('gmail.com');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const combineEmail = (id, domain) => {
        return `${id}@${domain}`;
    };
    const handleIdChange = (event) => {
        setId(event.target.value);
    };
    const handleDomainChange = (event) => {
        setDomain(event.target.value);
    };
    
    /* 비밀번호 유효성 check */
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // 비밀번호 유효성 검사 - 최소 하나 이상의 알파벳, 숫자, 특수문자를 포함해야 합니다.
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&!*])[A-Za-z\d@#$%^&!*]+$/;
        const isValid = newPassword === '' || regex.test(newPassword);
        setPasswordValid(isValid);

        // 비밀번호 확인과 일치하는지 확인
        setPasswordMatch(passwordForCheck === '' || passwordForCheck === newPassword);

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handlePasswordCheckChange = (e) => {
        const newPasswordCheck = e.target.value;
        setPasswordForCheck(newPasswordCheck);

        // 비밀번호 확인과 일치하는지 확인
        setPasswordMatch(password === newPasswordCheck);

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handlePasswordCheckBlur = () => {
        // 비밀번호 확인 필드가 포커스 아웃 될 때 유효성 검사 수행
        setPasswordMatch(password === passwordForCheck);
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

        const isNicknameChecked = sessionStorage.getItem('checkNickname');
        const isEmailChecked = sessionStorage.getItem('checkEmail');
        const isAuthVerified = sessionStorage.getItem('checkAuthCode');
        console.log('닉네임 체크여부 :'+isNicknameChecked)
        console.log('이메일 체크여부 :'+isEmailChecked)
        console.log('인증번호 체크여부 :'+isAuthVerified)
        if (isNicknameChecked !== 'true') {
            alert('닉네임 중복체크를 해주세요.');
            return;
        }

        if (isEmailChecked !== 'true'){
            alert('이메일 중복체크를 해주세요.')
            return;
        }

        if (isAuthVerified !== 'true') {
            alert('인증번호를 확인해주세요.');
            return;
        }
        updateSignupData(formData);
        console.log(formData);
        console.log(formData.authority)
        const nextPage = formData.authority === '멘토' ? '/signup/mentor' : '/signup/mentee';
        navigate(nextPage);
    };

    const handleNicknameCheck = async (event) => {
        event.preventDefault();
        try{
            const name = formData.name;
            const response = await nickNameCheck(name);

            if (response.success){
                sessionStorage.setItem('checkNickname', 'true');
                alert('사용가능한 닉네임입니다.');
            } 

        }catch (error){
            if (error.response && error.response.data.error.code === "AUTH_010") {
                alert('같은 닉네임이 존재합니다.');
                sessionStorage.setItem('checkNickname', 'false');
            } else {
                alert('닉네임 중복체크 실패 했스무니다.');
            }
        }
    }

    const handleEmailCheck = async (event) => {
        event.preventDefault();
        try{
            const email = combineEmail(id, domain);
            const response = await emailCheck(email);
    
            if (response.success){
                sessionStorage.setItem('checkEmail', 'true');
                alert('사용가능한 이메일입니다.');

                setFormData({
                    ...formData,
                    email: email,
                });
            } 

        }catch (error){
            if (error.response && error.response.data.error.code === "AUTH_011") {
                alert('같은 계정이 존재합니다.');
                sessionStorage.setItem('checkEmail', 'false');
            } else {
                alert('이메일 중복체크 실패했습니다.');
            }
        }
    }

    const handleSendAuthCode = async (event) => {
        event.preventDefault();
        try {
            const phone = formData.phoneNumber;
            const response = await sendSMS(phone);
            console.log("여기다!!! : " +response.authCode)
            sessionStorage.setItem('authCode', response.authCode);

            alert('인증번호가 전송되었습니다.');
        } catch (error) {
            console.error('인증번호 전송에 실패했습니다.', error);
            alert('인증번호 전송에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleVerifyAuthCode = (event) => {
        event.preventDefault();
        const storedAuthCode = sessionStorage.getItem('authCode');
        const inputAuthCode = formData.authCode;
        console.log("너가 입력한 값 : "+inputAuthCode)
        console.log("스토리지 저장 값 : "+ storedAuthCode)


    
        if (storedAuthCode === inputAuthCode) {
            alert('인증번호가 확인되었습니다.');
            sessionStorage.setItem('checkAuthCode', 'true')
        } else {
            alert('인증번호가 일치하지 않습니다. 다시 입력해주세요.');
            sessionStorage.setItem('checkAuthCode', 'false')
        }
    };
    return (

        <Container>
        <FormContainer>
            <StyledForm onSubmit={handleSubmit}>
                <Title className="mb-4">회원가입</Title>
                <FormGroup>
                    <SubTitle>멘토와 멘티를 골라주세요!</SubTitle>
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
                    <Label htmlFor="name">닉네임 입력</Label>
                    <PhoneInputGroup>
                        <Input id="name" type="text" name="name" onChange={handleInputChange} placeholder="닉네임을 입력해주세요."/>
                        <AuthButton onClick={handleNicknameCheck}>중복 확인</AuthButton>
                    </PhoneInputGroup>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="birthDate">생년월일</Label>
                    <PhoneInputGroup>
                        <Input id="birthDate" type="date" name="birthDate" onChange={handleBirthChange} />
                    </PhoneInputGroup>
                </FormGroup>
                
                <FormGroup>
                    <Label htmlFor="email">이메일</Label>
                    <PhoneInputGroup>
                        {/* <Input id="email" type="email" name="email" onChange={handleInputChange} placeholder="이메일을 입력해주세요."/>
                        <AuthButton onClick={handleEmailCheck}>중복 확인</AuthButton> */}
                        <EmailInput type="text" value={id} onChange={handleIdChange} placeholder="이메일을 입력해주세요." />
                        @
                        <SelectInput value={domain} onChange={handleDomainChange}>
                            <option value="gmail.com">gmail.com</option>
                            <option value="naver.com">naver.com</option>
                        </SelectInput>
                        <AuthButton onClick={handleEmailCheck}>중복 확인</AuthButton>
                    </PhoneInputGroup>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="password">비밀번호 입력</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            onChange={handlePasswordChange}
                            placeholder="최소 하나 이상의 알파벳/숫자/특수문자를 작성해주세요."
                        />
                        {!passwordValid && <PwCheck>비밀번호가 유효하지 않습니다.</PwCheck>}
                        <Input
                            id="passwordForCheck"
                            type="password"
                            name="passwordForCheck"
                            onChange={handlePasswordCheckChange}
                            onBlur={handlePasswordCheckBlur}
                            placeholder="비밀번호를 한번 더 입력해주세요."
                        />
                        {!passwordMatch && <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>}
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