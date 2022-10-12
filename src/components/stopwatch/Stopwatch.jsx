import React, { useEffect, useState } from "react";
import { getFormattedTime } from "../utils";
import "./Stopwatch.css";

const Stopwatch = () => {
  const intialData = {
    laps: [],
    totalLapTime: 0,
    time: 0,
    minLap: [],
    maxLap: [],
  };

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elasptime, setElasptime] = useState(0);
  const [lapData, setLapData] = useState(intialData);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      let startTime = Date.now() - elasptime;
      interval = setInterval(() => {
        setElasptime(Date.now() - startTime);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    if (elasptime > 0) {
      setLapData((prevLapData) => ({
        ...prevLapData,
        time: elasptime - lapData.totalLapTime,
      }));
    }
  }, [elasptime]);

  const addLaps = () => {
    setLapData((prevLapData) => ({
      ...prevLapData,
      laps: [
        ...prevLapData.laps,
        {
          currentLapNumber: lapData.laps.length + 1,
          currentLapTime: elasptime - lapData.totalLapTime,
        },
      ],
      totalLapTime: elasptime,
      time: 0,
    }));
  };

  const resetLaps = () => {
    setElasptime(0);
    setIsTimerRunning(false);
    setLapData(intialData);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };
  const isLapDisabled = !isTimerRunning && elasptime === 0;
  const startStopButtonText = isTimerRunning ? "Stop" : "Start";
  const lapResetButtonText = !isTimerRunning && elasptime > 0 ? "Reset" : "Lap";
  const startStopClass = isTimerRunning
    ? "primary-button stop-button"
    : "primary-button start-button";
  const lapResetClass =
    isTimerRunning || elasptime === 0
      ? "primary-button lap-button"
      : "primary-button reset-button";

  return (
    <section className="stopwatch">
      <div className="stopwatch__content">
        <div className="stopwatch__content timer--container">
          <p className="time-display">{getFormattedTime(elasptime)}</p>
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
            {lapData.laps[lapData.laps.length - 1]
              ? lapData.laps.map((lap) => {
                  return (
                    <tr key={lap.currentLapNumber}>
                      <td>Lap {lap.currentLapNumber} </td>
                      <td>{getFormattedTime(lap.currentLapTime)}</td>
                    </tr>
                  );
                })
              : lapData.laps.map((lap) => {
                  return (
                    <tr key={lap.currentLapNumber}>
                      <td>Lap {lap.currentLapNumber} </td>
                      <td>{getFormattedTime(lapData.time)}</td>
                    </tr>
                  );
                })}
            {(isTimerRunning || elasptime > 0) && (
              <tr>
                <td>Lap {lapData.laps.length + 1} </td>
                <td>{getFormattedTime(lapData.time)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Stopwatch;
