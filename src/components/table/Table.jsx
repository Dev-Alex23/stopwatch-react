import React from "react";
import "./Table.css";
import { getFormattedTime } from "../utils";

const Table = ({ lapData, isTimerRunning, elapsedTime }) => {
  return (
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
  );
};

export default Table;
