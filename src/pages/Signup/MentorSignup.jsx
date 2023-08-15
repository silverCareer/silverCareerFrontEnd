import React from 'react';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import MentorSignupForm from '../../components/SignupForm/MentorSignupForm'



function MentorSignup() {
    return (
        <>
            <Header />
            <MentorSignupForm />
            <Footer />
        </>
    );
}

export default MentorSignup;