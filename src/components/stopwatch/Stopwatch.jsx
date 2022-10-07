import React, { useEffect, useState } from "react";
import { getFormattedTime } from "../utils";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [time, setTime] = useState(0);
  let interval;

  useEffect(() => {
    if (isTimerRunning) {
      let startTime = Date.now() - time;
      console.log(startTime);
      interval = setInterval(() => {
        setTime(Date.now() - startTime);
        console.log(getFormattedTime(startTime));
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const startStopButton = isTimerRunning ? "Stop" : "Start";
  const lapResetButton = isTimerRunning ? "Lap" : "Reset";
  const startStopClass = isTimerRunning
    ? "primary-button stop-button"
    : "primary-button start-button";

  const lapResetClass = isTimerRunning
    ? "primary-button lap-button"
    : "primary-button reset-button";

  const buttonAction = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  return (
    <section className="stopwatch">
      <div className="stopwatch__content">
        <div className="stopwatch__content timer--container">
          <p className="time-display">{getFormattedTime(time)}</p>
        </div>
        <div className="stopwatch__content controller-container">
          <button className={lapResetClass}>{lapResetButton}</button>
          <button className={startStopClass} onClick={buttonAction}>
            {startStopButton}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Stopwatch;
