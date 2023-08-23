import React, { useState } from "react";
import "./index.css";
import axios from 'axios';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery) return;

    try{
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${searchQuery}`
    );
    const data = response.data;

    if (data.length > 0) {
      setResults(data)
    }else{
      setResults([])
    } 
    } catch (error) {
      console.error('error fetching data:', error)
      setResults([])
    }
  }

  const CountryDetails = ({country}) => {
    const languages = Object.values(country.languages).join(',')

      return(
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
          {results.length === 1 && <CountryDetails country={country} />}
        </div>
      ))}
      </div>
    </div>
  );
};

export default App;
