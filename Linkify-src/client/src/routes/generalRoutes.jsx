import React from "react";

import Navbar from "../components/shared/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import Network from "../pages/Network";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import AuthRoutes from "./authRoutes";
import Messages from "../pages/Messages";

function RegularRoutes() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/Network" element={<Network />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </div>
  );
}

export default RegularRoutes;
