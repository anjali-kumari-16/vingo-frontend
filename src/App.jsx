import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Nav from './components/Nav.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIns.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Home from './pages/Home.jsx';
import useGetCurrentUser from './hooks/useGetCurrentUser.jsx';
import useGetCity from './hooks/useGetCity.jsx';

function App() {
  useGetCurrentUser();
  useGetCity();
  const { userData } = useSelector(state => state.user);

  return (
    <div className="w-full min-h-screen m-0 p-0 overflow-x-hidden">
      {userData && <Nav />}
      <div className={userData ? 'pt-[80px]' : ''}>
        <Routes>
          <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/" />} />
          <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to="/" />} />
          <Route path="/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to="/" />} />
          <Route path="/" element={userData ? <Home /> : <Navigate to="/signin" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
