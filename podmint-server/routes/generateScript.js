// routes/script.js
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import gTTS from "gtts";

const router = express.Router();

router.post("/", (req, res) => {
  const { prompt } = req.body;
  console.log("Received prompt:", prompt);
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  let output = "";

  const ollama = spawn("ollama", ["run", "tinyllama"], { stdio: ["pipe", "pipe", "inherit"] });

  ollama.stdin.write(`${prompt}\n`);
  ollama.stdin.end();

  ollama.stdout.on("data", (data) => {
    output += data.toString();
  });

  ollama.on("close", async (code) => {
    if (code === 0) {
      try {
        const filename = `${uuidv4()}.mp3`;
        const outputPath = path.join("public", "audio", filename);

        fs.mkdirSync(path.dirname(outputPath), { recursive: true });

        // ✅ Use gTTS instead of ElevenLabs
        const gtts = new gTTS(output.trim(), "en");
        gtts.save(outputPath, (err) => {
          if (err) {
            console.error("🔴 Error generating audio:", err);
            return res.status(500).json({ error: "Failed to generate audio" });
          }

          res.json({
            script: output.trim(),
            audioUrl: `/audio/${filename}`,
          });
        });
      } catch (err) {
        console.error("🔴 Error in audio generation:", err);
        res.status(500).json({ error: "Failed to generate audio", details: err.message });
      }
    } else {
      console.error("🔴 Ollama process exited with code:", code);
      res.status(500).json({ error: "Failed to generate script" });
    }
  });
});

export default router;
