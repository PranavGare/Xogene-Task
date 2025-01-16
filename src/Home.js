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
      const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${query}`);
      const drugs = response.data.drugGroup?.conceptGroup || [];
      const filteredResults = drugs.flatMap(group => group.conceptProperties || []);
      
      if (filteredResults.length === 0) {
        setError('No results found.');
        setResults([]);
      } else {
        setResults(filteredResults);
        setError(null);
      }
    } catch (err) {
      setError('Error searching for drugs. Please try again later.');
      setResults([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchDrugs();
  };

  const goToDetails = (rxcui) => {
    navigate(`/drugs/${rxcui}`);
  };

  return (
    <div className="container">
      <h1>Drug Search Application</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter drug name"
        />
        <button type="submit"> Search </button>
      </form>
      {error && <p className="error">{error}</p>}
      <ul>
        {results.map((drug) => (
          <li key={drug.rxcui} onClick={() => goToDetails(drug.rxcui)}>
            {drug.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
