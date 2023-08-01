import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
        <h1>홈페이지</h1>
        <Link to="/login">로그인</Link>
        </div>
    );
}

export default Home;