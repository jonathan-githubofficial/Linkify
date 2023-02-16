import React from 'react';

import './static/css/index.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegularRoutes from './routes/generalRoutes';
import AuthRoutes from './routes/authRoutes';



function App() {
  let res = "reg";

  if (res == "reg") {
    return (
      <Router>
          <RegularRoutes />
      </Router>
    )
  }
  else {
    return (
      <div className='root-bg'>
        <Router>
          <AuthRoutes />
        </Router>
      </div>
    )
  }
}

export default App

