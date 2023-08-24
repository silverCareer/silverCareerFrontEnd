import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

/* Page */
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import MentorSignup from './pages/Signup/MentorSignup';
import MenteeSignup from './pages/Signup/MenteeSignup';
import CategoryHomePage from './pages/Category';
import MyPage from './pages/MyPage'
import AccountEdit from './pages/MyPage/AccountEdit';
import ProductPage from './pages/Product';
import PaymentPage from './pages/Payment';
import ChatPage from './pages/Chat';
import ApplyProductPage from './pages/Product/apply';
import ChargePage from './pages/Charge';
import Request from './pages/Request';
import RequestInfo from './pages/Request/RequestInfo'
import BidList from './pages/Request/BidList';
import BidRequest from './pages/Request/BidRequest';
import PaymentService from './pages/Request/PaymentService'

/* Provider */
import SignupProvider from './hooks/signupContext';
import { LoginProvider } from './hooks/loginContext';
import { MypageProvider } from './hooks/mypageContext';
import ProductProvider from './hooks/productContext';
import ProductDetailProvider from './hooks/productDetailContext';
import { ChatProvider } from './hooks/chatContext';

function App() {
  return (
    <LoginProvider>
      <MypageProvider>
        <ProductProvider>
        <ProductDetailProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup/*" element={<Outlet />}>
              <Route path="" element={<SignupProvider><SignupPage /></SignupProvider>} />
              <Route path="mentor" element={<SignupProvider><MentorSignup /></SignupProvider>} />
              <Route path="mentee" element={<SignupProvider><MenteeSignup /></SignupProvider>} />
            </Route>

            <Route path="/product/*" element={<Outlet />}>
              <Route path=":productIdx" element={<ProductPage />}/>
              <Route path=":productIdx/payment" element={<PaymentPage />}/>
            </Route>

            {/* <Route path="/product/:productIdx" element={<ProductPage />}/> */}
            <Route path="/category/:category" element={<CategoryHomePage />} />
            <Route path="/mypage/*" element={<Outlet />}>
              <Route path="" element={<MyPage />} />
              <Route path="account_edit" element={<AccountEdit />} />
              <Route path="charge" element={<ChargePage />} />
            </Route>
            <Route path="/chatroom" element={<ChatProvider><ChatPage /></ChatProvider>} />
            <Route path="/apply" element={<ApplyProductPage />} />
            <Route path="/request" element={<Request/>} />
            <Route path="/requestInfo" element={<RequestInfo/>} />
            <Route path="/bidList/*" element={<Outlet/>}>
              <Route path="" element={<BidList/>} />
              <Route path="payment" element={<PaymentService/>} />
            </Route>
            <Route path="/bidRequest" element={<BidRequest/>} />
          </Routes>
        </Router>
        </ProductDetailProvider>
        </ProductProvider>
      </MypageProvider>
    </LoginProvider>

  );
}

export default App;