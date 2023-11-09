import React from "react";

import { useColorContext } from "../context/ColorContextProvider";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

function PercentLabel({ number }) {
  const colors = useColorContext();
  return (
    <div
      className="flex items-center justify-center rounded-2xl text-white"
      style={{
        height: "fit-content(20em)",
        backgroundColor: colors.PercentLabelGreen,
      }}
    >
      <div className="mr-1 font-semibold py-0 text-lg">{number}</div>
      <FiArrowUpRight size={20} />
    </div>
  );
}

function PercentLabelDown({ number }) {
  const colors = useColorContext();
  return (
    <div
      className="flex items-center justify-center rounded-2xl text-white"
      style={{
        height: "fit-content(20em)",
        backgroundColor: colors.PercentLabelRed,
      }}
    >
      <div className="mr-1 font-semibold py-0 text-lg">{number}</div>
      <FiArrowDownRight size={20} />
    </div>
  );
}

function ResourceCard({ icon, iconTitle, width, current, required}) {
  const colors = useColorContext();
  return (
    <div className="grid grid-cols-2 h-full ">
      <div className="flex flex-col justify-center items-center">
        <img className="" src={icon} alt="Logo" width={width} height="auto" />
        <div className="font-semibold mt-2">{iconTitle}</div>
      </div>
      <div className="h-full  grid grid-rows-2 items-center justify-start">
        <div className="flex flex-col items-center justify-start">
          <div className="font-bold text-sm" style={{ color: colors.FontGrey }}>
            CURRENT RESOURCES
            <div className="font-extrabold text-6xl text-neutral-900">{current}</div>
          </div>
          
        </div>
        <div className="flex flex-col items-center justify-start">
          <div className="font-bold text-sm" style={{ color: colors.FontGrey }}>
            REQUIRED RESOURCES
            <div className="font-extrabold text-6xl text-neutral-900">{required}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;
