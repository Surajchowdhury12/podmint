import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Button from '../components/Button';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white flex flex-col">
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={viteLogo} className="h-8" />
          <img src={reactLogo} className="h-8" />
          <span className="text-2xl font-bold tracking-tight">PodMint 🎙️</span>
        </div>
        <Link to="/app">
          <Button>Enter PodMint</Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <Sparkles className="w-12 h-12 text-violet-500 mb-4 animate-pulse" />
        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl mb-4">
          Turn Ideas into <span className="text-violet-600">Podcasts</span> in Seconds
        </h1>
        <p className="max-w-xl text-lg text-gray-600 dark:text-gray-300 mb-6">
          PodMint lets you generate AI-powered podcasts with just a prompt. No mic, no editing — just your voice and our magic.
        </p>
        <Link to="/app">
          <Button size="lg" className="text-lg px-6 py-3">
            🎧 Start Creating
          </Button>
        </Link>
      </main>

      <footer className="text-center text-sm text-gray-500 p-4">
        Built with ❤️ using React + Vite + Tailwind · © 2025 PodMint
      </footer>
    </div>
  );
}
