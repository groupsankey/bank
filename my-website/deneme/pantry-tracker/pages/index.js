import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box } from '@mui/material';
import { auth, db } from '../lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import PantryList from '../components/PantryList';
import AddItemForm from '../components/AddItemForm';
import Notifications from '../components/Notifications';

export default function Home() {
  const [user, setUser] = useState(null);
  const [pantryItems, setPantryItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const q = query(collection(db, `users/${user.uid}/pantryItems`));
        onSnapshot(q, (snapshot) => {
          const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setPantryItems(items);
        });
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Pantry Tracker
        </Typography>
        <AddItemForm userId={user.uid} />
        <PantryList items={pantryItems} userId={user.uid} />
        <Notifications items={pantryItems} />
      </Box>
    </Container>
  );
}
