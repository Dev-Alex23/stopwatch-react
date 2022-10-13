import React, { useEffect, useState } from "react";
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
        <div className="stopwatch__content controller-container">
          {
            <button
              className={lapResetClass}
              disabled={isLapDisabled}
              onClick={isTimerRunning ? addLaps : resetLaps}
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
      </div>
      <div className="stopwatch__content lap-record__container">
        <table>
          <tbody>
            {lapData.laps?.map((lap, i) => {
              return (
                <tr
                  key={`Lap-${i}-${lap}`}
                  className={
                    lapData.laps.length >= 2
                      ? `${lapData.minLap === lap && "min-lap"} ${
                          lapData.maxLap === lap && "max-lap"
                        }`
                      : ""
                  }
                >
                  <td>Lap {i + 1} </td>
                  <td>{getFormattedTime(lap)}</td>
                </tr>
              );
            })}
            {(isTimerRunning || elapsedTime > 0) && (
              <tr>
                <td>Lap {lapData.laps.length + 1} </td>
                <td>{getFormattedTime(lapData.runningTime)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Stopwatch;
