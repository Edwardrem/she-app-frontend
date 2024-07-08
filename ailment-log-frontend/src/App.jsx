// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import AilmentLog from './components/AilmentLog';
import Incidents from './components/Incidents';
import ProfilePage from './components/ProfilePage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<RegistrationPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/log" element={isLoggedIn ? <AilmentLog /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/incidents" element={isLoggedIn ? <Incidents /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
};

export default App;
