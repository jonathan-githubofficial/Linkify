import React from 'react';

import './static/css/index.css'

import DaisyNavbar from './components/shared/DaisyNavbar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Profile from './pages/Profile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <Router>
    <div className='root-bg'>
      <DaisyNavbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
