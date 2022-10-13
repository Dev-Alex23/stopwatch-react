// convertTime function
const padNumber = (duration) =>
  Math.floor(duration).toString().padStart(2, "0");

export function getFormattedTime(elapsedTime) {
  const centiseconds = (elapsedTime % 1000) / 10;
  const seconds = (elapsedTime / 1000) % 60;
  const minutes = (elapsedTime / (1000 * 60)) % 60;
  return `${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(
    centiseconds
  )}`;
}
