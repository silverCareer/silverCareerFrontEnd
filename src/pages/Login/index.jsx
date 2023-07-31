import React from 'react';
import LoginForm from '../../components/LoginForm';
import Header from '../../components/Common/Header';

function Login() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
        <Header />
        <h2>로그인</h2>
        <LoginForm />
        </div>
    );
}

export default Login;