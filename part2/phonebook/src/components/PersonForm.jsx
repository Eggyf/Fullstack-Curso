import React from "react";
import PersonsService from "../services/persons";
const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  persons,
  setPersons,
}) => {
  const handleUpdate = (name, number) => {
    console.log(persons);
  };
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button
            type="submit"
            onClick={() => handleUpdate(newName, newNumber)}
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
