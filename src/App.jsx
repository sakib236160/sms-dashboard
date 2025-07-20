import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Home from './components/Home';
import Login from './components/Login';
import Layout from './components/Layout/Layout';
import ClientList from './components/ClientList';
import ManageClient from './components/ManageClient';

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
            <Route path="home" element={<Home />} />
            <Route path="manageClient" element={<ManageClient />} />
            <Route path="client" element={<ClientList />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
