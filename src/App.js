import React, { useEffect, useState } from "react";
import "./index.css";
import axios from 'axios';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [weather, setWeather] = useState(null);

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
    
    useEffect(() => {
      async function fetchWeather() {
        try {
          const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
            params: {
              q: country.capital,
              limit: 5,
              appid: '7dbabaa47da382174b2dc3bdeb1dc253',
              units: 'metric'
            },
          })

          setWeather(response.data)
        }catch (error) {
          console.error('Error fetching weather data:', error)
        }
      }
      fetchWeather()
    }, [country.capital])

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
          {weather && (
            <div>
              <h3>Weather in {country.capital}</h3>
              <p>Temperature: {weather.main.temp} degrees</p>
              <p>Weather:{weather.weather[0].description}</p>
              <p>Humidity: {weather.main.humidity}%</p>
            </div>
          )}
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
