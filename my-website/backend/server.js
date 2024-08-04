const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'your_database_name'  // Replace with your database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// API Endpoint to Get Data
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM example_table';
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch data' });
      return;
    }
    res.json(results);
  });
});

// Serve static files from the "frontend/public" directory
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Default route (serves index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
