let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0").substring(0, 2);
};

// convertTime function
const padNumber = (value) => Math.floor(value).toString().padStart(2, "0");

export function getFormattedTime(elapsedTime) {
  const centiseconds = (elapsedTime % 1000) / 10;
  const seconds = (elapsedTime / 1000) % 60;
  const minutes = (elapsedTime / (1000 * 60)) % 60;
  return `${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(
    centiseconds
  )}`;
}

// export const getFormattedTime = (duration) => {
//   milliseconds = duration % 1000;
//   seconds = Math.floor(duration / 1000);
//   minutes = Math.floor(seconds / 60);
//   hours = Math.floor(minutes / 60);

//   if (minutes < 60) {
//     return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}.${padTo2Digits(
//       milliseconds
//     )}`;
//   } else {
//     return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
//       seconds
//     )}.${padTo2Digits(milliseconds)}`;
//   }
// };
