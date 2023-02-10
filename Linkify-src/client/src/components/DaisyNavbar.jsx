import React from "react";
import {Link} from 'react-router-dom';

import profile_pic from '../static/images/profile.jpg'
import { BsHandbag } from 'react-icons/bs';


function DaisyNavbar() {
    return (
        <div className="navbar bg-base-100 shadow-md pt-2 px-10 mb-5 flex">            
            <div className="navbar-start">
                <div className="dropdown">
                    <Link to="/">
                        <h1 className="font-semibold uppercase text-lg text-gray-200">
                            <img
                                className="mx-auto h-7 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Linkify"
                            />
                            <span className="text-black"> 
                                Linkify
                            </span>
                        </h1>
                    </Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:block">
                <div className="form-control w-96">
                    <input type="text" placeholder="Search Linkify..." className="input input-bordered" />
                </div>
            </div>
            <div className="navbar-end">
                <Link to="/jobs">
                    <div className="mr-2 btn btn-ghost btn-circle" style={{fontSize: "20px"}}>
                        <BsHandbag />
                    </div>
                </Link>
                <div className="dropdown dropdown-end mr-5">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </label>
                    <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div>
                </div>
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