import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import MentorSignup from './pages/Signup/MentorSignup';
import MenteeSignup from './pages/Signup/MenteeSignup';
import SignupProvider from './hooks/signupContext';
import { LoginProvider } from './hooks/loginContext';
import CategoryHomePage from './pages/Category';
import MyPage from './pages/MyPage'
import { MypageProvider } from './hooks/mypageContext';
import AccountEdit from './pages/MyPage/AccountEdit';
import ChatPage from './pages/Chat';

function App() {
  return (
    <LoginProvider>
      <MypageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupProvider><SignupPage /></SignupProvider>} />
            <Route path="/signup/mentor" element={<SignupProvider><MentorSignup /></SignupProvider>} />
            <Route path="/signup/mentee" element={<SignupProvider><MenteeSignup /></SignupProvider>} />
            <Route path="/category" element={<CategoryHomePage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/account_edit" element={<AccountEdit />} />
            <Route path="/chatroom" element={<ChatPage />} />
          </Routes>
        </Router>
      </MypageProvider>
    </LoginProvider>

  );
}

export default App;