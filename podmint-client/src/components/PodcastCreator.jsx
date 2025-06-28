// src/components/PodcastCreator.jsx
import { useState } from "react";
import { generatePodcastScript } from "../utils/gptMock";
import { synthesizeSpeech } from "../utils/ttsMock";
import Button from "./Button"; // Optional: you can replace with native button if needed

const voices = [
  { value: "default", label: "Default Voice" },
  { value: "female", label: "Female Voice" },
  { value: "male", label: "Male Voice" },
  { value: "robotic", label: "Robotic Voice" },
];

const PodcastCreator = ({ onPodcastReady }) => {
  const [prompt, setPrompt] = useState("");
  const [voice, setVoice] = useState("default");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const script = await generatePodcastScript(prompt);
      const audioUrl = await synthesizeSpeech(script, voice);
      onPodcastReady?.({
        title: prompt,
        script,
        voice,
        audioUrl,
      });
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        🎙️ Create a Podcast
      </h1>

      <textarea
        rows="4"
        className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter your podcast prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <select
        className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        value={voice}
        onChange={(e) => setVoice(e.target.value)}
      >
        {voices.map((v) => (
          <option key={v.value} value={v.value}>
            {v.label}
          </option>
        ))}
      </select>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition transform hover:scale-105 disabled:opacity-50"
      >
        {loading ? "Generating..." : "🚀 Generate Podcast"}
      </button>
    </div>
  );
};

export default PodcastCreator;
