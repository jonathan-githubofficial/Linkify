import React from 'react';
import Navbar from './components/Navbar';
import DaisyNavbar from './components/DaisyNavbar';
import NewNavbar from './components/NewNavbar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Profile from './pages/Profile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Router>
    <div>
      <DaisyNavbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
