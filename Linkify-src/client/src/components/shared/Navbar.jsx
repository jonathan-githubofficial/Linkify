import React from "react";
import {Link} from 'react-router-dom';

import profile_pic from '../../static/images/profile.jpg'
import { FaSuitcase } from 'react-icons/fa';

import logo from '../../static/images/logo.svg'


function DaisyNavbar() {
    return (
        <div className="navbar bg-base-100 shadow-md pt-2 px-10 flex bg-transparent">            
            <div className="navbar-start">
                <div className="dropdown">
                    <Link to="/">
                        <img
                            className="h-10"
                            src={logo}
                            alt="Linkify"
                        />
                    </Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:block">
                <div className="form-control w-[47rem]">
                    <input type="text" placeholder="Search Linkify..." className="input input-bordered" />
                </div>
            </div>
            <div className="navbar-end">
                <Link to="/jobs">
                    <div className="mr-2 btn btn-ghost btn-circle" style={{fontSize: "20px"}}>
                        <FaSuitcase />
                    </div>
                </Link>

                <Link to="/notifications">
                    <div className="dropdown dropdown-end mr-5">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                                <span className="badge badge-sm indicator-item">6</span>
                            </div>
                        </label>
                        <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">                      
                        </div>
                    </div>
                </Link>
                
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={profile_pic} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <Link to="/profile">
                            <li>
                                <a className="justify-between">
                                    Profile
                                </a>
                            </li>
                        </Link>
                        <li><a>Settings</a></li>
                        <Link to="/login">
                            <li><a>Logout</a></li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}
    
export default DaisyNavbar;