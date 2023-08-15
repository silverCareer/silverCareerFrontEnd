import React from 'react';
import styled from 'styled-components';
import ChatSidebar from './ChatSidebar';
import ChatRoom from './ChatRoom'

const MainContainer = styled.div`
    display: flex;
    margin-top: 20px;
    margin-left: 100px;
    margin-right: 100px;
`;

function ChatPageForm() {

    return (
        <MainContainer>
        <ChatSidebar />
        <ChatRoom />
        </MainContainer>
    );
}

export default ChatPageForm;