export const INITIAL_STATE = {
  laps: [],
  elapsedTime: 0,
  isTimerRunning: false,
  totalLapTime: 0,
  runningTime: 0,
  minLap: Infinity,
  maxLap: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_TIMER":
      return {
        ...state,
        isTimerRunning: !state.isTimerRunning,
      };

    case "RESET_LAPS":
      return INITIAL_STATE;

    case "ADD_LAP": {
      const currentLapTime = state.elapsedTime - state.totalLapTime;
      return {
        ...state,
        laps: [...state.laps, currentLapTime],
        totalLapTime: state.elapsedTime,
        minLap: currentLapTime < state.minLap ? currentLapTime : state.minLap,
        maxLap: currentLapTime > state.maxLap ? currentLapTime : state.maxLap,
      };
    }
    case "UPDATE_ELAPSED_TIME": {
      return {
        ...state,
        elapsedTime: action.payload,
      };
    }
    case "UPDATE_RUNNING_TIME": {
      return {
        ...state,
        runningTime: action.payload - state.totalLapTime,
      };
    }

    default:
      throw new Error("Invalid action type: " + action.type);
  }
};
