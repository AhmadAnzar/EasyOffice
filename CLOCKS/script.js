let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");

let hour = 0;
let minute = 0;
let second = 0;
let timer = false;

let interval;
startBtn.addEventListener("click", function () {
  if (!timer) {
    timer = true;
    interval = setInterval(stopWatch, 1000);
  }
});

stopBtn.addEventListener("click", function () {
  timer = false;
  clearInterval(interval);
});

resetBtn.addEventListener("click", function () {
  timer = false;
  clearInterval(interval);
  hour = 0;
  minute = 0;
  second = 0;
  document.getElementById("hr").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";
  document.getElementById("sec").innerHTML = "00";
});

function stopWatch() {
  document.querySelector("h2").innerHTML = " 🧑‍💻GET BACK TO WORK NOW! 👩‍💻";
  let hrString = hour;
  let minString = minute;
  let secString = second;
  second++;

  if (second === 60) {
    minute++;
    second = 0;
  }

  if (minute === 60) {
    hour++;
    minute = 0;
    second = 0;
  }

  if (hour < 10) {
    hrString = "0" + hrString;
  }

  if (minute < 10) {
    minString = "0" + minString;
  }

  if (second < 10) {
    secString = "0" + secString;
  }

  document.getElementById("hr").innerHTML = hrString;
  document.getElementById("min").innerHTML = minString;
  document.getElementById("sec").innerHTML = secString;
}