export const displayTime = (timeLeft) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds} `;
};
