import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from '../../assets/image/logoImage.jpg';
import searchIconImage from '../../assets/svg/icon-search.svg';
import { LoginContext } from '../../hooks/loginContext';
import { MypageContext } from '../../hooks/mypageContext';
import { getMyProfile } from '../../api/mypage/mypage';
import { getAlarm } from '../../api/alarm/getAlarm';
import { getAlarmStatus } from '../../api/alarm/getAlarmStatus';
import { getSuggestion } from '../../api/request/getSuggestion';
import { getBidInfo } from '../../api/request/getBidInfo';
import { searchAPI } from '../../api/search/productSearch';
import { SearchContext } from '../../hooks/searchContext';
import LoginCheckFunction from './LoginCheck';

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
    background-image: url(${logoImage});;
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
    border-radius: 8px;
    width: 300px;
    border: 1px solid #000;
    background: #FFF;
`;
const SearchIcon = styled.span`
    position: absolute;
    right: 3px;
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

    &:hover {
        background-color: #84A080;
        color: white;
    }
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
const NotificationContainer = styled.div ``;
const NotificationContext = styled.div`
    display: flex;
    flex-direction: column;
    background: #FFF;
    border: 2px solid #7e7e7e; // 포인트 컬러 추가
    border-radius: 5px;
    max-height: 300px;
    overflow-y: auto;
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1;
    width: 350px; // 일정 크기를 갖도록 설정. 크기는 원하는대로 조절 가능합니다.
    padding: 5px;
    line-height: 1.5;
    span {
        color: black;
    }
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
const NoNotificationText = styled.div`
    color: #7e7e7e; 
    padding: 10px;
    text-align: center; 
`;
const AlarmStatusIcon = styled.div`
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: -5px;
    right: -5px;
    display: ${props => (props.show ? 'block' : 'none')}; // 알림 상태에 따라 표시/숨김
`;

const MainHeader = () => {
    const { isLoggedIn, setIsLoggedIn, loginForm, setLoginForm } = useContext(LoginContext); 
    const { setMyPageForm } = useContext(MypageContext);
    const { authority } = loginForm;
    const navigate = useNavigate();

    const notificationRef = useRef(null); // 알림창에 대한 ref
    const buttonRef = useRef(null); // 알림 버튼에 대한 ref

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const [hasNewAlarm, setHasNewAlarm] = useState(false); 
    
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // 렌더링 될 때마다 새로운 알람있는지 체크
    useEffect(() => {
        const checkAlarmStatus = async () => {
            try {
                const statusData = await getAlarmStatus();
                console.log("렌더링될때마다 실행")
                const status = statusData.status
                // console.log(authority, name, status)

                setHasNewAlarm(status);
            } catch (error) {
                console.error("Failed to fetch alarm status:", error);
            }
        };
        if(isLoggedIn){
            checkAlarmStatus();
        }

    }, [isLoggedIn]);

    //알람 클릭할때
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const alarmData = await getAlarm();
                // console.log("알람데이터! : " + JSON.stringify(alarmData, null, 2));
                console.log(alarmData)
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
        localStorage.removeItem('authority');
        navigate('/login')
    }

    const handleMentorNotificationClick = async (suggestionIdx) => {
        try {
            const response = await getSuggestion(suggestionIdx);
            console.log(response);
            if (response) {
                navigate('/requestInfo', { state: { requestInfo: response } });
            }
        } catch (error) {
            console.error("상세 의뢰 API 에러! :", error);
        }
    };
    
    const handleMenteeNotificationClick = async (bidIdx) => {
        try{
            console.log(bidIdx)
            const response = await getBidInfo(bidIdx);
            console.log(response)
            if (response){
                navigate('/bidRequest', { state : { requestInfo: response}})
            }

        } catch(error){
            console.log("상세 입찰 내역 API 에러 ! : ", error)
        }
        
    };
    
    /* search 검색기능 */
    const [ searchTerm, setSearchTerm ] = useState('');
    const { setSearchProductList, setSearchContent } = useContext(SearchContext);//useState([]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearch = async () => {
        try {
            const result = await searchAPI(searchTerm, 1, 9);
            setSearchProductList(result.response);
            setSearchContent(searchTerm);

            if(result.success) {
                navigate('/search');
            }
        } catch (error) {
            setSearchContent(searchTerm);
            navigate('/search/noResult');
        }
    }

    return (
        <>
            <Header>
                <LoginCheckFunction setIsLoggedIn={setIsLoggedIn}/>
                <Logo onClick={() => navigate('/')}></Logo>
                <SearchContainer>
                    <SearchBox type="text"
                            placeholder="원하는 멘토를 찾아보세요!"
                            value={searchTerm}
                            onChange={handleSearchChange} />
                    <SearchIcon onClick={handleSearch} />
                </SearchContainer>
                {console.log(isLoggedIn, ",로긘여부")}
                {isLoggedIn  ? (
                <>
                    {authority === '멘티' && <ReqButton onClick={() => navigate('/request')}>의뢰하기</ReqButton>}
                    {authority === '멘티' ? (
                        <Button onClick={() => navigate('/bidList')}>입찰내역</Button> 
                    ) : (
                        <Button onClick={() => navigate('/apply')}>수강등록</Button>     
                    )}
                    <Button onClick={() => navigate('/chatroom')}>채팅</Button>
                    <NotificationWrapper>
                        <Button ref={buttonRef} onClick={toggleNotifications}>알림</Button>
                        <AlarmStatusIcon show={hasNewAlarm} /> {/* AlarmStatusIcon의 'show' props를 이용해서 보여주고 안보여주고 구현 */}
                        {isNotificationOpen && (
                            <NotificationContext ref={notificationRef}>
                                {hasNewAlarm ? ( /* 새로운 알림이 있을 경우 메시지 표시 */
                                    <NotificationItem>새로운 알람이 도착했습니다!</NotificationItem>
                                ) : null}
                                {notifications.length === 0 ? (
                                    <NoNotificationText>알림이 없습니다.</NoNotificationText>
                                ) : (
                                    notifications.map(notification => {
                                        let content;

                                        if (authority === '멘토') {
                                            content = (
                                                <div>
                                                    <span>{notification.suggester}님</span>의 '{notification.title}' 에 대한 의뢰 신청입니다.
                                                </div>
                                            );
                                        } else if (authority === '멘티') {
                                            content = (
                                                <div>
                                                    <span>'{notification.suggestionTitle}'</span> 건에 {notification.mentorName}님이 {numberWithCommas(notification.price)}원으로 입찰을 요청했습니다.
                                                </div>  
                                            );
                                        } else {
                                            content = "알림 내용"; // 다른 권한이나 예외 상황에 대한 내용. 필요에 따라 수정
                                        }

                                        const displayContent =
                                            content.length > 20 ? (
                                                <>
                                                {content.substring(0, 20)}...
                                                </>
                                            ) : (
                                                content
                                            );

                                        return (
                                            <NotificationItem key={notification.suggestionIdx} onClick={() => authority === '멘토' ? handleMentorNotificationClick(notification.suggestionIdx) : handleMenteeNotificationClick(notification.bidIdx)}>
                                                <NotificationContainer>
                                                    {displayContent}
                                                </NotificationContainer>
                                            </NotificationItem>
                                        );
                                    })
                                )}
                            </NotificationContext>
                        )}
                    </NotificationWrapper>
                    <Button onClick={handleMyPageClick}>마이페이지</Button>
                    <Button onClick={handleLogout}>로그아웃</Button>
                </>
                ) : (
                <>

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