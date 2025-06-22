import { Play } from "lucide-react";
import Card from "./Card";

const podcastHistory = [
  {
    id: 1,
    title: "The Future of AI",
    date: "June 20, 2025",
    duration: "5:12",
    audioSrc: "/audio/ai-future.mp3",
  },
  {
    id: 2,
    title: "Building Side Projects",
    date: "June 19, 2025",
    duration: "3:45",
    audioSrc: "/audio/side-projects.mp3",
  },
  {
    id: 3,
    title: "Indie Dev Mindset",
    date: "June 18, 2025",
    duration: "6:00",
    audioSrc: "/audio/indie-dev.mp3",
  },
];

export default function PodcastHistory() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold mb-2">🎧 Your Podcast History</h2>
      {podcastHistory.map((podcast) => (
        <Card key={podcast.id} className="flex items-center justify-between">
          <div className="text-left">
            <h3 className="text-lg font-semibold">{podcast.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {podcast.date} · {podcast.duration}
            </p>
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2">
            <Play className="w-4 h-4" />
            <span>Play</span>
          </button>
        </Card>
      ))}
    </section>
  );
}
