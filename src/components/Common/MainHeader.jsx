import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from '../../assets/image/logoImage.jpg';
import searchIconImage from '../../assets/svg/icon-search.svg';
import { LoginContext } from '../../hooks/loginContext';
import { MypageContext } from '../../hooks/mypageContext';
import { getMyProfile } from '../../api/mypage/mypage';

const Header = styled.header`
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
    height: 70px;
    margin : 10px 50px 0px 50px;
`;

const Logo = styled.div`
    width: 100px;
    height: 50px;
    background-image: url(${logoImage});
    background-repeat: no-repeat;
`;

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 10px;
`;

const SearchBox = styled.input`
    padding: 5px;
    border-radius: 10px;
    width: 300px;

    border-radius: 25px;
    border: 1px solid #000;
    background: #FFF;
`;

const SearchIcon = styled.span`
    position: absolute;
    right: 10px;
    cursor: pointer;
    background-image: url(${searchIconImage});
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
`;

const Button = styled.button`
    margin-left: 10px;
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
    padding: 0;
    outline: inherit;
    font-weight : 700;
`;

const ReqButton = styled.button`
    margin-left: 10px;
    background: none;
    border: 1px solid #84A080;
    border-radius: 10px;
    color: #84A080;
    font: inherit;
    cursor: pointer;
    padding: 5px 20px 5px 20px;
    outline: inherit;
    font-weight : 700;
`;


const Line = styled.div`
    height: 1px;
    width: 100%;
    background-color: #ccc; 
    margin: 1em 0; 
`;

const MainHeader = () => {
    const { isLoggedIn } = useContext(LoginContext); 
    const { setMyPageForm } = useContext(MypageContext);
    const navigate = useNavigate();

    const handleMyPageClick = async () => {
        if (isLoggedIn) {
            try {
                const data = await getMyProfile();


                if (data.authority === 'ROLE_MENTOR') {
                    data.authority = '멘토';
                }

                if (data.authority === 'ROLE_MENTEE') {
                    data.authority = '멘티';
                }

                if (data.phoneNumber && data.phoneNumber.length === 11) {
                    data.phoneNumber = data.phoneNumber.replace(
                        /(\d{3})(\d{4})(\d{4})/,
                        '$1-$2-$3'
                    );
                }
                
                console.log(data)
                setMyPageForm(data);
                navigate('/mypage');
            } catch (err) {
                console.error(err);
            }
        }
    };

    


    return (
        <>
            <Header>
                <Logo onClick={() => navigate('/')}></Logo>
                <SearchContainer>
                    <SearchBox type="text" placeholder="  원하는 멘토를 찾아보세요!" />
                    <SearchIcon onClick={() => navigate('/search')} />
                </SearchContainer>
                {isLoggedIn ? (
                <>
                    <ReqButton onClick={() => navigate('/request')}>의뢰하기</ReqButton>
                    <Button onClick={() => navigate('/apply')}>수강등록</Button>
                    <Button onClick={() => navigate('/chatroom')}>채팅</Button>
                    <Button onClick={() => navigate('/notification')}>알림</Button>
                    <Button onClick={handleMyPageClick}>마이페이지</Button>
                </>
                ) : (
                <>
                    <ReqButton onClick={() => navigate('/request')}>의뢰하기</ReqButton>
                    <Button onClick={() => navigate('/apply')}>수강등록</Button>
                    <Button onClick={() => navigate('/chat')}>채팅</Button>
                    <Button onClick={() => navigate('/notification')}>알림</Button>
                    <Button onClick={() => navigate('/login')}>로그인</Button>
                    <Button onClick={() => navigate('/signup')}>회원가입</Button>
                </>
                )}
            </Header>
            <Line />
        </>
        
    );
}

export default MainHeader;