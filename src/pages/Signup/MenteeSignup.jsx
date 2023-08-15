import React from 'react';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import MenteeSignupForm from '../../components/SignupForm/MenteeSignupForm'



function MenteeSignup() {
    return (
        <>
            <Header />
            <MenteeSignupForm />
            <Footer />
        </>
    );
}

export default MenteeSignup;