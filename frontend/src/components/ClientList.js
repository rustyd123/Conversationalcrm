import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get('/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Failed to fetch clients', error);
      }
    };
    fetchClients();
  }, []);

  return (
    <div>
      <h2>Client List</h2>
      <Link to="/add-client">Add Client</Link>
      <ul>
        {clients.map((client) => (
          <li key={client._id}>
            {client.name} - {client.email} - {client.phone} - {client.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
