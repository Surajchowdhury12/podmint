// src/utils/api.js

export async function generateAudio(script, voiceId) {
  const res = await fetch("http://localhost:5000/api/generate-audio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: script, voiceId }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error(
      "🎧 Audio API error:",
      res.status,
      errorData.details || errorData.error
    );
    throw new Error(errorData.error || "Failed to generate audio");
  }

  const { audioUrl } = await res.json();
  if (!audioUrl) throw new Error("No audio URL returned");

  return `http://localhost:5000${audioUrl}`;
}

export async function generateScript(prompt) {
  const res = await fetch("http://localhost:5000/api/generate-script", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to generate script");
  }

  const { script } = await res.json();
  return script;
}
