import React, { useState } from "react";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery) return;

    const response = await fetch(
      `https://restcountries.com/v3.1/name/${searchQuery}`
    );
    const data = await response.json();

    if (data.length > 10) {
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
          <p>Capital: {country.area} km^2</p>
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
      <div className="results">{results}</div>
    </div>
  );
}

export default App;
