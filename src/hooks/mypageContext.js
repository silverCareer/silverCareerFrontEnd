import React, { createContext, useState } from "react";

export const MypageContext = createContext();

export const MypageProvider = ({ children }) => {
    const [ myPageForm, setMyPageForm ] = useState({});

    return (
        <MypageContext.Provider value={{ myPageForm, setMyPageForm}}>
            {children}
        </MypageContext.Provider>
    );
};
