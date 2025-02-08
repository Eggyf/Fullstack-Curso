import React, { useState } from "react";
import Part from "./Part";
const Content = ({ parts }) => {
  const total = parts.reduce((acumulator, currentValue) => {
    return acumulator + currentValue.exercises;
  }, 0);
  return (
    <>
      {parts.map((part) => (
        <Part part={part.name} exercise={part.exercises} />
      ))}

      <strong> total exercise {total}</strong>
    </>
  );
};

export default Content;
