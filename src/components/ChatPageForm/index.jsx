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
    // 임시 채팅 리스트 데이터
    const chats = [
        { id: '1', title: 'Chat Room 1', lastMessage: 'Last message...' },
        { id: '2', title: 'Chat Room 2', lastMessage: 'Last message...' },
    ];

    return (
        <MainContainer>
        <ChatSidebar chats={chats} />
        {/* 여기에 채팅 화면 컴포넌트를 추가할 예정 */}
        </MainContainer>
    );
}

export default ChatPageForm;