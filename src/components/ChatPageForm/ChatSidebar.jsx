import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Sidebar = styled.div`
    width: 200px;
    background-color: #f5f5f5;
    overflow-y: auto;
    height: 100vh;
`;

const ChatItem = styled.div`
    padding: 15px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;

    &:hover {
        background-color: #84A080;
        color: white; // 텍스트를 하얀색으로 변경
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;

    &:hover {
        color: white; // 하이퍼링크 텍스트를 하얀색으로 변경
    }
`;

const ChatSidebar = ({ chats }) => {
    return (
        <Sidebar>
        {chats.map((chat) => (
            <StyledLink to={`/chat/${chat.id}`} key={chat.id}>
            <ChatItem>
                <div>{chat.title}</div>
                <small>{chat.lastMessage}</small>
            </ChatItem>
            </StyledLink>
        ))}
        </Sidebar>
    );
};

export default ChatSidebar;