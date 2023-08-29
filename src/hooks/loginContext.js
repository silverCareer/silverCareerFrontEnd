import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginForm, setLoginForm] = useState({});
    const [authority, setAuthority] = useState();

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, loginForm, setLoginForm, setAuthority }}>
            {children}
        </LoginContext.Provider>
    );
};