import React, { useState } from 'react';
import api from '../services/api';
import { useHistory } from 'react-router-dom';

const AddClient = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const history = useHistory();

  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      await api.post('/clients', { name, email, phone, address });
      history.push('/clients'); // Redirect to client list after adding a client
    } catch (error) {
      console.error('Failed to add client', error);
    }
  };

  return (
    <div>
      <h2>Add Client</h2>
      <form onSubmit={handleAddClient}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Add Client</button>
      </form>
    </div>
  );
};

export default AddClient;
