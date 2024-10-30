import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import DrugDetails from './DrugDetails';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drugs/:id" element={<DrugDetails />} />
      </Routes>
    </Router>
  );
}

export default App;