import React from 'react';
import LoginForm from '../../components/LoginForm';

function Login() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
        <h2>로그인</h2>
        <LoginForm />
        </div>
    );
}

export default Login;