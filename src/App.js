import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {
  Login,

  Dashboard, Request, RequestLog,


  _404
} from './pages';

import { ColorContextProvider } from './context/ColorContextProvider';

import {
  Footer,
} from './components';

function App() {
  return (
    <ColorContextProvider>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          
          {/* MAIN TABS */}
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/request" element={<Request />} />
          <Route exact path="/request_log" element={<RequestLog />} />



          {/* 404 PAGE */}
          <Route path="*" element={<_404 />} />
        </Routes>
      </Router>
      <Footer/>
    </ColorContextProvider>
  );
}

export default App;
