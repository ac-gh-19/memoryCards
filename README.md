# Pokemon Memory Game

### Live Demo
[poke-mem-cardz.vercel.app](https://poke-mem-cards-git-main-ac-gh-19s-projects.vercel.app/)

## Project Description
A fun memory-style Pokémon game where the objective is to click each Pokémon only once. Each successful unique click increases the score, while clicking a previously selected Pokémon resets the current score. The cards shuffle after every selection, introducing randomness and replayability. All Pokémon data is fetched live from the PokéAPI.

## Features
- Dynamic Shuffle - Cards rearrange after each click
- Memory System - Avoid selecting the same Pokémon twice
- Scoreboard - Tracks current and best score
- Difficulty Modes - Easy, Medium, Hard settings
- Persistent Best Score - Best score remains stored
- Responsive - Works smoothly across all screen sizes
- Live Data Fetching - All assets retrieved from PokéAPI

## Tech Stack
- React (Vite)
- TailwindCSS
- HTML5
- JavaScript
- PokéAPI

## Installation & Setup
**Clone the repository**
  ```bash
   git clone https://github.com/ac-gh-19/memory-card-pokemon.git
    cd memory-card-pokemon
  ```
**Install dependencies**
```bash
npm install
```
**Start development server**
```bash
npm run dev
```
**Open in browser**
```bash
http://localhost:5173
```

**Build for production**
```bash
npm run build
```

## Screenshots
<p align="center">
  <img width="1469" height="764" alt="Screenshot 2025-11-18 at 2 44 09 AM" src="https://github.com/user-attachments/assets/c5276407-f3f6-4ca2-bc39-104a1546a1e9" />
  <br><br>
  <img width="1470" height="761" alt="Screenshot 2025-11-18 at 2 43 32 AM" src="https://github.com/user-attachments/assets/25ff0d25-e0cc-44a1-85ab-b3ec70c2603f" />
</p>

## What I learned
Working through this project deepened my understanding of React’s state management and how component re-renders work in interactive UIs. Building the logic for tracking selected Pokémon, shuffling cards, and conditionally rendering the game state gave me a clearer picture of how React ensures smooth, predictable updates as the user interacts with the interface.

