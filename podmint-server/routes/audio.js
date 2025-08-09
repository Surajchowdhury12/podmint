// routes/audio.js
import "../config.js"; // Load .env variables
import express from "express";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const router = express.Router();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/generate-audio", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // Generate speech using OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts", // TTS model
      voice: "alloy",           // Voice options: alloy, verse, etc.
      input: text,
    });

    // Save to public/audio folder
    const fileName = `podcast-${Date.now()}.mp3`;
    const filePath = path.join("public", "audio", fileName);

    // Ensure directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Convert ArrayBuffer → Buffer → File
    const buffer = Buffer.from(await mp3.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Return file URL
    res.json({
      audioUrl: `/audio/${fileName}`,
    });
  } catch (error) {
    console.error("Error generating audio:", error);
    res.status(500).json({ error: "Failed to generate audio" });
  }
});

export default router;
