import React from 'react';

import Navbar from '../components/shared/Navbar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Jobs from '../pages/Jobs';
import Profile from '../pages/Profile';
import AuthRoutes from './authRoutes';

function RegularRoutes() {
    return(
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
}

export default RegularRoutes;