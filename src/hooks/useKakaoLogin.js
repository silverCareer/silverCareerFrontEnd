import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { KAKAO_AUTH_URL, sendAuthCodeToBackend } from "../api/kakaoAuth";

const useKakaoLogin = () => {
    const navigate = useNavigate();

    const handleKakaoLogin = useCallback(async () => {
    // 카카오 로그인 페이지로 이동
    const kakaoAuthWindow = window.open(KAKAO_AUTH_URL, "_self");

    kakaoAuthWindow.onbeforeunload = async () => {
        const url = new URL(kakaoAuthWindow.location);
        // authCode(백단에 보내줘야할 authorization code)
        const authCode = url.searchParams.get("code");
        console.log(authCode)

        if (authCode) {
            try {
            const response = await sendAuthCodeToBackend(authCode);

            // 백엔드에서 전달 받은 액세스 토큰을 로컬 스토리지에 저장
            localStorage.setItem('accessToken', response.data.accessToken);

            // 홈페이지로 이동
            navigate("/");
            } catch (error) {
            console.error("카카오 로그인 실패", error);
            }
        }
        };
    }, [navigate]);

    return handleKakaoLogin;
};

export default useKakaoLogin;