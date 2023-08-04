import React from 'react';
import styled from 'styled-components';
import ProfilePicEditor from './ProfilePicEditor';
import UeerInfoEditor from './UserInfoEditor'


const MainContainer = styled.div`
    margin-top:20px;
    margin-left:100px;
    margin-right:100px;
`;

const Title = styled.div`
    padding: 20px 100px;
    font-size: 1.3rem;
    font-weight: 600;
`

const Title2 = styled.div`
    padding: 20px 100px;
    font-size: 1.1rem;
    font-weight: 600;
`

const Line = styled.div`
    height: 1px;
    width: 100%;
    background-color: #ccc; 
    margin: 1em 0; 
`

function AccountEdit() {
    return (

        <MainContainer>
            <Title>계정 설정</Title>
            <ProfilePicEditor />
            <Line></Line>
            <Title2>사용자 정보</Title2>
            <UeerInfoEditor />
        </MainContainer>
        
    );
}

export default AccountEdit;