import React from 'react';
//import SignupForm from '../../components/SignupForm';
import Header from '../../components/Common/Header';
import SignupForm from '../../components/SignupForm/index';
import Footer from '../../components/Common/Footer';

function SignupPage() {
    return (

        <div>
        <Header />
        <SignupForm />
        <Footer />
        </div>
    );
}

export default SignupPage;