// backend/index.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 4242;
const FILE = './leaderboard.json';

app.use(cors());
app.use(express.json());

// Highscore abrufen
app.get('/leaderboard', (req, res) => {
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, '[]');
  const data = JSON.parse(fs.readFileSync(FILE));
  res.json(data);
});

// Highscore speichern
app.post('/leaderboard', (req, res) => {
  const { name, score } = req.body;
  if (!name || typeof score !== 'number') return res.status(400).json({ error: 'Invalid input.' });
  let data = [];
  if (fs.existsSync(FILE)) {
    data = JSON.parse(fs.readFileSync(FILE));
  }
  data.push({ name, score });
  data = data.sort((a, b) => b.score - a.score).slice(0, 10);
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  res.json(data);
});

app.listen(PORT, () => console.log(`Leaderboard backend running on port ${PORT}`));

