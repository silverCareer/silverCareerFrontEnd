import React, { createContext, useState } from 'react';

export const SignupContext = createContext();

const SignupProvider = ({ children }) => {
    const [signupData, setSignupData] = useState({});

    const updateSignupData = (newData) => {
        setSignupData(prevData => ({ ...prevData, ...newData }));
    };

    return (
        <SignupContext.Provider value={{ signupData, updateSignupData }}>
        {children}
        </SignupContext.Provider>
    );
};

export default SignupProvider;