import React, { useEffect, useState } from "react";
import { getFormattedTime } from "../utils";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elasptime, setElasptime] = useState(0);
  const [laps, setLaps] = useState([]);

  let interval;

  useEffect(() => {
    if (isTimerRunning) {
      let startTime = Date.now() - elasptime;
      interval = setInterval(() => {
        setElasptime(Date.now() - startTime);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const resetLaps = () => {
    setElasptime(0);
    setIsTimerRunning(false);
    setLaps([]);
  };

  const insertLaps = () => {
    let newLap = laps.reduce((prevValue, currentValue) => {
      return prevValue + currentValue;
    }, 0);
    setLaps((prevLaps) => {
      return [...prevLaps, elasptime - newLap];
    });
  };

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
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

  console.log(isLapDisabled);

  return (
    <section className='stopwatch'>
      <div className='stopwatch__content'>
        <div className='stopwatch__content timer--container'>
          <p className='time-display'>{getFormattedTime(elasptime)}</p>
        </div>
        <div className='stopwatch__content controller-container'>
          {
            <button
              className={lapResetClass}
              disabled={isLapDisabled}
              onClick={isTimerRunning ? insertLaps : resetLaps}
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
      <div className='stopwatch__content lap-record__container'>
        <table>
          <tbody>
            {laps?.map((lap, index) => {
              return (
                <tr key={index}>
                  <td>Lap {index + 1}</td>
                  <td> {getFormattedTime(lap)} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Stopwatch;
