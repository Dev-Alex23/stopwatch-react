import React, { useEffect, useState } from "react";
import LapButtons from "../LapButtons/LapButtons";
import Table from "../table/Table";
import { getFormattedTime } from "../utils";
import "./Stopwatch.css";

const Stopwatch = () => {
  const intialData = {
    laps: [],
    totalLapTime: 0,
    runningTime: 0,
    minLap: Infinity,
    maxLap: 0,
  };

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lapData, setLapData] = useState(intialData);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      let startTime = Date.now() - elapsedTime;
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    if (elapsedTime > 0) {
      setLapData((prevLapData) => ({
        ...prevLapData,
        runningTime: elapsedTime - lapData.totalLapTime,
      }));
    }
  }, [elapsedTime]);

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
          isLapDisabled={isLapDisabled}
          toggleTimer={toggleTimer}
          addLapRestLaps={addLapRestLaps}
          startStopButtonText={startStopButtonText}
          lapResetButtonText={lapResetButtonText}
          startStopClass={startStopClass}
          lapResetClass={lapResetClass}
        />
      </div>
      <Table
        lapData={lapData}
        isTimerRunning={isTimerRunning}
        elapsedTime={elapsedTime}
      />
    </section>
  );
};

export default Stopwatch;
