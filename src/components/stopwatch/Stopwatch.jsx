import React, { useEffect, useState } from "react";
import { getFormattedTime } from "../utils";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elasptime, setElasptime] = useState(0);
  const [laps, setLaps] = useState([]);

  let interval;
  const lapData = {
    lap: [...laps],
  };

  useEffect(() => {
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
      const currentLap = lapData.lap[0] ?? { lapNumber: 1 };
    }
  }, [elasptime]);

  const reset = () => {
    setElasptime(0);
    setIsTimerRunning(false);
    setLaps([]);
  };

  const startStopwatch = () => {
    setIsTimerRunning(true);
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
  const lapDisable = !isTimerRunning && elasptime === 0;
  const startStopButtonText = isTimerRunning ? "Stop" : "Start";
  const lapResetButtonText = !isTimerRunning && elasptime > 0 ? "Reset" : "Lap";
  console.log(lapDisable);

  const renderButtons = () => {
    switch (isTimerRunning) {
      case false:
        return (
          <>
            <button className='primary-button lap-button' onClick={reset}>
              Reset
            </button>
            <button className='primary-button start-button' onClick={startStopwatch}>
              Start
            </button>
          </>
        );

      case true:
        return (
          <>
            <button className='primary-button lap-button' onClick={insertLaps}>
              Lap
            </button>
            <button
              className='primary-button stop-button'
              onClick={() => setIsTimerRunning(false)}
            >
              Stop
            </button>
          </>
        );
    }
  };

  return (
    <section className='stopwatch'>
      <div className='stopwatch__content'>
        <div className='stopwatch__content timer--container'>
          <p className='time-display'>{getFormattedTime(elasptime)}</p>
        </div>
        <div className='stopwatch__content controller-container'>
          {
            <button className='primary-button' disabled={lapDisable}>
              {lapResetButtonText}
            </button>
          }
          {
            <button className='primary-button' onClick={toggleTimer}>
              {" "}
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
