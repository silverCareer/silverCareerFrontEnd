import React from 'react';
import MainHeader from '../../components/Common/MainHeader'
import styled from 'styled-components';
import ChatPageForm from '../../components/ChatPageForm'
import Footer from '../../components/Common/Footer';

const MainContainer = styled.div`
    margin-top:0px;
    margin-left:0px;
    margin-right:0px;
    
`;

function ChatPage() {

    return (
        <MainContainer>
            <MainHeader />
            <ChatPageForm />
            <Footer />
        </MainContainer>
    );
}

export default ChatPage;