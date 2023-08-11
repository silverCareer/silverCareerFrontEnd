import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
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
import ProductPage from './pages/Product';
import ChatPage from './pages/Chat';

function App() {
  return (
    <LoginProvider>
      <MypageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup/*" element={<Outlet />}>
              <Route path="" element={<SignupProvider><SignupPage /></SignupProvider>} />
              <Route path="mentor" element={<SignupProvider><MentorSignup /></SignupProvider>} />
              <Route path="mentee" element={<SignupProvider><MenteeSignup /></SignupProvider>} />
            </Route>              
            <Route path="/product" element={<ProductPage />}/>
            <Route path="/category" element={<CategoryHomePage />} />
            <Route path="/mypage/*" element={<Outlet />}>
              <Route path="" element={<MyPage />} />
              <Route path="account_edit" element={<AccountEdit />} />
            </Route>
            <Route path="/chatroom" element={<ChatPage />} />
          </Routes>
        </Router>
      </MypageProvider>
    </LoginProvider>

  );
}

export default App;