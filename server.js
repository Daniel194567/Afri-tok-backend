import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

// Initialisation Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Endpoint de test Supabase
app.get("/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("test_table") // remplace par une table existante
      .select("*")
      .limit(1);

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Simple endpoint pour vérifier que le serveur tourne
app.get("/", (req, res) => {
  res.send("Afri-Tok backend en ligne !");
});

app.listen(PORT, () => {
  console.log(`✅ Afri-Tok backend actif sur le port ${PORT}`);
});
