import { useEffect, useState } from "react";
import CountriesService from "./services/CountriesService";
import React from "react";
import axios from "axios";
import Country from "./Country";
import SingleCountry from "./SingleCountry";
const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    CountriesService.getAll().then((response) => {
      setCountries(response.data);
      console.log(response.data);
    });
  }, []);

  const countriesToShow = search
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    : countries;

  console.log(countriesToShow);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <h1>Countries App</h1>
      find countries
      <input type="text" value={search} onChange={handleSearch} />
      {countriesToShow.length == 1 ? (
        <SingleCountry country={countriesToShow[0]} />
      ) : countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <ul>
          {countriesToShow.map((country) => (
            <Country country={country} />
          ))}
        </ul>
      )}
    </>
  );
};

export default App;
