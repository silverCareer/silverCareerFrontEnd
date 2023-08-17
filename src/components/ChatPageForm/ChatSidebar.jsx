import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MypageContext } from '../../hooks/mypageContext';
import { getChatRooms } from '../../api/chat/getChatRooms';
import { ChatContext } from '../../hooks/chatContext';


const Sidebar = styled.div`
    width: 200px;
    background-color: #f5f5f5;
    overflow-y: auto;
    height:  80vh; 
    padding: 15px 0;
`;

const ChatItem = styled.div`
    padding: 20px 15px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 8px;

    &:hover {
        background-color: #84A080;
        color: white;
    }

    div {
        font-weight: 600;  
    }

    small {
        font-size: 14px;
        opacity: 0.8;  
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
    const { setSelectedChat, selectedChat, isMessageUpdated } = useContext(ChatContext);
    const { name } = myPageForm;


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
    }, [selectedChat, isMessageUpdated, name]);

    

    return (
        <Sidebar>
            {chats.map((chat) => {
                const lastMessage = chat.messages[chat.messages.length - 1];
                return (
                    <StyledLink 
                    // to={`/chat/${chat._id}`} 
                    key={chat._id}
                    onClick={() => {
                        setSelectedChat(chat);
                        console.log(chat)
                    }} 
                    >
                        <ChatItem>
                            <div>{lastMessage.sender}</div>
                            <small>{lastMessage.content}</small>
                        </ChatItem>
                    </StyledLink>
                );
            })}
        </Sidebar>
    );
};

export default ChatSidebar;