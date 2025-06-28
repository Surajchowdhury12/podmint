// src/utils/ttsMock.js
export function synthesizeSpeech(text, voice = "Samantha") {
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would return audio URL from real TTS API
      resolve("/assets/placeholder-audio.mp3");
    }, 1000);
  });
}
export function getAvailableVoices() {
  return [
    { name: "Samantha", lang: "en-US" },
    { name: "Brian", lang: "en-GB" },
    { name: "Emma", lang: "en-AU" },
    { name: "Ravi", lang: "hi-IN" },
  ];
}