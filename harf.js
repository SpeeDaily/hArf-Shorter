// hArf Shorter v1.0.0
// Lightweight client-side text summarizer
// License: MIT

(function (global) {
  let heuristics = { importantWords: [], commonPatterns: [] };

  // Load heuristics JSON (must be hosted in same repo)
  async function loadHeuristics(url = './heuristics.json') {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to load heuristics');
      heuristics = await res.json();
      console.log('hArf: Heuristics loaded.');
      return true;
    } catch (e) {
      console.error('hArf: Could not load heuristics →', e);
      return false;
    }
  }

  // Summarize text using frequency-based scoring
  function summarize(text) {
    if (!text || typeof text !== 'string') return '';
    if (!heuristics.importantWords.length) {
      console.warn('hArf: Heuristics not loaded yet. Run hArf.loadHeuristics() first.');
      return text;
    }

    const sentences = text.split(/(?<=[.!?])\s+/);
    const scored = sentences.map((s) => {
      const words = s.match(/\b[\w']+\b/g) || [];
      let score = 0;
      words.forEach((w) => {
        if (heuristics.importantWords.includes(w.toLowerCase())) score++;
      });
      return { sentence: s, score };
    });

    const scoresSorted = scored.map((s) => s.score).sort((a, b) => a - b);
    const medianScore = scoresSorted[Math.floor(scoresSorted.length / 2)] || 0;

    return scored
      .filter((s) => s.score >= medianScore)
      .map((s) => s.sentence)
      .join(' ');
  }

  // Reset loaded heuristics
  function reset() {
    heuristics = { importantWords: [], commonPatterns: [] };
    console.log('hArf: Reset complete.');
  }

  // Expose global
  global.hArf = {
    loadHeuristics,
    summarize,
    reset,
    version: '1.0.0',
  };
})(typeof window !== 'undefined' ? window : globalThis);
