// Mobile sidebar
// Author: Khalid Sadat
// Date created: March 2, 2023
// Description: for mobile sidebar

import React from "react";
import profile_pic from "../../static/images/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import { RiCalendarEventFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import { GrGroup } from 'react-icons/gr';
import { AiOutlineLogout } from 'react-icons/ai';

export default function MobileSidebar() {

  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <div id="drawer-navigation" className="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800" tabIndex={-1} aria-labelledby="drawer-navigation-label">
      
      <img src={profile_pic} alt="User profile" className="w-12 h-12 rounded-full" />
      <div className="text-[1.2rem] font-extrabold mt-2">
        Khalid Sadat
      </div>
      <div className="text-md">
        Software Engineer
      </div>
      
      <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        <span className="sr-only">Close menu</span>
      </button>

      <div className="py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <Link to="/profile">
              <span className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <FaUser />
                <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/events/myevents">
              <span className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <RiCalendarEventFill />
                <span className="flex-1 ml-3 whitespace-nowrap">My Events</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/groups">
              <span className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <GrGroup />
                <span className="flex-1 ml-3 whitespace-nowrap">My Groups</span>
              </span>
            </Link>
          </li>
          <hr />
          <li>
            <span onClick={logout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <AiOutlineLogout />
              <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
            </span>
          </li>
        </ul>
      </div>
    </div>  
  )
}



