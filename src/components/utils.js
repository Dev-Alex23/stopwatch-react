let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0").substring(0, 2);
};

// convertTime function
export const getFormattedTime = (duration) => {
  milliseconds = duration % 1000;
  seconds = Math.floor(duration / 1000);
  minutes = Math.floor(seconds / 60);
  hours = Math.floor(minutes / 60);

  if (minutes < 60) {
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}.${padTo2Digits(
      milliseconds
    )}`;
  } else {
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
      seconds
    )}.${padTo2Digits(milliseconds)}`;
  }
};
