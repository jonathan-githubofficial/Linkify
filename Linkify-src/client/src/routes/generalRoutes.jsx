import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/shared/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import Network from "../pages/Network";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import AuthRoutes from "./authRoutes";
import Messages from "../pages/Messages";
import Events from "../pages/Events";
import EventView from "../components/events/EventView";
import Groups from "../pages/Groups";
import GroupView from "../components/groups/GroupView";

function RegularRoutes() {

  const [profile, setProfile] = useState([])

  var email_s = '';
  email_s = localStorage.getItem("email");
  const getUser = async () => {
      axios.get('/api/account/userbymail?', {
          params: {email: email_s}
      })
      .then(res => {
          setProfile(res.data)
      }).catch(err => {
          console.log(err)
      })
  }
  useEffect (() => {
      getUser();
  }, [])
    
  return (
    <div>
      <Navbar profile={profile} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/Network" element={<Network />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:eventId" element={<EventView />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/group/:groupId" element={<GroupView />} />

      </Routes>
    </div>
  );
}

export default RegularRoutes;
