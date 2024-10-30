import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const searchDrugs = async () => {
    try {
      const response = await axios.get(`https://api.fda.gov/drug/event.json?search=${query}`);
      setResults(response.data.results);
      setError(null);
    } catch (err) {
      setError('No results found for this term.');
      setResults([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchDrugs();
  };

  const goToDetails = (id) => {
    navigate(`/drugs/${id}`);
  };

  return (
    <div>
      <h1>Drug Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by drug name..."
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      <ul>
        {results.map((drug) => (
          <li key={drug.id} onClick={() => goToDetails(drug.id)}>
            {drug.patient.drug[0].medicinalproduct}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;