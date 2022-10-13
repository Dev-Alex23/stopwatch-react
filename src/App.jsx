import React, { useEffect, useReducer, useState } from "react";
import { INITIAL_STATE, stopwatchReducer } from "./components/lapReducer";
import LapButtons from "./components/LapButtons/LapButtons";
import { getFormattedTime } from "./components/utils";
import Table from "./components/table/Table";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(INITIAL_STATE, stopwatchReducer);

  const intialData = {
    laps: [],
    totalLapTime: 0,
    runningTime: 0,
    minLap: Infinity,
    maxLap: 0,
  };

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [lapData, setLapData] = useState(intialData);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      let startTime = Date.now() - elapsedTime;
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }
    if (elapsedTime > 0) {
      setLapData((prevLapData) => ({
        ...prevLapData,
        runningTime: elapsedTime - lapData.totalLapTime,
      }));
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, elapsedTime]);

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
    setElapsedTime(0);
    setIsTimerRunning(false);
    setLapData(intialData);
  };

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const addLapRestLaps = isTimerRunning ? addLaps : resetLaps;

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
    <section className="stopwatch">
      <div className="stopwatch__content">
        <div className="stopwatch__content timer--container">
          <p className="time-display">{getFormattedTime(elapsedTime)}</p>
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
        lapData={lapData}
        isTimerRunning={isTimerRunning}
        elapsedTime={elapsedTime}
      />
    </section>
  );
}

export default App;
