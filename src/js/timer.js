let refCronometro;
export function start() {
  let minutes = 0;
  let seconds = 0;

  refCronometro = setInterval(() => {
    const time = document.querySelector(".time");
    time.innerHTML = `Tempo: ${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
  }, 1000);
}

export function clearTimer() {
  clearInterval(refCronometro);
}

