import { useState, useEffect } from "react";
import Filtering from "./components/Filtering";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import PersonsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    PersonsService.getAll().then((response) => setPersons(response.data));
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
    const index = persons.findIndex((item) => item.name == newName);

    if (persons.findIndex((item) => item.name == newName) == -1) {
      const newperson = {
        name: newName,
        number: newNumber,
        id: `${persons.length + 1}`,
      };
      PersonsService.create(newperson).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    } else {
      const id = persons[index].id;
      const person = persons.find((n) => n.id == id);
      const changedPerson = { ...person, number: newNumber };
      if (
        confirm(
          `${newName} already added to phonebook, replace the old number with the new one?`
        )
      ) {
        PersonsService.update(id, changedPerson).then((returnedPerson) => {
          console.log(returnedPerson);
          setPersons(
            persons.map((person) =>
              person.id == id ? returnedPerson.data : person
            )
          );
          setNewName("");
          setNewNumber("");
        });
      }
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
        persons={persons}
        setPersons={setPersons}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        setPersons={setPersons}
        persons={persons}
      />
    </div>
  );
};

export default App;
