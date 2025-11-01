import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialisation Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Route test
app.get("/", (req, res) => {
  res.json({ message: "✅ Serveur AfriTok opérationnel !" });
});

// Test de connexion Supabase
app.get("/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase.from("users").select("*").limit(1);
    if (error) throw error;
    res.json({ message: "✅ Connexion Supabase réussie", data });
  } catch (err) {
    res.status(500).json({ message: "❌ Erreur de connexion à Supabase.", details: err.message });
  }
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
