import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {
  Login,
  
  Dashboard,


  _404
} from './pages';

function App() {
  return (
    <Router>
      <Routes>
        {/* MAIN TABS */}
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />


        {/* 404 PAGE */}
        <Route path="*" element={<_404 />} />
      </Routes>
    </Router>
  );
}

export default App;
