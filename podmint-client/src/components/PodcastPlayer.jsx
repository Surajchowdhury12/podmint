import { useState, useRef } from 'react';
import { Pause, Play } from 'lucide-react';

export default function PodcastPlayer({ title, audioSrc, thumbnail }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex items-center p-4 space-x-4 max-w-2xl mx-auto">
      <img src={thumbnail} alt="Podcast" className="w-20 h-20 object-cover rounded-md" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <audio ref={audioRef} src={audioSrc} className="w-full mt-2" />
      </div>
      <button
        onClick={togglePlay}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
      >
        {isPlaying ? <Pause /> : <Play />}
      </button>
    </div>
  );
}
