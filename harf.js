// hArf v1.0 - Lightweight Text Summarizer
// Author: hArf Team | License: MIT

(function (global) {
  let heuristics = { importantWords: [], commonPatterns: [] };

  // Load heuristics (sync or async)
  async function loadHeuristics(url = './heuristics.json') {
    const res = await fetch(url);
    heuristics = await res.json();
  }

  // Core summarizer
  function summarize(text) {
    const sentences = text.split(/(?<=[.!?])\s+/);
    const scored = sentences.map(s => {
      const words = s.match(/\b[\w']+\b/g) || [];
      let score = 0;
      words.forEach(w => {
        if (heuristics.importantWords.includes(w.toLowerCase())) score++;
      });
      return { sentence: s, score };
    });

    const scoresSorted = scored.map(s => s.score).sort((a, b) => a - b);
    const medianScore = scoresSorted[Math.floor(scoresSorted.length / 2)] || 0;

    return scored
      .filter(s => s.score >= medianScore)
      .map(s => s.sentence)
      .join(' ');
  }

  // Expose global object
  global.hArf = {
    loadHeuristics,
    summarize,
    version: "1.0.0"
  };
})(typeof window !== "undefined" ? window : globalThis);
