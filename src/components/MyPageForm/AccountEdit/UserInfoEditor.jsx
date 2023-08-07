// import React, { useState  } from 'react';
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { postMyInfo } from '../../../api/mypage/postMyInfo';
import { MypageContext } from '../../../hooks/mypageContext';

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
    border: 1px solid #84A080;
    color: #84A080;;
    border-radius: 5px;
    cursor: pointer;
    margin: auto;
`;

function UserInfoEditor() {

    const { myPageForm, setMyPageForm } = useContext(MypageContext);

    const [formData, setFormData] = useState({
    });

    const handleBirthChange = (e) => {
        const birthYear = e.target.value.slice(0, 4);
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear + 1; 
    
        setFormData({
            ...formData,
            age: age, 
        });
    };
    

    const handleInputChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await postMyInfo(formData.phoneNum, formData.age);
            console.log("Success!", response);

            setMyPageForm({
                ...myPageForm,
                age : formData.age,
                phone_num: formData.phoneNum,
            });

        } catch (error) {
            console.error("An error occurred:", error);

        }
    };


    return (
        <MainContainer>
            <PayInfo>
                <InfoContainer>
                    <Title>가입정보</Title>
                    <Contents>멘토</Contents>
                </InfoContainer>
                <InfoContainer>
                    <Title>이메일</Title>
                    <Contents>cnf101219@gmail.com</Contents>
                </InfoContainer>
                <InfoContainer>
                    <Title>이름</Title>
                    <Contents>백연정</Contents>
                </InfoContainer>
                <InfoContainer>
                    <Label htmlFor="phoneNum">휴대폰</Label>
                        <div>
                            <Input id="phoneNum" type="text" name="phoneNum" onChange={handleInputChange} placeholder="'-'제외하고 입력해주세요." />
                        </div>
                </InfoContainer>
                <InfoContainer>
                    <Label htmlFor="birth">생년월일</Label>
                        <div>
                            <Input id="birth" type="date" name="birth" onChange={handleBirthChange} placeholder="6자리로 입력해주세요." />
                        </div>
                </InfoContainer>
                <Button onClick={handleSubmit}>확인</Button>
            </PayInfo>

            
        </MainContainer>
    );
}

export default UserInfoEditor;