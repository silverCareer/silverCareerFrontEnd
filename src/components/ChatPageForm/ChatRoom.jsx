import React, { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChatContext } from './../../hooks/chatContext';
import { createWebSocketClient } from '../../utils/websocket';
import { updateChatContents } from '../../api/chat/updateChatContents';
import { MypageContext } from '../../hooks/mypageContext';
import { LoginContext } from '../../hooks/loginContext';
// import { getLatestChatRoom } from '../../api/chat/getLatestChatRoom';

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 80vh;  
    width: 80%;  
    margin: 0 auto;  
    border: 1px solid #ccc;  
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
`;

const ChatHeader = styled.div`
    padding: 15px;
    background-color: #f5f5f5;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
`;

const MessagesContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 20px;
`;

const MessageItem = styled.div`
    margin-bottom: 10px;
    padding: 8px 15px;
    border-radius: 10px;
    background-color: ${props => props.$isMine ? "#d9eefa" : "#f9f9f9"};
    align-self: ${props => props.$isMine ? "flex-end" : "flex-start"};
`;

const InputContainer = styled.div`
    display: flex;
    padding: 10px;
    border-top: 1px solid #ccc;
`;

const InputField = styled.input`
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SendButton = styled.button`
    padding: 10px 20px;
    border: none;
    background-color: #84A080;
    color: white;
    cursor: pointer;
    border-radius: 5px;
`;

const ChatRoom = () => {

    const { selectedChat, toggleMessageUpdated  } = useContext(ChatContext); // selectedChat 값을 가져옴
    const [message, setMessage] = useState(''); // 입력된 메시지 저장
    const [messages, setMessages] = useState([]); 
    const client = useRef(null);
    const { loginForm } = useContext(LoginContext)
    const { name } = loginForm
    // const { myPageForm } = useContext(MypageContext);
    // const { name } = myPageForm;
    const messagesEndRef = useRef(null); //마지막 메시지 따라가게 하려고 생성
    const otherUserName = selectedChat?.user1 === name ? selectedChat?.user2 : selectedChat?.user1;
    
    useEffect(() => {
        setMessages(selectedChat?.messages || []);
        if(client.current && client.current.connected) {
            client.current.deactivate(); // 기존 연결 종료
        }
        client.current = createWebSocketClient();

        client.current.onConnect = (frame) => {
            console.log('Connected:', frame);

            // 구독 시작
            client.current.subscribe(`/topic/messages/`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages(prevMessages => [...prevMessages, receivedMessage]);
                
                toggleMessageUpdated(); 
            });
        };

        client.current.onDisconnect = () => {
            console.log('Disconnected');
        };

        client.current.activate(); // 연결 시작

        return () => {
            if (client.current.connected) {
                client.current.deactivate(); // 연결 종료
            }
        };
    }, [selectedChat]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages]);


    const handleSend = async () => {
        if (message && client.current && client.current.connected) {
            const newMessage = {
                content: message,
                sender: name
            };
            client.current.publish({
                destination: '/app/sendMessage',
                body: JSON.stringify(newMessage),
            });

            try {
                // 메시지를 서버에 저장하는 API 호출
                console.log("파람스들 :" + selectedChat._id, newMessage)
                await updateChatContents(selectedChat._id, newMessage);
            } catch (error) {
                console.error("Failed to update chat contents:", error);
            }
    

            setMessage('');
        }
    };
    return (
        <ChatContainer>
            <ChatHeader>{otherUserName || "Loading..."}</ChatHeader> 
            <MessagesContainer>
                {messages.map((message, index) => (
                    <MessageItem key={index} $isMine={message.sender === name}>
                        <div>{message.sender}</div> 
                        {message.content}
                    </MessageItem>
                ))}
                <div ref={messagesEndRef} />
            </MessagesContainer>
            <InputContainer>
                <InputField 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {  
                            e.preventDefault();  
                            handleSend();
                        }
                    }}
                    placeholder="메시지를 입력하세요..." />
                <SendButton onClick={handleSend}>보내기</SendButton>
            </InputContainer>
        </ChatContainer>
    );
};

export default ChatRoom;