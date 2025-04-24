const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Beispielroute für Produkte
app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: "Blütenhonig", preis: 8, bild: "/src/assets/Blütenhonig.png" },
    { id: 2, name: "Waldhonig", preis: 9, bild: "/src/assets/Waldhonig.png" }
  ]);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend läuft auf Port ${PORT}`);
});

