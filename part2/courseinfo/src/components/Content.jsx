import React, { useState } from "react";
import Part from "./Part";
const Content = ({ parts }) => {
  const total = parts.reduce((acumulator, currentValue) => {
    return acumulator + currentValue.exercises;
  }, 0);
  return (
    <>
      <Part part={parts[0].name} exercise={parts[0].exercises} />
      <Part part={parts[1].name} exercise={parts[1].exercises} />
      <Part part={parts[2].name} exercise={parts[2].exercises} />
      <strong> total exercise {total}</strong>
    </>
  );
};

export default Content;
