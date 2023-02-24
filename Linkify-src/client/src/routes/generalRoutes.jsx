import React from 'react';

import Navbar from '../components/shared/Navbar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Jobs from '../pages/Jobs';
import Network from '../pages/Network';
import Notifications from '../pages/Notifications';
import Profile from '../pages/Profile';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

function RegularRoutes() {
    return(
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/Network" element={<Network />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default RegularRoutes;