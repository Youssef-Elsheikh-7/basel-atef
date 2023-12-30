import React, { useState, useEffect } from "react";

const CustomTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerInterval = null;

    if (isRunning) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div>
      <p>Time: {time} seconds</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default CustomTimer;
