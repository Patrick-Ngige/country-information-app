import React, { useState } from "react";
import "./index.css";
import axios from 'axios';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery) return;

    try{
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${searchQuery}`
    );
    const data = response.data;

    if (data.length > 0) {
      setResults(
        <p>Too many matches. Please make your query more specific.</p>
      );
    } else if (data.length > 1) {
      const countriesList = data
        .map((country) => country.name.common)
        .join(",");
      setResults(<p>Matching countries: {countriesList}</p>);
    } else if (data.length === 1) {
      const country = data[0];
      const languages = Object.values(country.languages).join(",");

      setResults(
        <div>
          <h2>{country.name.common}</h2>
          <p>Area: {country.area} km^2</p>
          <p>Capital: {country.capital} </p>
          <p>Languages: {languages}</p>
          <img
            src={country.flags.png}
            alt={`${country.name.common} Flags`}
            width="150"
          />
        </div>
      );
    } else {
      setResults(<p>No matching countries found.</p>);
    }
  };

  return (
    <div className="App">
      <h1>Country Information App</h1>
      <input
        type="text"
        placeholder="Search for a country"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div className="results">{results.map((country, index) => (
        <div key={index}>
          <p>{country.name.common}
          <button onClick={() => setResults([country])}>Show</button>
          </p>
          {results.length === 1 && <CountryDetail country={country} />}
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;
