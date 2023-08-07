import React, { useState, useContext  } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SignupContext } from '../../hooks/signupContext';
import { signup } from '../../api/signup';

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

const Title = styled.h1`
    text-align: center;
    margin-bottom: 1em;
`;

const FormGroup = styled.div`
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
    font-size: 1em;
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

const Select = styled.select`
    width: 30%;
    padding: 0.5em;
    margin-bottom: 0.5em;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
`;





function MentorSignupForm() {

    const { signupData, updateSignupData } = useContext(SignupContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        const finalData = { ...signupData, ...formData };
        updateSignupData(finalData);
        console.log(finalData)
        signup(finalData) 
        .then(response => {
            //console.log(response.data);
            navigate('/')
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

    return (
        <Container>
            <FormContainer>
                <StyledForm onSubmit={handleSubmit}>
                <Title className="mb-4">멘토 회원가입</Title>
                    <FormGroup>
                        <Label htmlFor="bank">은행</Label>
                        <div>
                            <Select
                                id ="bank"
                                name="bank"
                                onChange={handleInputChange}
                            >
                                <option value="">은행을 선택해주세요.</option>
                                <option value="하나은행">하나은행</option>
                                <option value="우리은행">우리은행</option>
                                <option value="신한은행">신한은행</option>
                                <option value="새마을금고">새마을금고</option>
                            </Select>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="accountNum">계좌번호</Label>
                        <div>
                            <Input type="text" id="accountNum" name="accountNum" onChange={handleInputChange} placeholder="' - ' 없이 입력해주세요" />
                        </div>
                    </FormGroup>

                    <FormGroup>
                    
                        <Label htmlFor="serviceArea">서비스 분야</Label>
                        <UserType>
                            <Option 
                            onClick={() => handleInputChange({ target: { name: 'serviceArea', value: '현장직' } })}
                            selected={formData.userType === '현장직'}
                            >
                            현장직
                            </Option>
                            <Option 
                            onClick={() => handleInputChange({ target: { name: 'serviceArea', value: '사무직' } })}
                            selected={formData.userType === '사무직'}
                            >
                            사무직
                            </Option>
                            <Option 
                            onClick={() => handleInputChange({ target: { name: 'serviceArea', value: '문화' } })}
                            selected={formData.userType === '문화'}
                            >
                            문화
                            </Option>
                            <Option 
                            onClick={() => handleInputChange({ target: { name: 'serviceArea', value: '기술직' } })}
                            selected={formData.userType === '기술직'}
                            >
                            기술직
                            </Option>   
                            <Option 
                            onClick={() => handleInputChange({ target: { name: 'serviceArea', value: '요리' } })}
                            selected={formData.userType === '요리'}
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
        </Container>
    );
}

export default MentorSignupForm;