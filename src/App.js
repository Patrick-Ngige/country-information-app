import React, {useState} from "react";
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(null)

  const handleSearch = async () => {
    if (!searchQuery) return
  }
}