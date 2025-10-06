let heuristics = { importantWords: [], commonPatterns: [] };
let summaries = []; // Stores iterative summaries
let summaryIndex = -1;

const logsDiv = document.getElementById('logs');
const outputDiv = document.getElementById('output');

function log(msg) {
    const p = document.createElement('div');
    p.textContent = msg;
    logsDiv.appendChild(p);
    logsDiv.scrollTop = logsDiv.scrollHeight;
}

// -----------------------------
// Load preprocessed heuristics
// -----------------------------
async function loadHeuristics() {
    try {
        log('Loading preprocessed heuristics...');
        const res = await fetch('./heuristics.json'); // Ensure heuristics.json is in the same folder
        heuristics = await res.json();
        log('Heuristics loaded successfully.');
    } catch (e) {
        log('Failed to load heuristics: ' + e);
    }
}

// -----------------------------
// Iterative Summarization
// -----------------------------
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
    
    // Adaptive: Keep sentences above median score
    const scoresSorted = scored.map(s => s.score).sort((a, b) => a - b);
    const medianScore = scoresSorted[Math.floor(scoresSorted.length / 2)] || 0;
    
    return scored.filter(s => s.score >= medianScore).map(s => s.sentence).join(' ');
}

// -----------------------------
// Summary Controls
// -----------------------------
function summarizeNext() {
    let input;
    if (summaryIndex === -1) {
        input = document.getElementById('inputText').value;
    } else {
        input = summaries[summaryIndex];
    }
    
    const newSummary = summarize(input);
    if (!newSummary || newSummary === summaries[summaryIndex]) {
        log('Cannot summarize further.');
        return;
    }
    
    summaries.push(newSummary);
    summaryIndex++;
    outputDiv.innerText = newSummary;
    log(`Summary iteration ${summaryIndex + 1} complete.`);
}

function summarizeBack() {
    if (summaryIndex <= 0) {
        log('No previous summary.');
        return;
    }
    summaryIndex--;
    outputDiv.innerText = summaries[summaryIndex];
    log(`Returned to summary iteration ${summaryIndex + 1}.`);
}

function resetSummary() {
    summaries = [];
    summaryIndex = -1;
    outputDiv.innerText = '';
    log('Summary reset.');
}

// -----------------------------
// Initialize
// -----------------------------
loadHeuristics();   