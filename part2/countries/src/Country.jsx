import React, { useState } from "react";

const Country = ({ country }) => {
  const [countryFlag, setCountryFlag] = useState(false);
  const handleCountryFlag = () => {
    console.log(countryFlag);
    const inverseCountryFlag = !countryFlag;
    setCountryFlag(inverseCountryFlag);
  };
  return (
    <>
      <li key={country.name.common}>
        {country.name.common}
        <button onClick={() => handleCountryFlag()}>show</button>
        <div>
          {countryFlag ? (
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
            </>
          ) : (
            <></>
          )}
        </div>
      </li>
    </>
  );
};

export default Country;
