// hArf Shorter - Browser Library Version
// Created by hArf | Open Source

window.hArfShorter = (function() {
    let heuristics = {
        importantWords: [],
        commonPatterns: []
    };

    // Load heuristics dynamically from file if available
    async function loadHeuristics() {
        try {
            const res = await fetch('/harf-shorter/heuristics.json');
            heuristics = await res.json();
            console.log("hArf Shorter: Heuristics loaded.");
        } catch (e) {
            console.warn("hArf Shorter: Failed to load heuristics, using default set.", e);
        }
    }

    // Core summarization logic
    function summarize(text) {
        if (!text || typeof text !== "string") return "";

        const sentences = text.split(/(?<=[.!?])\s+/);
        if (sentences.length <= 2) return text; // too short to summarize

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

    // Utility: iterative shortening
    function shortenIteratively(text, rounds = 1) {
        let result = text;
        for (let i = 0; i < rounds; i++) {
            const next = summarize(result);
            if (next === result) break;
            result = next;
        }
        return result;
    }

    // Initialize automatically
    loadHeuristics();

    // Public API
    return {
        summarize,
        shortenIteratively
    };
})();
