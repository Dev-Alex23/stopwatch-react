import React from "react";
import "./LapButtons.css";

const LapButtons = ({
  toggleTimer,
  addLapResetLaps,
  isTimerRunning,
  elapsedTime,
}) => {
  const isLapDisabled = !isTimerRunning && elapsedTime === 0;
  const startStopButtonText = isTimerRunning ? "Stop" : "Start";
  const lapResetButtonText =
    !isTimerRunning && elapsedTime > 0 ? "Reset" : "Lap";
  const startStopClass = isTimerRunning
    ? "primary-button stop-button"
    : "primary-button start-button";
  const lapResetClass =
    isTimerRunning || elapsedTime === 0
      ? "primary-button lap-button"
      : "primary-button reset-button";

  return (
    <div className="stopwatch__content controller-container">
      {
        <button
          className={lapResetClass}
          disabled={isLapDisabled}
          onClick={addLapResetLaps}
        >
          {lapResetButtonText}
        </button>
      }
      {
        <button className={startStopClass} onClick={toggleTimer}>
          {startStopButtonText}
        </button>
      }
    </div>
  );
};

export default LapButtons;
