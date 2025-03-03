import { useState, useEffect } from "react";
import Filtering from "./components/Filtering";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import PersonsService from "./services/persons";
import Notification from "./components/Notification";
import ErrorMessage from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      };
      PersonsService.create(newperson)
        .then((response) => {
          setMessage(`added ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
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
        PersonsService.update(id, changedPerson)
          .then((returnedPerson) => {
            console.log(returnedPerson);
            setPersons(
              persons.map((person) =>
                person.id == id ? returnedPerson.data : person
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.log("object", error.message);
            setErrorMessage(error.response.data.error);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
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
      <Notification message={message} />
      <ErrorMessage message={errorMessage} />
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
