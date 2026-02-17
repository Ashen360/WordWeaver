# 🧠 WordWeaver – Category Word Puzzle Game

**WordWeaver** is a clean, indie-style word puzzle game built with React.
Players must identify groups of four related words from a shuffled grid. Each correct group reveals a hidden connection, challenging both logic and domain knowledge.

The game features multiple difficulty tiers ranging from everyday knowledge to expert-level computer science concepts.

---

## 🎮 How It Works

1. Choose a difficulty:

   * Easy (General Knowledge)
   * Medium (Tricky Tech)
   * Hard (Expert Mode)

2. A grid of shuffled words appears.

3. Select exactly **4 words**.

4. Submit your selection.

**Outcomes:**

* ✔ Correct → The group is solved and revealed.
* ✖ Incorrect → A mistake is recorded.

**Game Ends When:**

* All groups are solved
* Or the mistake limit is reached

---

## 🚀 Features

* ✅ Difficulty scaling (Easy / Medium / Hard)
* ✅ Modular playlist system
* ✅ JSON / JS-based category configuration
* ✅ Shuffle system per game session
* ✅ Mistake counter
* ✅ Hint system (Medium & Hard)
* ✅ Clean and responsive UI
* ✅ Fully component-based architecture

---

## 🧱 Tech Stack

* React
* Functional Components
* useState / useEffect
* Local JSON / JS playlists
* Plain CSS (lightweight and clean)

---

## 📦 Installation Guide

### 1. Clone the repository

```bash
git clone https://github.com/your-username/wordweaver.git
cd wordweaver
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Or if using Create React App:

```bash
npm start
```

### 4. Open in browser

```
http://localhost:5173
```

(or the port shown in your terminal)

---

## 🧩 Creating Custom Playlists

You can create and manage your own playlists directly within the game using the integrated playlist maker. Users can design custom packs, save them locally, and share the resulting .json files to import into other game sessions.

---

## 🌱 Future Improvements

* 🔥 Daily puzzle mode (date-seeded)
* 📊 Score persistence (LocalStorage)
* 🌐 Online leaderboard
* 🎨 Animated transitions
* 🧠 AI-generated category system
* 📱 Mobile-first UI refinement
* 🎵 Ambient sound / game feel polish

---

## 🎨 Design Philosophy

WordWeaver aims for a **minimal, indie game vibe**:

* Calm color palette
* Simple typography
* Focus on gameplay clarity
* Lightweight and fast

No clutter. Just thinking, pattern recognition, and a satisfying “click” when a group makes sense.

---

## 📜 License

MIT License — free to modify, learn from, and build upon.

---

## ✨ Author

Built as a learning project and experimental game concept.
