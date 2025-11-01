import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// 🔥 Initialisation Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// 🔍 Route de test pour vérifier la connexion
app.get("/test-supabase", async (req, res) => {
  try {
    // simple test pour vérifier la communication
    const { data, error } = await supabase.from("profiles").select("*").limit(1);
    if (error) throw error;
    res.json({ message: "✅ Connexion à Supabase réussie", data });
  } catch (err) {
    res.status(500).json({
      message: "❌ Erreur de connexion à Supabase.",
      details: err.message,
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Serveur Afri-Tok actif sur le port ${PORT}`);
});import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// ✅ connexion à Supabase / PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ✅ route test
app.get("/", (req, res) => {
  res.send("🚀 Afri-Tok Backend en ligne avec Render !");
});

// ✅ exemple route API
app.get("/api/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ status: "success", time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

// ✅ port dynamique pour Render
const PORT = process.env.PORT || 3000;
// Test de connexion à Supabase
app.get("/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("articles") // Remplace "articles" par le vrai nom de ta table
      .select("*")
      .limit(1);

    if (error) throw error;

    if (data && data.length > 0) {
      res.status(200).json({
        message: "✅ Connexion Supabase réussie !",
        exemple: data[0],
      });
    } else {
      res.status(200).json({
        message: "✅ Connexion réussie, mais aucun article trouvé.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "❌ Erreur de connexion à Supabase.",
      details: err.message,
    });
  }
});
app.listen(PORT, () => {
  console.log(`✅ Serveur Afri-Tok actif sur le port ${PORT}`);
});
