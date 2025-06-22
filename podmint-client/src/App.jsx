import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Button from './components/Button';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';
import PodcastCreator from './components/PodcastCreator';
import PodcastPlayer from './components/PodcastPlayer';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-4 items-center">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="h-8" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="h-8" alt="React logo" />
          </a>
          <span className="ml-4 text-lg font-semibold">PodMint 🎙️</span>
        </div>
        <Button onClick={() => setDarkMode(!darkMode)}>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </Button>
      </div>

      {/* Main Content */}
      <main className="p-6 space-y-12">
        {/* Podcast Creation */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">🎙️ Create Your Podcast</h2>
          <PodcastCreator />
        </section>

        {/* Podcast Player Preview */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">🎧 Preview Player</h2>
          <PodcastPlayer
            title="Sample Episode: The Future of AI"
            audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            thumbnail="https://placehold.co/600x400/black/white?text=Podcast+Cover"
          />
        </section>
      </main>
    </div>
  );
}
