import React from 'react';
//import SignupForm from '../../components/SignupForm';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import MentorSignupForm from '../../components/SignupForm/MentorSignupForm'



function MentorSignup() {
    return (

        <div >
        <Header />
        <MentorSignupForm />
        <Footer />
        </div>
    );
}

export default MentorSignup;