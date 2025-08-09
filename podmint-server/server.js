// server.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import scriptRoutes from "./routes/generateScript.js";
import audioRoutes from "./routes/audio.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/generate-script", scriptRoutes);
app.use("/api", audioRoutes);
app.use("/audio", express.static(path.join("public", "audio")));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
