import React from 'react';
import styled from 'styled-components';
import ChatSidebar from './ChatSidebar';

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

        {/* 여기에 채팅 화면 컴포넌트를 추가할 예정 */}
        </MainContainer>
    );
}

export default ChatPageForm;