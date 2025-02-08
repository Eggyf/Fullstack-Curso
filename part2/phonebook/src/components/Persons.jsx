import React from "react";

const Persons = ({ personsToShow }) => {
  return (
    <div>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;
