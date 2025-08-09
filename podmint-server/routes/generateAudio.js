// routes/audio.js
import express from 'express';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

router.post('/', async (req, res) => {
  const { text, voiceId } = req.body;
  if (!text || !voiceId) {
    return res.status(400).json({ error: 'text and voiceId are required' });
  }

  const audioFileName = `audio-${uuidv4()}.mp3`;
  const audioFilePath = path.join('public/audio', audioFileName);

  try {
    const response = await axios({
      method: 'POST',
      url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      data: {
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      },
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(audioFilePath);
    response.data.pipe(writer);

    writer.on('finish', () => {
      res.json({ audioUrl: `/audio/${audioFileName}` });
    });

    writer.on('error', (err) => {
      console.error('Error writing audio file:', err);
      res.status(500).json({ error: 'Failed to write audio file' });
    });
  } catch (error) {
    console.error('Error generating audio:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate audio from ElevenLabs' });
  }
});

export default router;
