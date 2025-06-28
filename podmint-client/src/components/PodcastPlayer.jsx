import { useState, useRef } from 'react';
import { Pause, Play } from 'lucide-react';

export default function PodcastPlayer({ podcast }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!podcast) {
    return <p className="text-gray-500 italic text-center">No podcast generated yet.</p>;
  }

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Audio Player */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex items-center p-4 space-x-4">
        <img
          src="/podcast-thumbnail.png"
          alt="Podcast"
          className="w-20 h-20 object-cover rounded-md"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{podcast.title}</h3>
          <audio ref={audioRef} src={podcast.audioUrl} className="w-full mt-2" />
        </div>
        <button
          onClick={togglePlay}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
      </div>

      {/* Script / Transcript */}
      {podcast.script && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h4 className="text-md font-semibold mb-2 text-indigo-600 dark:text-indigo-400">
            🎙️ Script / Transcript
          </h4>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line text-sm leading-relaxed">
            {podcast.script}
          </p>
        </div>
      )}
    </div>
  );
}
