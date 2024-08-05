const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "frontend/public" directory
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
