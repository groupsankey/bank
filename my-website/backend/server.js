// Run "npm install mysql2" to install the required MySQL package

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'bench_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public', 'index.html'));
});

app.get('/seekBench', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public', 'seekBench.html'));
});

app.get('/addBench', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public', 'addBench.html'));
});

app.post('/add-bench', (req, res) => {
  const { lat, lng, type, place, rating, material } = req.body;
  const query = 'INSERT INTO benches (lat, lng, type, rating, material) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [lat, lng, type, place, rating, material], (err, result) => {
    if (err) throw err;
    res.send('Bench added successfully');
  });
});



app.get('/benches', (req, res) => {
  const query = 'SELECT * FROM benches';
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
