import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import MentorSignup from './pages/Signup/MentorSignup';
import SignupProvider from './hooks/signupContext'; // Import the SignupProvider

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={
          <SignupProvider>
            <SignupPage />
          </SignupProvider>
        } />
        <Route path="/signup/mentor" element={
          <SignupProvider>
            <MentorSignup />
          </SignupProvider>
        } />
      </Routes>
    </Router>
  );
}

export default App;