import { useState, useEffect } from "react";
import Filtering from "./components/Filtering";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("Ready");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.findIndex((item) => item.name == newName) == -1) {
      const newperson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newperson));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} already added to phonebook`);
    }
  };

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;
  return (
    <div>
      <h2>Phonebook</h2>

      <Filtering filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
