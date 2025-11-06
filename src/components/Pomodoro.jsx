import React, { useState, useEffect, useRef } from "react";

export default function Pomodoro() {
  const focusTime = 25 * 60;
  const breakTime = 5 * 60;

  const [isRunning, setIsRunning] = useState(false);
  const [isFocus, setIsFocus] = useState(true);
  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("focus-mode", isFocus);
    document.body.classList.toggle("break-mode", !isFocus);
  }, [isFocus]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            handleEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleEnd = () => {
    // Play sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    if (isFocus) {
      setCycles((c) => c + 1);
    }

    // Switch mode
    setIsFocus((prev) => !prev);
    setIsRunning(false);
    setTimeLeft(isFocus ? breakTime : focusTime);
  };

  const toggleTimer = () => setIsRunning((prev) => !prev);
  const resetTimer = () => {
    setIsRunning(false);
    setIsFocus(true);
    setTimeLeft(focusTime);
    setCycles(0);
  };

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const totalTime = isFocus ? focusTime : breakTime;
  const percent = 100 - (timeLeft / totalTime) * 100;

  return (
    <div className="pomodoro">
      <img
  src={isFocus 
    ? "https://cdn-icons-png.flaticon.com/512/415/415682.png" // Tomato for focus
    : "https://cdn-icons-png.flaticon.com/512/590/590836.png" // Coffee mug for break
  }
  alt="pomodoro icon"
  className="tomato"
/>
      <h2 className="mode">{isFocus ? "Focus Mode" : "Break Time"}</h2>

      <div
        className="progress-ring"
        style={{
          background: `conic-gradient(var(--accent) ${percent * 3.6}deg, var(--ring-bg) 0deg)`,
          transition: "background 0.3s linear"
        }}
      >
        <div className="timer">
          {minutes}:{seconds}
        </div>
      </div>

      <p className="cycles">Completed cycles: {cycles}</p>

      <div className="controls">
        <button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={resetTimer}>Reset</button>
        <button
          onClick={() => {
            setIsFocus((f) => !f);
            setIsRunning(false);
            setTimeLeft(isFocus ? breakTime : focusTime);
          }}
        >
          Switch Mode
        </button>
      </div>

      {/* Audio element for sound */}
      <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-bell-notification-933.mp3" preload="auto" />
    </div>
  );
}