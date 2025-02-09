let min = document.getElementById("min");
let sec = document.getElementById("sec");
let start = document.querySelector(".btn");

let countdown;

start.addEventListener("click", function () {
  let minutes = 25;
  let seconds = 0;
  countdown = setInterval(function () {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(countdown);
        alert("Pomodoro session finished!");
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    min.innerHTML = String(minutes).padStart(2, "0");
    sec.innerHTML = String(seconds).padStart(2, "0");
  }, 1000);
});