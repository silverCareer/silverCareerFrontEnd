import React from 'react';
import styled from 'styled-components';
import kakaoLogo from '../../assets/image/kakaologo.png';
import { Link } from 'react-router-dom';
import useKakaoLogin from '../../hooks/useKakaoLogin';
import GoogleLoginButton from './GoogleLoginButton';



const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
  padding: 1em;
`;

const Input = styled.input`
  width: 290px;
  height: 30px;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 300px;
  height: 40px;
  border: none;
  border-radius: 4px;
  background-color: #84A080;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out; 

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
  }
`;

const LinkButton = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
  font-size: 0.6em; 
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  margin: 0 0.5em; 

  &:hover {
    color: #1e90ff;
  }
`;

const LinkContainer = styled.div`
  display: flex;  
  justify-content: center; 
  gap: 1em; 
`;

const Line = styled.div`
  height: 1px;
  width: 140%;
  background-color: #ccc; 
  margin: 1em 0; 
`;

const KakaoButton = styled.button`
  width: 205px;
  height: 40px;
  border: none;
  border-radius: 4px;
  background-image: url(${kakaoLogo});
  background-size: 11%;
  background-repeat: no-repeat;
  background-position: 10px center; 
  background-color: #f3e141;
  color: black;
  cursor: pointer;
  transition: all 0.3s ease-in-out; 

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4);
  }
`;



function LoginForm() {
  const handleKakaoLogin = useKakaoLogin(); //훅 사용


    return (
        <Form>
        <Input type="email" placeholder="이메일을 입력해주세요." />
        <Input type="password" placeholder="비밀번호를 입력해주세요." />
        <Button type="submit">이메일 로그인</Button>
        <LinkContainer>
        <LinkButton to="/find-id">아이디 찾기</LinkButton>
        <LinkButton to="/find-password">비밀번호 찾기</LinkButton>
        <LinkButton to="/signup">회원가입</LinkButton>
        </LinkContainer>
        <Line />
        <KakaoButton onClick={handleKakaoLogin}> &nbsp;&nbsp;&nbsp;&nbsp; 카카오 계정으로 로그인</KakaoButton>
        <GoogleLoginButton />
        </Form>
    );
}

export default LoginForm;