const express = require('express');
const cors = require('cors');
const { createClient } = require('redis');

const app = express();
const PORT = process.env.PORT || 3000;

// Verbinde mit Render Key Value Store (REDIS_URL ist als Umgebungsvariable gesetzt!)
const client = createClient({ url: process.env.redis://red-d050g0euk2gs73e4hqeg:6379 });
client.connect();

app.use(cors());
app.use(express.json());

// === Leaderboard-Endpunkte ===

// Highscore abrufen
app.get('/leaderboard', async (req, res) => {
  let data = await client.get("leaderboard");
  if (!data) data = "[]";
  res.json(JSON.parse(data));
});

// Highscore speichern
app.post('/leaderboard', async (req, res) => {
  const { name, score } = req.body;
  if (!name || typeof score !== "number") return res.status(400).json({ error: "Invalid input." });

  let data = await client.get("leaderboard");
  data = data ? JSON.parse(data) : [];
  data.push({ name, score });
  data = data.sort((a, b) => b.score - a.score).slice(0, 10);
  await client.set("leaderboard", JSON.stringify(data));
  res.json(data);
});

// Beispielroute für Produkte (bleibt erhalten)
app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: "Blütenhonig", preis: 8, bild: "/src/assets/Blütenhonig.png" },
    { id: 2, name: "Waldhonig", preis: 9, bild: "/src/assets/Waldhonig.png" }
  ]);
});

app.listen(PORT, () => {
  console.log(`Backend läuft auf Port ${PORT}`);
});

