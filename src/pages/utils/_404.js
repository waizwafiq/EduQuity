import React from 'react';

function _404({ themeStyles }) {
  return (
    <div className="min-h-screen flex justify-center items-center" style={themeStyles}>
      <h1 className="text-center text-red-600 text-xl font-bold">404 Error: Page Not Found!</h1>
    </div>
  );
}

export default _404;