import React, { useEffect, useReducer, useState } from "react";
import { INITIAL_STATE, stopwatchReducer } from "./components/lapReducer";
import LapButtons from "./components/LapButtons/LapButtons";
import { getFormattedTime } from "./components/utils";
import Table from "./components/table/Table";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(INITIAL_STATE, stopwatchReducer);

  useEffect(() => {
    if (state.isTimerRunning) {
      const startTime = Date.now - state.elaspedTime;
      const interval = setInterval(() => {
        const elapsedTime = Date.now - startTime;
        dispatch({ type: "START_TIMER", elapsedTime });
      }, 10);

      return () => clearInterval(interval);
    }
    if (elapsedTime > 0) {
      dispatch({ type: "UPDATE_RUNNING_TIME" });
    }
  }, [state.isTimerRunning, state.elapsedTime]);

  const addLaps = () => {
    const currentLapTime = elapsedTime - lapData.totalLapTime;
    setLapData((prevLapData) => ({
      ...prevLapData,
      laps: [...prevLapData.laps, currentLapTime],
      totalLapTime: elapsedTime,
      minLap:
        currentLapTime < prevLapData.minLap
          ? currentLapTime
          : prevLapData.minLap,
      maxLap:
        currentLapTime > prevLapData.maxLap
          ? currentLapTime
          : prevLapData.maxLap,
    }));
  };

  const resetLaps = () => {
    dispatch({ type: "RESET_LAP" });
  };

  const toggleTimer = () => dispatch({ type: "TOGGLE_TIMER" });
  const addLapRestLaps = state.isTimerRunning ? addLaps : resetLaps;

  const isLapDisabled = !state.isTimerRunning && state.elapsedTime === 0;
  const startStopButtonText = state.isTimerRunning ? "Stop" : "Start";
  const lapResetButtonText =
    !state.isTimerRunning && state.elapsedTime > 0 ? "Reset" : "Lap";
  const startStopClass = state.isTimerRunning
    ? "primary-button stop-button"
    : "primary-button start-button";
  const lapResetClass =
    state.isTimerRunning || state.elapsedTime === 0
      ? "primary-button lap-button"
      : "primary-button reset-button";

  return (
    <section className="stopwatch">
      <div className="stopwatch__content">
        <div className="stopwatch__content timer--container">
          <p className="time-display">{getFormattedTime(state.elapsedTime)}</p>
        </div>
        <LapButtons
          toggleTimer={toggleTimer}
          isLapDisabled={isLapDisabled}
          addLapRestLaps={addLapRestLaps}
          lapResetButtonText={lapResetButtonText}
          lapResetClass={lapResetClass}
          startStopButtonText={startStopButtonText}
          startStopClass={startStopClass}
        />
      </div>
      <Table
        lapData={state}
        isTimerRunning={isTimerRunning}
        elapsedTime={elapsedTime}
      />
    </section>
  );
}

export default App;
