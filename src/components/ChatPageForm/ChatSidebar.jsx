import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MypageContext } from '../../hooks/mypageContext';
import { getChatRooms } from '../../api/chat/getChatRooms';

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
        color: white;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;

    &:hover {
        color: white;
    }
`;

const ChatSidebar = () => {
    const [chats, setChats] = useState([]);
    const { myPageForm } = useContext(MypageContext);
    const { name } = myPageForm;
    console.log(name)

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await getChatRooms(name);
                if (response.isSuccess) {
                    setChats(response.result);
                } else {
                    console.error("Failed to fetch chats:", response.message);
                }
            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        };

        fetchChats();
    }, [name]);

    return (
        <Sidebar>
            {chats.map((chat) => {
                const lastMessage = chat.messages[chat.messages.length - 1];
                return (
                    <StyledLink to={`/chat/${chat._id}`} key={chat._id}>
                        <ChatItem>
                            <div>{chat.user2}</div>
                            <small>{lastMessage.content}</small>
                        </ChatItem>
                    </StyledLink>
                );
            })}
        </Sidebar>
    );
};

export default ChatSidebar;