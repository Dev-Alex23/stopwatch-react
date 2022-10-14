import React from "react";
import "./LapButtons.css";

const LapButtons = ({
  lapResetClass,
  isLapDisabled,
  lapResetButtonText,
  startStopClass,
  toggleTimer,
  startStopButtonText,
  addLapResetLaps,
}) => {
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
