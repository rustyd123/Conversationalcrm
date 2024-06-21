import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useHistory, useParams } from 'react-router-dom';

const EditClient = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await api.get(`/clients/${id}`);
        const { name, email, phone, address } = response.data;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
      } catch (error) {
        console.error('Failed to fetch client', error);
      }
    };
    fetchClient();
  }, [id]);

  const handleEditClient = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/clients/${id}`, { name, email, phone, address });
      history.push('/clients'); // Redirect to client list after editing a client
    } catch (error) {
      console.error('Failed to edit client', error);
    }
  };

  return (
    <div>
      <h2>Edit Client</h2>
      <form onSubmit={handleEditClient}>
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
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditClient;
