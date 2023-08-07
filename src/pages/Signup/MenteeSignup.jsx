import React from 'react';
//import SignupForm from '../../components/SignupForm';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import MenteeSignupForm from '../../components/SignupForm/MenteeSignupForm'



function MenteeSignup() {
    return (

        <div >
        <Header />
        <MenteeSignupForm />
        <Footer />
        </div>
    );
}

export default MenteeSignup;