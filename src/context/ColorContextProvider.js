// ColorContextProvider.js
import React, { createContext, useContext, useState } from 'react';

const ColorContext = createContext();

export function useColorContext() {
  return useContext(ColorContext);
}

export function ColorContextProvider({ children }) {
  const colors = {
    BGBlue: '#6259CA',
    BGBlueSoft: '#C8C4EC',
    BGGrey: '#EAEDF7',
    GreyFont: '#8F8FB1',
    BGCardGrey: '#D9D9D9',
    // Add more color values as needed
  };

  return (
    <ColorContext.Provider value={colors}>
      {children}
    </ColorContext.Provider>
  );
}
