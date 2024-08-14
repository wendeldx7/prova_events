import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = process.env.PORT;

import conn from "./config/conn.js";

import "./models/eventoModel.js";
import "./models/palestranteModel.js";
import "./models/participanteModel.js";
import "./models/inscricoesModel.js";

import eventoRoutes from "./routes/eventoRouter.js";

const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/eventos", eventoRoutes);

//*404
app.use((request, response) => {
  response.status(404).json({ message: "Rota nao encontrada" });
});

app.listen(PORT, () => {
  console.log("Servidor on PORT: " + PORT);
});
