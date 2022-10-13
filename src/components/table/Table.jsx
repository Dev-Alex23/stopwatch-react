import React from "react";
import "./Table.css";
import { getFormattedTime } from "../utils";

const Table = ({ lapData, isTimerRunning, elapsedTime }) => {
  const checkMinMaxLap = (val) => {
    switch (lapData.laps.length >= 2) {
      case lapData.minLap === val:
        return "min-lap";
      case lapData.maxLap === val:
        return "max-lap";
      default:
        return "";
    }
  };

  return (
    <div className="stopwatch__content lap-record__container">
      <table>
        <tbody>
          {lapData.laps?.map((lap, i) => {
            return (
              <tr key={`Lap-${i}-${lap}`} className={checkMinMaxLap(lap)}>
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
  );
};

export default Table;
