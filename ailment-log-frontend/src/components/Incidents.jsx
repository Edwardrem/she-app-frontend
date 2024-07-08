// src/components/Incidents.jsx

import React, { useEffect, useState } from 'react';
import { fetchAilments } from '../api';

const Incidents = () => {
  const [ailments, setAilments] = useState([]);

  useEffect(() => {
    const getAilments = async () => {
      try {
        const response = await fetchAilments();
        setAilments(response.data);
      } catch (error) {
        console.error('Fetching ailments failed', error);
      }
    };

    getAilments();
  }, []);

  return (
    <div>
      <h1>Logged Ailments</h1>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Department</th>
            <th>Ailment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {ailments.map((ailment) => (
            <tr key={ailment.id}>
              <td>{ailment.full_name}</td>
              <td>{ailment.department}</td>
              <td>{ailment.ailment}</td>
              <td>{ailment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Incidents;
