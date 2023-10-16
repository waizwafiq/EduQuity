import React from 'react';
import logo_no_text from '../assets/logo_no_text.png';
import logo_with_text from '../assets/logo_with_text.png';

function Dashboard({ themeStyles }) { // Pass themeStyles as a prop
  return (
    <div className="min-h-screen" style={themeStyles}> {/* Apply theme styles to the outer div */}
      <div className="bg-white ml-3 mr-3 p-6 rounded-lg shadow-lg text-center">
        <img
          src={logo_with_text}
          alt="Logo"
          className="h-48 mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800">EduQuity</h1>
        <p className="text-gray-600 mt-2">Still under construction :c</p>
      </div>
    </div>
  );
}

export default Dashboard;