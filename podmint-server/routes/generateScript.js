// routes/script.js
import express from 'express';
import { spawn } from 'child_process';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const DEFAULT_VOICE_ID = "IvLWq57RKibBrqZGpQrC"; // Updated to your real ElevenLabs voice ID

router.post('/', (req, res) => {
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY; // moved inside handler
  const { prompt } = req.body;
  console.log('Received prompt:', prompt); // Log the incoming prompt
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  let output = '';

  const ollama = spawn('ollama', ['run', 'tinyllama'], { stdio: ['pipe', 'pipe', 'inherit'] });

  ollama.stdin.write(`${prompt}\n`);
  ollama.stdin.end();

  ollama.stdout.on('data', (data) => {
    output += data.toString();
  });

  ollama.on('close', async (code) => {
    if (code === 0) {
      try {
        // Generate audio using ElevenLabs
        const filename = `${uuidv4()}.mp3`;
        const outputPath = path.join('public', 'audio', filename);

        const response = await axios({
          method: "POST",
          url: `https://api.elevenlabs.io/v1/text-to-speech/${DEFAULT_VOICE_ID}`,
          headers: {
            "xi-api-key": ELEVENLABS_API_KEY,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg"
          },
          data: {
            text: output.trim(),
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5
            }
          },
          responseType: "arraybuffer",
        });

        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, response.data);

        res.json({
          script: output.trim(),
          audioUrl: `/audio/${filename}`
        });
      } catch (err) {
        console.error('🔴 Error in audio generation:', err); // Log audio generation errors
        res.status(500).json({ error: 'Failed to generate audio', details: err.message });
      }
    } else {
      console.error('🔴 Ollama process exited with code:', code); // Log Ollama process exit code
      res.status(500).json({ error: 'Failed to generate script' });
    }
  });
});

export default router;
