import React from "react";
import "./Die.css";
function Die({ value, isHeld, holdDice }) {
  return (
    <h1
      onClick={holdDice}
      style={
        isHeld ? { backgroundColor: "#59E391" } : { backgroundColor: "white" }
      }
      className="die"
    >
      {value}
    </h1>
  );
}

export default Die;
