import React from 'react'; // Import the React library
import './static/css/index.css'; // Import the CSS for the app
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import routing components from react-router-dom
import { useEffect, useState } from "react"; // Import useEffect and useState hooks from React
import axios from "axios"; // Import the axios library for making API calls
import Home from "./pages/home"; // Import the Home component
import Login from "./pages/auth/Login"; // Import the Login component
import Register from "./pages/auth/Register"; // Import the Register component


import RegularRoutes from './routes/generalRoutes'; // Import RegularRoutes

function App() {
  const [user, setUser] = useState(null); // Initialize state for the user to null

  // Function to get the user
  const getUser = async () => {
    try {
      const url = `${process.env.linkify_API_URL}/auth/login/success`; // The URL to send the request to
      const { data } = await axios.get(url, { withCredentials: true }); // Make a GET request with Axios
      setUser(data.user._json); // Set the user state to the response data
    } catch (err) {
      console.log(err); // Log any errors
    }
  };
  
  // Call the getUser function when the component is mounted
  useEffect(() => {
    getUser(); 
  }, []);

  let res = "reg"; // Declare a variable called res and assign it the value "reg"

  // Return the main component with routing set up
  return (
    <div className="container">
      <Router>
        <Routes>
          {/* Home route - if user is logged in, render the Home component with user prop, otherwise navigate to Login */}
          <Route exact path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
          {/* Login route - if user is logged in, navigate to Home, otherwise render the Login component */}
          <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          {/* Register route - if user is logged in, navigate to Home, otherwise render the Register component */}
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App; // Export the App component
