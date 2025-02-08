import React from "react";
import PersonsService from "../services/persons";
const Persons = ({ personsToShow, setPersons, persons }) => {
  const handleDelete = (id, name) => {
    if (confirm(`Delete ${name}`)) {
      console.log("confirmed");
      PersonsService.deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
    } else {
      console.log("canceled");
    }
  };
  return (
    <>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Persons;
