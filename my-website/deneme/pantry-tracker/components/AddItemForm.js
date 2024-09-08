import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddItemForm({ userId }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `users/${userId}/pantryItems`), {
      name,
      quantity: parseInt(quantity),
    });
    setName('');
    setQuantity('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        label="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        sx={{ mr: 1 }}
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
        sx={{ mr: 1 }}
      />
      <Button type="submit" variant="contained">Add Item</Button>
    </Box>
  );
}
