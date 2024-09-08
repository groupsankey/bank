import { Typography } from '@mui/material';

export default function Notifications({ items }) {
  const lowStockItems = items.filter(item => item.quantity <= 3);

  if (lowStockItems.length === 0) {
    return null;
  }

  return (
    <Typography color="error">
      You have {lowStockItems.length} items with low stock!
    </Typography>
  );
}
