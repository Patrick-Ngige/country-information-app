import React, {useState} from "react";
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(null)

  const handleSearch = async () => {
    if (!searchQuery) return

    const response = await fetch(`https://restcountries.com/v3.1/name/${searchQuery}`)
    const data = await response.json()

    if(data.length > 0) {
      setResults(
        <p>Too many matches. Please make your query more specific.</p>
      )
    }
  }
}