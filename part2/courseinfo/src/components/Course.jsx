import React from "react";
import Header from "./Header";
import Content from "./Content";
import Part from "./Part";
const Course = ({ course }) => {
  console.log(course);
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

export default Course;
