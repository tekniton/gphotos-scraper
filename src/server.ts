import express from "express";
import { extractAlbum } from "./index.js"; // Usa tu propia función desde src/index.ts

const app = express();

app.get("/scrape", async (req, res) => {
  const url = req.query.url as string;
  if (!url) return res.status(400).send("❌ Falta el parámetro ?url");

  try {
    const data = await extractAlbum(url);
    res.setHeader("Content-Disposition", "attachment; filename=album.json");
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).send("Error al extraer el álbum");
  }
});

app.get("/", (_, res) => {
  res.send("🔗 Usa /scrape?url=https://photos.app.goo.gl/...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en el puerto ${PORT}`);
});
