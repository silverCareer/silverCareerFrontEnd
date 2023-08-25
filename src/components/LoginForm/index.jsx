import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/login';
import { LoginContext } from '../../hooks/loginContext';

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
const LinkButton = styled.button`
  text-decoration: none;
  color: black;
  cursor: pointer;
  font-size: 0.8em; 
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  margin: 0 0.5em; 
  background: transparent;
  border: none;
  padding: 0;

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
    border: 2px solid #84A080;
`;
const ModalButton = styled.button`
    background-color: #84A080;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    margin-top: 10px;
`;

function LoginForm() {
  const { setIsLoggedIn, loginForm, setLoginForm } = useContext(LoginContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    email : '',
    password : ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formData) 
    .then(response => {
        localStorage.setItem('jwttoken', response.data.response.accessToken);
        localStorage.setItem('refreshToken', response.data.response.refreshToken)
        setIsLoggedIn(true);

        localStorage.setItem('isLoggedIn', 'true');

        if (response.data.response.authority === 'ROLE_MENTOR') {
          setLoginForm(prev => ({ ...prev, authority: '멘토' }));
        } else if (response.data.response.authority === 'ROLE_MENTEE') {
            setLoginForm(prev => ({ ...prev, authority: '멘티' }));
        }

        setLoginForm(prev => ({
          ...prev,
          name: response.data.response.name,
          balance: response.data.response.balance
        }));
        navigate('/') 
    })
    .catch(error => {
      console.error(error);
      setShowModal(true);
    });
  };

const handleInputChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value
    });
  };

    return (
      <>
        <Form onSubmit={handleSubmit}>
          <Input id="email" name="email" type="email" onChange={handleInputChange} placeholder="이메일을 입력해주세요." />
          <Input id="password" name="password" type="password" onChange={handleInputChange} placeholder="비밀번호를 입력해주세요." />
          <Button type="submit">이메일 로그인</Button>
          <LinkContainer>
          <LinkButton onClick={() => navigate('/signup')}>회원가입</LinkButton>
          </LinkContainer>
        </Form>
        {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <p>비밀번호를 확인해주세요.</p>
            <ModalButton onClick={() => setShowModal(false)}>확인</ModalButton>
          </ModalContent>
        </Modal>
      )}
      </>
    );
}

export default LoginForm;