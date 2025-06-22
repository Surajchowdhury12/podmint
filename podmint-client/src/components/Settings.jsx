// src/components/Settings.jsx
import { useState } from 'react';
import { Moon, Sun, Trash2, Save } from 'lucide-react';
import Button from './Button';

export default function Settings({ darkMode, toggleDarkMode }) {
  const [defaultVoice, setDefaultVoice] = useState('Samantha');
  const voices = ['Samantha', 'Brian', 'Emma', 'Ravi'];

  const handleClearHistory = () => {
    alert('Podcast history cleared (mock)');
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      {/* Profile */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src="https://api.dicebear.com/7.x/thumbs/svg?seed=PodUser"
          alt="Avatar"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">Suraj Chowdhury</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">suraj@podmint.ai</p>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-4">
        {/* Theme Toggle */}
        <div className="flex justify-between items-center">
          <span className="font-medium">Dark Mode</span>
          <Button onClick={toggleDarkMode} variant="ghost">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>

        {/* Voice Selection */}
        <div>
          <label className="block mb-1 font-medium">Default Voice</label>
          <select
            className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
            value={defaultVoice}
            onChange={(e) => setDefaultVoice(e.target.value)}
          >
            {voices.map((voice) => (
              <option key={voice}>{voice}</option>
            ))}
          </select>
        </div>

        {/* Clear History */}
        <div className="flex justify-between items-center">
          <span className="font-medium">Clear Podcast History</span>
          <Button onClick={handleClearHistory} variant="destructive">
            <Trash2 size={18} className="mr-1" /> Clear
          </Button>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 text-right">
        <Button className="px-6 py-2 font-medium rounded-xl flex items-center gap-2">
          <Save size={18} /> Save Changes
        </Button>
      </div>
    </div>
  );
}
