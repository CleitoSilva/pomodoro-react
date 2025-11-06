import React from "react";
import Pomodoro from "./components/Pomodoro";

export default function App() {
  return (
    <div className="app">
      <h1>Pomodoro React</h1>
      <p className="subtitle">
        Focus for a while, take a short break, and repeat. ✨
      </p>
      <Pomodoro />
      <footer className="footer">
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          Upload to your GitHub
        </a>
      </footer>
    </div>
  );
}