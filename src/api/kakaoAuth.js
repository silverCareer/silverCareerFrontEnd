import axios from 'axios';

export const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize?client_id={3fc7941e2346eb6d089f1032ffe4c40b}&redirect_uri={http://localhost:9000/api/kakao}&response_type=code";

export const sendAuthCodeToBackend = (authCode) => {
    return axios.post('http://your-backend-url/token', {
        code: authCode
    });
};


// rest api : 3fc7941e2346eb6d089f1032ffe4c40b
// redirect : http://localhost:9000/api/kakao

// http://localhost:9000/api/kakao?code=qX4V4X8vXYfLK09-xKHl7uy1jXlRdSwSvzuFmr4OyX9F5dFtaNyTK-f2xOt34bkdN7pzygoqJU4AAAGJlOV9XQ
// 위에를 보내줘야 함! -> 이게 authCode여야함