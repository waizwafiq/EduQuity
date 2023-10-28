import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import {
  Login,

  Dashboard, Request, RequestLog,


  _404
} from './pages';

import { ColorContextProvider } from './context/ColorContextProvider';
import supabaseClient from './pages/utils/supabase';

import {
  Footer,
} from './components';
import { SessionContextProvider } from './context/SessionContextProvider';

function App() {
  const [session, setSession] = React.useState(null);

  useEffect(() => {
    if(!session){
      supabaseClient.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
  
      const {
        data: { subscription },
      } = supabaseClient.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
  
      return () => subscription.unsubscribe()
    }
  }, [])
    console.log(session)
  
  
  return session ?(
    <SessionContextProvider>
      <ColorContextProvider>
        <Router>
          <Routes>
            
            {/* MAIN TABS */}
            <Route exact path="/" element={<Dashboard />}  />
            <Route exact path="/request" element={<Request />} />
            <Route exact path="/request_log" element={<RequestLog />} />
  
  
  
            {/* 404 PAGE */}
            <Route path="*" element={<_404 />} />
          </Routes>
        </Router>
        <Footer/>
      </ColorContextProvider>
    </SessionContextProvider>
  ):(<ColorContextProvider>
    <Login />
   </ColorContextProvider>)

  
}

export default App;
