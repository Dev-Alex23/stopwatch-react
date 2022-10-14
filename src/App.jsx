import React, { useCallback, useEffect, useReducer } from "react";
import { INITIAL_STATE, reducer } from "./components/lapReducer";
import LapButtons from "./components/LapButtons/LapButtons";
import { getFormattedTime } from "./components/utils";
import Table from "./components/table/Table";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    if (state.isTimerRunning) {
      let startTime = Date.now() - state.elapsedTime;
      const interval = setInterval(() => {
        const newElapsedTime = Date.now() - startTime;
        dispatch({ type: "UPDATE_ELAPSED_TIME", payload: newElapsedTime });

        if (state.elapsedTime > 0) {
          dispatch({
            type: "UPDATE_RUNNING_TIME",
            payload: newElapsedTime,
          });
        }
      }, 10);

      return () => clearInterval(interval);
    }
  }, [state.isTimerRunning, state.elapsedTime]);

  const toggleTimer = () => dispatch({ type: "TOGGLE_TIMER" });
  const addLapResetLaps = useCallback(
    () =>
      state.isTimerRunning
        ? dispatch({ type: "ADD_LAP" })
        : dispatch({ type: "RESET_LAPS" }),
    [state.isTimerRunning]
  );

  return (
    <section className="stopwatch">
      <div className="stopwatch__content">
        <div className="stopwatch__content timer--container">
          <p className="time-display">{getFormattedTime(state.elapsedTime)}</p>
        </div>
        <LapButtons
          toggleTimer={toggleTimer}
          addLapResetLaps={addLapResetLaps}
          isTimerRunning={state.isTimerRunning}
          elapsedTime={state.elapsedTime}
        />
      </div>
      <Table
        lapData={state}
        isTimerRunning={state.isTimerRunning}
        elapsedTime={state.elapsedTime}
      />
    </section>
  );
}

export default App;
