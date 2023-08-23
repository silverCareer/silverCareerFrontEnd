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

function UserInfoEditor() {

    const { myPageForm, setMyPageForm } = useContext(MypageContext);
    const { phoneNumber } = myPageForm;
    const [formData, setFormData] = useState({
    });

    console.log(myPageForm, "이건ㄴ이넉넝기넝긴어ㅣㄹ미아ㅓ류미ㅏㅇ멍ㄻㅇㄹ")
    const handleInputChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await postMyInfo(formData.phoneNum, formData.password);
            console.log("Success!", response);

            setMyPageForm({
                ...myPageForm,
                phoneNumber : formData.phoneNum,
                password: formData.password,
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
    );
}

export default UserInfoEditor;