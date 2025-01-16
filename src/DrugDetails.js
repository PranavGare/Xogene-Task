import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DrugDetails() {
  const { id } = useParams();
  const [drug, setDrug] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${id}/properties.json`);
        const drugData = response.data.properties;
        
        if (drugData) {
          setDrug(drugData);
          setError(null);
        } else {
          setError('No drug details found.');
        }
      } catch (err) {
        setError('Error fetching drug details. Please try again later.');
        console.error('Error fetching drug details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrugDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container details">
      <h2>{drug?.name || 'Drug Name Not Available'}</h2>
      <p><strong>Synonym:</strong> {drug?.synonym || 'N/A'}</p>
      <p><strong>RxCUI:</strong> {drug?.rxcui || 'N/A'}</p>
      <p><strong>TTY (Type):</strong> {drug?.tty || 'N/A'}</p>
    </div>
  );
}

export default DrugDetails;
