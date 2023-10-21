// ColorContextProvider.js
import React, { createContext, useContext, useState } from "react";

const ColorContext = createContext();

export function useColorContext() {
  return useContext(ColorContext);
}

export function ColorContextProvider({ children }) {
  const colors = {
    BGBlue: "#6259CA",
    BGBlueSoft: "#C8C4EC",
    BGGrey: "#EAEDF7",
    GreyFont: "#8F8FB1",
    BGCardGrey: "#D9D9D9",
    FontGrey: "#686E7B",
    FontGreen: "#19B15E",
    PieBlue: "#6259CA",
    PieBabyBlue: "#53CAED",
    PieLightBlue: "#01B4F9",
    PieRed: "#F26A73",
    PieGreen: "#25CEBC",
    PercentLabelGreen: "#00b294",
    PercentLabelRed: "#da3801",
    BGDarkerGrey: "#E1DFF6",
    // Add more color values as needed
  };

  return (
    <ColorContext.Provider value={colors}>{children}</ColorContext.Provider>
  );
}
