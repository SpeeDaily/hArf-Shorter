# 🧠 hArf Shorter  
**An open-source, client-side text summarization tool powered by lightweight heuristics.**

---

## 🌐 Live Demo
👉 [https://SpeeDaily.github.io/harf-shorter/](https://SpeeDaily.github.io/harf-shorter/)

---

## 🚀 Overview
**hArf** is a browser-based summarization library that uses simple linguistic heuristics to shorten text naturally — without AI servers, APIs, or heavy models.  
It runs 100% in the browser using [Compromise NLP](https://github.com/spencermountain/compromise).

---

## ⚡ Features
- 🧩 **Plug-and-play** — just a single JS include  
- 💡 **Iterative summarization** (“Summarize Next”)  
- 🧠 **Offline support** — all logic runs locally  
- 📁 **Heuristics-based** — configurable with your own corpus  
- 💻 **Developer friendly** — usable as a JS library or as a standalone web tool

---

## 📦 Folder Structure
harf-shorter/ ├── index.html               → main web app 
              ├── script.js                → summarization logic 
              ├── harf.js                  → library file for external use 
              ├── heuristics.json          → preprocessed heuristics 
              ├── corpus/                  → text corpus modules 
              ├── heuristicsDownloader.html→ generate new heuristics 
              ├── TextToJs/                → convert text → JS modules 
              ├── styles.css 
              ├── LICENSE 
              └── README.md
---


## 💡 Usage

### 🖥️ 1. Use as a Web App  
Visit the live version here:  
👉 [https://SpeeDaily.github.io/harf-shorter/](https://SpeeDaily.github.io/harf-shorter/)

Paste your text → click **“Summarize Next”** → get condensed summaries instantly.

---

### 🌎 2. Use as a Library (CDN-style Embed)  
Use hArf directly in any website — just like Bootstrap Icons or jQuery.

```html
<!-- Load the library -->
<script src="https://SpeeDaily.github.io/harf-shorter/harf.js"></script>

<!-- Then use it -->
<script>
  // Load heuristics first
  hArf.loadHeuristics("https://SpeeDaily.github.io/harf-shorter/heuristics.json").then(() => {
    const text = "Alice went to Wonderland. She met the Queen of Hearts. Adventures followed.";
    const summary = hArf.summarize(text);
    console.log("Summary:", summary);
  });
</script>

---

