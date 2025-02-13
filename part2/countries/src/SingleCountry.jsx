import axios from "axios";
import React, { useEffect, useState } from "react";

const SingleCountry = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const Api_key = import.meta.env.VITE_API_KEY;
  console.log(Api_key);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${Api_key}`
        )
        .then((response) => {
          setWeather(response.data);
          console.log(response.data);
        });
    };
    fetchData();
  }, []);

  
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <ul>
        {Object.entries(country.languages).map(([code, name]) => (
          <li key={code}>{name}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />

      <h2>Weather in {country.capital[0]}</h2>
      {weather ? (
        <>
          <p>temperature {weather.main.temp - 273.15} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="icon"
          />
          <p>Wind : {weather.wind.speed} m/s</p>{" "}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SingleCountry;
