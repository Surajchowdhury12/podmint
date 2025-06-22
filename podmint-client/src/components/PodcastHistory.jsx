import { useState } from 'react';
import { Pencil, Trash2, PlayCircle, Image as ImageIcon } from 'lucide-react';
import PodcastPlayer from './PodcastPlayer';

const sampleHistory = [
  {
    id: 1,
    title: 'The Future of AI',
    createdAt: '2025-06-22',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    thumbnail: 'https://placehold.co/300x200?text=AI+Podcast',
    duration: '5:23',
  },
  {
    id: 2,
    title: 'Space Exploration 2040',
    createdAt: '2025-06-20',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    thumbnail: 'https://placehold.co/300x200?text=Space+Podcast',
    duration: '4:47',
  },
];

export default function PodcastHistory() {
  const [history, setHistory] = useState(sampleHistory);
  const [selected, setSelected] = useState(null);

  const handleDelete = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRename = (id) => {
    const newTitle = prompt('Enter new title');
    if (newTitle) {
      setHistory((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, title: newTitle } : item
        )
      );
    }
  };

  const handleChangeThumbnail = (id) => {
    const newThumbnail = prompt('Enter new thumbnail URL');
    if (newThumbnail) {
      setHistory((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, thumbnail: newThumbnail } : item
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">🗂️ Podcast History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {history.map((podcast) => (
          <div
            key={podcast.id}
            className="rounded-xl border border-gray-300 dark:border-gray-700 p-4 shadow-sm bg-white dark:bg-gray-800"
          >
            <div className="relative group">
              <img
                src={podcast.thumbnail}
                alt="Thumbnail"
                className="rounded-lg w-full h-40 object-cover mb-4 cursor-pointer transition-transform group-hover:scale-105"
                onClick={() => handleChangeThumbnail(podcast.id)}
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white hidden group-hover:block">
                <ImageIcon size={16} />
              </div>
            </div>

            <h3 className="text-lg font-semibold">{podcast.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Duration: {podcast.duration} | Created: {podcast.createdAt}
            </p>
            <div className="flex items-center space-x-4 mt-3">
              <button
                onClick={() => setSelected(podcast)}
                className="hover:text-blue-500"
                title="Play"
              >
                <PlayCircle size={20} />
              </button>
              <button
                onClick={() => handleRename(podcast.id)}
                className="hover:text-yellow-500"
                title="Rename"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => handleDelete(podcast.id)}
                className="hover:text-red-500"
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">▶️ Now Playing: {selected.title}</h3>
          <PodcastPlayer
            title={selected.title}
            audioSrc={selected.audioSrc}
            thumbnail={selected.thumbnail}
          />
        </div>
      )}
    </div>
  );
}
