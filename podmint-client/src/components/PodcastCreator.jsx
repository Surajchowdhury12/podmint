import { useState } from "react";

const PodcastCreator = () => {
  const [prompt, setPrompt] = useState("");
  const [voice, setVoice] = useState("default");

  const handleSubmit = () => {
    alert(`Generating podcast with prompt: "${prompt}" using voice: ${voice}`);
    // You can later trigger API request here
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">🎙️ Create a Podcast</h1>
      
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
        <option value="default">Default Voice</option>
        <option value="female">Female Voice</option>
        <option value="male">Male Voice</option>
        <option value="robotic">Robotic Voice</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition transform hover:scale-105"
      >
        🚀 Generate Podcast
      </button>
    </div>
  );
};

export default PodcastCreator;
