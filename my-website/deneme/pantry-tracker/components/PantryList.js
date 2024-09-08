import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../lib/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

export default function PantryList({ items, userId }) {
  const deleteItem = async (itemId) => {
    await deleteDoc(doc(db, `users/${userId}/pantryItems`, itemId));
  };

  return (
    <List>
      {items.map((item) => (
        <ListItem
          key={item.id}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item.id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText
            primary={item.name}
            secondary={`Quantity: ${item.quantity}`}
          />
        </ListItem>
      ))}
    </List>
  );
}
