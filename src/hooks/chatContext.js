import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState({});
    const [isMessageUpdated, setIsMessageUpdated] = useState(false);

    const toggleMessageUpdated = () => setIsMessageUpdated(prev => !prev);

    return (
        <ChatContext.Provider value={{ selectedChat, setSelectedChat, messages, setMessages, isMessageUpdated, toggleMessageUpdated }}>
            {children}
        </ChatContext.Provider>
    );
};