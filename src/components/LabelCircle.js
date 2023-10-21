import React from "react";

function LabelCircle({ color }) {
  const circleStyle = {
    width: 15,
    height: 15,
    borderRadius: "50%",
    backgroundColor: color,
  };

  return <div style={circleStyle} />;
}

export default LabelCircle;
