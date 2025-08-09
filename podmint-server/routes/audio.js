import "../config.js";
import express from "express";
import fs from "fs";
import path from "path";
import gTTS from "gtts";
import mp3Duration from "mp3-duration"; // <--- install this

const router = express.Router();

router.post("/generate-audio", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const fileName = `podcast-${Date.now()}.mp3`;
    const filePath = path.join("public", "audio", fileName);

    // Ensure directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Generate audio using gTTS
    const gtts = new gTTS(text, "en");
    gtts.save(filePath, (err) => {
      if (err) {
        console.error("Error generating audio:", err);
        return res.status(500).json({ error: "Failed to generate audio" });
      }

      // Get duration after saving
      mp3Duration(filePath, (err, duration) => {
        if (err) {
          console.error("Error getting duration:", err);
          return res.status(500).json({ error: "Failed to get audio duration" });
        }

        res.json({
          audioUrl: `/audio/${fileName}`,
          duration: Number(duration.toFixed(2)) // in seconds
        });
      });
    });

  } catch (error) {
    console.error("Error generating audio:", error);
    res.status(500).json({ error: "Failed to generate audio" });
  }
});

export default router;
