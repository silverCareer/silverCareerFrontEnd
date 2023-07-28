import React from 'react';
//import SignupForm from '../../components/SignupForm';
import Header from '../../components/Common/Header';
import LoginForm from '../../components/SignupForm/index';
import Footer from '../../components/Common/Footer';

function SignupPage() {
    return (

        <div>
        <Header />
        <LoginForm />
        <Footer />
        </div>
    );
}

export default SignupPage;