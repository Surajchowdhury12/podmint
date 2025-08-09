import { useState } from "react";
import { generateScript, generateAudio } from "../utils/api";
import Button from "./Button"; // Optional
import { CheckCircle, Loader2 } from "lucide-react"; // install lucide-react if not done
import { motion } from "framer-motion"; // for smooth animation (optional)

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
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
  if (!prompt.trim()) return;

  setLoading(true);
  setSuccess(false);

  try {
    console.log("🧠 Generating script...");
    const script = await generateScript(prompt);
    console.log("✅ Script generated:", script);

    console.log("🔊 Generating audio...");
    const audioUrl = await generateAudio(script, voice);
    console.log("✅ Audio generated:", audioUrl);

    onPodcastReady?.({ title: prompt, script, voice, audioUrl });

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  } catch (error) {
    console.error("❌ Error during generation:", error);
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
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition transform hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" />
            Generating...
          </>
        ) : (
          "🚀 Generate Podcast"
        )}
      </button>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-2 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded-xl shadow-sm"
        >
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>Podcast generated successfully!</span>
        </motion.div>
      )}
    </div>
  );
};

export default PodcastCreator;
