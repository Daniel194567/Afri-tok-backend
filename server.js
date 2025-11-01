// Import des modules nécessaires
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

// Chargement des variables d'environnement
dotenv.config();

// Initialisation de l'application Express
const app = express();
app.use(express.json());
app.use(cors());

// Initialisation du client Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Erreur : les variables SUPABASE_URL et SUPABASE_KEY ne sont pas définies !");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Route principale
app.get("/", (req, res) => {
  res.json({ message: "🚀 API Afri-Tok Backend en ligne avec Render !" });
});

// Route de test pour Supabase
app.get("/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase.from("profiles").select("*").limit(1);

    if (error) throw error;

    res.json({
      message: "✅ Connexion à Supabase réussie",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "❌ Erreur de connexion à Supabase.",
      details: err.message,
    });
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Serveur Afri-Tok actif sur le port ${PORT}`);
});
