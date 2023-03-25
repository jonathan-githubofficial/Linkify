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

import { FaSuitcase, FaComments } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

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

      <div className="lg:hidden md:hidden fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 bottom-0 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <Link to="/" className="inline-flex flex-col items-center justify-center">
            <button data-tooltip-target="tooltip-home" type="button" className="px-5 rounded-l-full group">
              <svg className="w-6 h-6 mb-1 text-black dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="sr-only">Home</span>
            </button>
          </Link>
          <Link to="/messages" className="inline-flex flex-col items-center justify-center">
            <button data-tooltip-target="tooltip-messages" type="button" className="px-5 group">
              <FaComments className="dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 text-[1.2rem]"/>
              <span className="sr-only">Messages</span>
            </button>
          </Link>

          <Link to="/jobs" className="inline-flex flex-col items-center justify-center">
            <button data-tooltip-target="tooltip-jobs" type="button" className="px-5 group">
              <FaSuitcase className="dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 text-[1.2rem]"/>
              <span className="sr-only">Jobs</span>
            </button>
          </Link>

          <Link to="/notifications" className="inline-flex flex-col items-center justify-center">
            <button data-tooltip-target="tooltip-notifications" type="button" className="px-5 group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <span className="sr-only">Notifications</span>
            </button>
          </Link>

          <Link to="/profile" className="inline-flex flex-col items-center justify-center">
            <button data-tooltip-target="tooltip-profile" type="button" className="px-5 rounded-r-full group">
              <svg className="w-6 h-6 mb-1 text-black dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clipRule="evenodd" fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" />
              </svg>
              <span className="sr-only">Profile</span>
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}

export default RegularRoutes;
