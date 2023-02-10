import React from "react";
import {Link} from 'react-router-dom';

function Button({text, bg, padding}) {
  return (
    <div>
      <button
        className={`
          ${padding || 'px-6 py-2'} text-sm font-semibold uppercase 
          rounded-sm text-white transition ${bg}`}
      >
        <span>{text}</span>
      </button>
    </div>
  );
}


function Navbar() {
  return (
    <div className="fixed left-0 right-0 top-0 h-16 shadow-md border-b-2 border-gray-100 bg-gray-900">
      <nav className="flex items-center container mx-auto h-full justify-between">
        <Link to="/">
          <h1 className="font-semibold uppercase text-lg text-gray-200">
            <img
                className="mx-auto h-7 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Linkify"
            />
            Linkify
          </h1>
        </Link>
        <div>
          <ul className="flex items-center space-x-10 text-sm">
            <li><Link to="/" className="text-gray-400 hover:text-gray-100">Home</Link></li>
            <li><Link to="/jobs" className="text-gray-400 hover:text-gray-100">Jobs</Link></li>
            <li><Link to="/Profile" className="text-gray-400 hover:text-gray-100">Profile</Link></li>
          </ul>
        </div>
        <div>
          <Link to="/login" className="button">
            <Button text="Login" bg="bg-gradient-to-r from-purple-500 to-blue-500"></Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;