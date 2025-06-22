import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white flex flex-col">
      
      {/* 🔮 Animated Background Blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-violet-400 dark:bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse z-0"
        animate={{ x: [0, 40, -40, 0], y: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-400 dark:bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse z-0"
        animate={{ x: [0, -30, 30, 0], y: [0, -40, 40, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6 flex justify-between items-center z-10"
      >
        <div className="flex items-center space-x-3">
          <img src={viteLogo} className="h-8" />
          <img src={reactLogo} className="h-8" />
          <span className="text-2xl font-bold tracking-tight">PodMint 🎙️</span>
        </div>
        <Link to="/app">
          <Button>Enter PodMint</Button>
        </Link>
      </motion.header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-12 h-12 text-violet-500 mb-4 animate-pulse" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-extrabold leading-tight sm:text-5xl mb-4"
        >
          Turn Ideas into <span className="text-violet-600">Podcasts</span> in Seconds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-xl text-lg text-gray-600 dark:text-gray-300 mb-6"
        >
          PodMint lets you generate AI-powered podcasts with just a prompt. No mic, no editing — just your voice and our magic.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link to="/app">
            <Button size="lg" className="text-lg px-6 py-3">
              🎧 Start Creating
            </Button>
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center text-sm text-gray-500 p-4 z-10"
      >
        Built with ❤️ using React + Vite + Tailwind · © 2025 PodMint
      </motion.footer>
    </div>
  );
}
