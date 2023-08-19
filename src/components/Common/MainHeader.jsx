import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from '../../assets/image/logoImage.jpg';
import searchIconImage from '../../assets/svg/icon-search.svg';
import { LoginContext } from '../../hooks/loginContext';
import { MypageContext } from '../../hooks/mypageContext';
import { getMyProfile } from '../../api/mypage/mypage';
import { getAlarm } from '../../api/alarm/getAlarm';


const Header = styled.header`
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
    height: 70px;
    margin : 10px 50px 0px 50px;
`;

const Logo = styled.div`
    cursor: pointer;
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

const NotificationWrapper = styled.div`
    position: relative; // 이를 통해 내부의 absolute 포지셔닝 NotificationContainer가 상대적으로 위치를 잡게 됩니다.
`;

const NotificationContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: #FFF;
    border: 1px solid #84A080; // 포인트 컬러 추가
    max-height: 300px;
    overflow-y: auto;
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1;
    width: 250px; // 일정 크기를 갖도록 설정. 크기는 원하는대로 조절 가능합니다.
`;

const NotificationItem = styled.div`
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;

    &:hover {
        background: #f5f5f5;
    }

    &:last-child {
        border-bottom: none; // 마지막 아이템에는 테두리 제거
    }
`;

// 알림이 없을 때 표시되는 문구에 대한 스타일
const NoNotificationText = styled.div`
    color: #84A080; // 포인트 컬러로 텍스트 표시
    padding: 10px;
    text-align: center; // 가운데 정렬
`;

const MainHeader = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext); 
    const { setMyPageForm } = useContext(MypageContext);
    const navigate = useNavigate();

    const notificationRef = useRef(null); // 알림창에 대한 ref
    const buttonRef = useRef(null); // 알림 버튼에 대한 ref

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                console.log("Asdasd")
                const alarmData = await getAlarm();
                console.log("알람! : " + alarmData)
                setNotifications(alarmData);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            }
        };

        if (isNotificationOpen) {
            fetchNotifications();
        }

        const handleOutsideClick = (event) => {
            // 알림창과 버튼 외부를 클릭했을 때만 알림창을 닫습니다.
            if (isNotificationOpen && notificationRef.current && !notificationRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
        };

        // mousedown 이벤트 리스너를 추가합니다.
        document.addEventListener("mousedown", handleOutsideClick);

        // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isNotificationOpen]);

    const toggleNotifications = () => {
        setIsNotificationOpen(prev => !prev);
    };

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

    const handleLogout = () => {

        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('jwttoken');
        navigate('/login')
    }

    


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
                    <NotificationWrapper>
                        <Button  ref={buttonRef} onClick={toggleNotifications}>알림</Button>
                        {isNotificationOpen && (
                            <NotificationContainer ref={notificationRef}>
                                {notifications.length === 0 ? (
                                    <NoNotificationText>알림이 없습니다.</NoNotificationText>
                                ) : (
                                    notifications.map(notification => (
                                        <NotificationItem key={notification.suggestionIdx}>
                                            제목: {notification.suggestionTitle} <br />
                                            제안자: {notification.suggester} <br />
                                            상태: {notification.suggestionStatus}
                                        </NotificationItem>
                                    ))
                                )}
                            </NotificationContainer>
                        )}
                    </NotificationWrapper>
                    <Button onClick={handleMyPageClick}>마이페이지</Button>
                    <Button onClick={handleLogout}>로그아웃</Button>
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