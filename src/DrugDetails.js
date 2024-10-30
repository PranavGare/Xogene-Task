import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DrugDetails() {
  const { id } = useParams();
  const [drug, setDrug] = useState(null);

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        const response = await axios.get(`https://api.fda.gov/drug/event.json?search=_id:${id}`);
        setDrug(response.data.results[0]);
      } catch (err) {
        console.error('Error fetching drug details:', err);
      }
    };
    fetchDrugDetails();
  }, [id]);

  if (!drug) return <p>Loading...</p>;

  return (
    <div>
      <h2>{drug.patient.drug[0].medicinalproduct}</h2>
      <p><strong>Reaction:</strong> {drug.patient.reaction[0].reactionmeddrapt}</p>
      <p><strong>Drug Start Date:</strong> {drug.patient.drug[0].drugstartdate}</p>
      <p><strong>Indication:</strong> {drug.patient.drug[0].drugindication}</p>
    </div>
  );
}

export default DrugDetails;