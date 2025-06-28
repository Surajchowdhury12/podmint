// src/utils/gptMock.js
export function generatePodcastScript(prompt) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `Welcome to PodMint! Today, we explore: "${prompt}". Let's dive into some AI-powered thoughts... (mocked GPT content)`
      );
    }, 1000);
  });
}
