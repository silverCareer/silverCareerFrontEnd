import React, { useState, useContext  } from 'react';
import styled from 'styled-components';
import { useNavigate   } from 'react-router-dom';
import { SignupContext } from '../../hooks/signupContext';


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
    margin-bottom: 0.5em;
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

const SignupForm = () => {

    const { updateSignupData } = useContext(SignupContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
    });

    const handleInputChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        updateSignupData(formData);
        console.log(formData);
        const nextPage = formData.userType === '멘토' ? '/signup/mentor' : '/signup/mentee';
        navigate(nextPage);
    };

    return (

        <Container>
        <FormContainer>
            <StyledForm onSubmit={handleSubmit}>
                <Title className="mb-4">회원가입</Title>
                <FormGroup>
                    
                    <UserType>
                        <Option 
                        onClick={() => handleInputChange({ target: { name: 'userType', value: '멘토' } })}
                        selected={formData.userType === '멘토'}
                        >
                        멘토
                        </Option>
                        <Option 
                        onClick={() => handleInputChange({ target: { name: 'userType', value: '멘티' } })}
                        selected={formData.userType === '멘티'}
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
                        <Input id="birthDate" type="date" name="birthDate" onChange={handleInputChange} />
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
                        <Input id="passwordForCheck" type="password" name="passwordForCheck" onChange={handleInputChange} placeholder="비밀번호를 입력해주세요."/>
                    </div>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="phonenumber">휴대전화 번호</Label>
                    <div>
                        <Input id="phonenumber" type="text" name="phonenumber" onChange={handleInputChange} placeholder="휴대전화 번호를 입력해주세요."/>
                    </div>
                </FormGroup>
                
                <Button type="submit">다음</Button>
                </StyledForm>
        </FormContainer>
        </Container>
    );
};

export default SignupForm;