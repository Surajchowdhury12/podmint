import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import { generatePodcastScript } from "../utils/gptMock";
import { synthesizeSpeech } from "../utils/ttsMock";
export default function PodcastCreation() {
  const [prompt, setPrompt] = useState("");
  const [voice, setVoice] = useState("en-US-JennyNeural");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCreate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const script = await generatePodcastScript(prompt);
      const audioUrl = await synthesizeSpeech(script, voice);
      setResult({ script, audioUrl });
    } catch (err) {
      alert("Something went wrong generating the podcast.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10 md:px-16 lg:px-32 text-foreground">
      <h1 className="text-3xl font-bold mb-6">🎙️ Create Your Podcast</h1>

      <Card className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Enter your prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white"
            placeholder="Type your podcast script or idea here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Select voice</label>
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-3 dark:bg-zinc-900 dark:text-white"
          >
            <option value="en-US-JennyNeural">Jenny (US)</option>
            <option value="en-US-GuyNeural">Guy (US)</option>
            <option value="en-GB-SoniaNeural">Sonia (UK)</option>
            <option value="hi-IN-SwaraNeural">Swara (Hindi)</option>
          </select>
        </div>

        <Button
          onClick={handleCreate}
          className="w-full md:w-auto"
          disabled={loading}
        >
          {loading ? "Generating..." : "🎧 Generate Podcast"}
        </Button>
      </Card>

      {result && (
        <Card className="p-6 mt-8 space-y-4">
          <h2 className="text-xl font-semibold">🎬 Generated Script</h2>
          <p className="whitespace-pre-wrap text-sm text-muted-foreground">
            {result.script}
          </p>

          <h2 className="text-xl font-semibold">🔊 Audio Preview</h2>
          <audio controls src={result.audioUrl} className="w-full" />
        </Card>
      )}
    </div>
  );
}
