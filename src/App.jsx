import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
// import SendSMS from './components/SendSMS';
// import Profile from './components/Profile';
// import Home from './components/Home';
import Login from './components/Login';
import Layout from './components/Layout/Layout';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            {/* <Route path="home" element={<Home />} /> */}
            {/* <Route path="send-sms" element={<SendSMS />} /> */}
            {/* <Route path="profile" element={<Profile />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}
