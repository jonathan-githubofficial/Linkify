import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import profile_pic from "../../static/images/profile.jpg";
import { FaSuitcase, FaComments } from "react-icons/fa";

import logo from "../../static/images/logo.svg";

function Navbar(props) {
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  var profile = props.profile;
  

  const isLoggedIn = localStorage.getItem("loggedIn");

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="dropdown">
          <Link to="/">
            <img className="h-10" src={logo} alt="Linkify" />
          </Link>
        </div>

        {isLoggedIn ? (
          <>
            <div id="search_bar">
              <div className="navbar-center hidden lg:block">
                <div className="form-control w-[47rem]">
                  <form className="flex items-center">   
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                      </div>
                      <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for people on Linkify..." required />
                    </div>
                    {/* <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      <span className="sr-only">Search</span>
                    </button> */}
                  </form>

                </div>
              </div>
            </div>

            <div className="flex items-center md:order-2" id="profile_dropdown">
              <div className="hidden md:block">
                <Link to="/messages">
                  <div
                    className="mr-2 btn btn-ghost btn-circle"
                    style={{ fontSize: "20px" }}
                  >
                    <FaComments />
                  </div>
                </Link>

                <Link to="/jobs">
                  <div
                    className="mr-2 btn btn-ghost btn-circle"
                    style={{ fontSize: "20px" }}
                  >
                    <FaSuitcase />
                  </div>
                </Link>

                <Link to="/notifications">
                  <div className="dropdown dropdown-end mr-5">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                      <div className="indicator">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                          />
                        </svg>
                        {/* <span className="badge badge-sm indicator-item">6</span> */}
                      </div>
                    </label>
                    <div
                      tabIndex={0}
                      className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
                    ></div>
                  </div>
                </Link>
              </div>

              <button type="button" className="hidden lg:block md:block sm:block flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                <span className="sr-only">Profile</span>
                <img className="w-8 h-8 rounded-full" src={profile_pic} alt="user photo" />
              </button>

              {/* Dropdown menu */}
              <div className="z-50 hidden w-56 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">{profile.name}</span>
                  <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{profile.email}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link to="/profile">
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        Profile
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/events">
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        Events
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/groups">
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        Groups
                      </a>
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <a href="#" onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : null}


      </div>
    </nav>

  );
}

export default Navbar;
