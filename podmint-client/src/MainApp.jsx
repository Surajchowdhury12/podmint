import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import PodcastCreator from "./components/PodcastCreator";
import PodcastPlayer from "./components/PodcastPlayer";
import PodcastHistory from "./components/PodcastHistory";
import Settings from "./components/Settings";

const TABS = {
  CREATE: "Create",
  LISTEN: "Listen",
  HISTORY: "History",
  SETTINGS: "Settings",
  SHOWCASE: "Showcase",
};

export default function MainApp() {
  const [activeTab, setActiveTab] = useState(TABS.CREATE);
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode setting from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("podmint-theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Update localStorage and html class when dark mode changes
  const handleThemeChange = (isDark) => {
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("podmint-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("podmint-theme", "light");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 rounded-b-2xl">
        <div className="flex space-x-2 items-center">
          <img
            src="/podmint-logo.png"
            alt="PodMint Logo"
            className="h-12 w-12 transition-transform duration-300 hover:rotate-6"
          />
          <h1 className="text-2xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400">
            PodMint
          </h1>
        </div>
        <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 italic">
          AI Podcasts, Instantly 🎧
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 py-4 border-b border-gray-200 dark:border-gray-700">
        {Object.entries(TABS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(label)}
            className={clsx(
              "px-5 py-2 rounded-full font-semibold transition duration-300 ease-in-out",
              activeTab === label
                ? "bg-indigo-600 text-white shadow-md scale-105"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto p-6">
        {activeTab === TABS.CREATE && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PodcastCreator />
          </motion.section>
        )}

        {activeTab === TABS.LISTEN && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">🎧 Listen to Podcasts</h2>
            <PodcastPlayer />
          </motion.section>
        )}

        {activeTab === TABS.HISTORY && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PodcastHistory />
          </motion.section>
        )}

        {activeTab === TABS.SETTINGS && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">⚙️ Settings</h2>
            <Settings
              darkMode={darkMode}
              onThemeChange={handleThemeChange}
            />
          </motion.section>
        )}

        {activeTab === TABS.SHOWCASE && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6">
              ✨ What People Are Saying
            </h2>

            {/* Testimonials */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <blockquote className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                <p className="italic text-lg">
                  “PodMint helped me launch my podcast in 10 minutes!”
                </p>
                <footer className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  — Alex, Indie Creator
                </footer>
              </blockquote>
              <blockquote className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                <p className="italic text-lg">
                  “I love how easy and fun the interface is. Beautiful UI!”
                </p>
                <footer className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  — Priya, Developer
                </footer>
              </blockquote>
            </div>

            {/* Screenshots */}
            <h3 className="text-xl font-semibold mb-4">📸 Screenshots</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <img
                src="/screenshots/create.png"
                alt="Create Page"
                className="rounded-lg shadow"
              />
              <img
                src="/screenshots/player.png"
                alt="Player UI"
                className="rounded-lg shadow"
              />
            </div>

            {/* Demo Video */}
            <h3 className="text-xl font-semibold mb-4">🎬 Demo Video</h3>
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <iframe
                className="w-full h-full rounded-lg shadow"
                src="https://www.youtube.com/embed/your-demo-video-id"
                title="PodMint Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.section>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-4 mt-10 border-t dark:border-gray-700">
        © {new Date().getFullYear()} PodMint. Built with ❤️ and React.
      </footer>
    </div>
  );
}
