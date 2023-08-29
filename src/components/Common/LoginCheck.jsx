import React, { useContext, useEffect } from 'react';
import { LoginContext } from '../../hooks/loginContext';
import { getMyProfile } from '../../api/mypage/mypage';

export default function LoginCheckFunction({ setIsLoggedIn }) {
    const { loginForm, setLoginForm } = useContext(LoginContext); 
    
    //로그인 확인여부
    useEffect(() => {
        const checkLoginStatus = async () => {
            const userIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check local storage for login status
            setIsLoggedIn(userIsLoggedIn);
            
            if (userIsLoggedIn) {
                const data = await getMyProfile();
                const newLoginForm = { ...loginForm, 
                    authority: localStorage.getItem('authority'),
                    name: data.name,
                    balance: data.balance
                };
                setLoginForm(newLoginForm);
            }
        };

        checkLoginStatus(); // Call the function when the component mounts
    }, []);
}
