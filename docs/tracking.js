let timeSpent = 0;
let isTracking = false;
let moveInterval;
let speed = 2;
const speedIncrease = 0.2;
let speedInterval;
let timerInterval;
let elapsedTime = 0;
let gameStarted = false;

document.addEventListener("DOMContentLoaded", function () {
  const target = document.getElementById("movingTarget");
  const gameContainer = document.getElementById("game-container");
  const gameTimer = document.getElementById("game-timer");

  let x = gameContainer.clientWidth / 2;
  let y = gameContainer.clientHeight / 2;

  let angle = Math.random() * 2 * Math.PI;
  let dx = Math.cos(angle) * speed;
  let dy = Math.sin(angle) * speed;

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;

  function startGame() {
    elapsedTime = 0;
    timeSpent = 0;

    timerInterval = setInterval(() => {
      elapsedTime += 0.1;
      gameTimer.textContent = `TIME: ${elapsedTime.toFixed(1)} s`;
    }, 100);

    moveInterval = setInterval(() => {
      x += dx;
      y += dy;

      if (x <= 0 || x >= gameContainer.clientWidth - target.clientWidth) {
        dx *= -1;
        dx += (Math.random() - 0.5) * 0.5;
        dy += (Math.random() - 0.5) * 0.5;
      }
      if (y <= 0 || y >= gameContainer.clientHeight - target.clientHeight) {
        dy *= -1;
        dx += (Math.random() - 0.5) * 0.5;
        dy += (Math.random() - 0.5) * 0.5;
      }

      if (Math.random() < 0.05) {
        const angleChange = (Math.random() - 0.5) * 0.4;
        const currentSpeed = Math.sqrt(dx * dx + dy * dy);
        const newAngle = Math.atan2(dy, dx) + angleChange;
        dx = Math.cos(newAngle) * currentSpeed;
        dy = Math.sin(newAngle) * currentSpeed;
      }

      target.style.left = `${x}px`;
      target.style.top = `${y}px`;

      if (isTracking) {
        timeSpent += 0.01;
      }
    }, 10);

    speedInterval = setInterval(() => {
      const currentSpeed = Math.sqrt(dx * dx + dy * dy);
      const newSpeed = currentSpeed + speedIncrease;
      const angle = Math.atan2(dy, dx);
      dx = Math.cos(angle) * newSpeed;
      dy = Math.sin(angle) * newSpeed;
    }, 1000);
  }

  target.addEventListener("click", () => {
    if (!gameStarted) {
      gameStarted = true;
      isTracking = true;

      const angle = Math.random() * 2 * Math.PI;
      dx = Math.cos(angle) * speed;
      dy = Math.sin(angle) * speed;

      startGame();
    }
  });

  target.addEventListener("mouseenter", () => {
    if (gameStarted) {
      isTracking = true;
    }
  });

  target.addEventListener("mouseleave", () => {
    if (gameStarted) {
      isTracking = false;
      endGame();
    }
  });

  function endGame() {
    clearInterval(moveInterval);
    clearInterval(speedInterval);
    clearInterval(timerInterval);

    const modal = document.getElementById("results-modal");
    const finalTime = document.getElementById("final-hold-time");

    const cleanHoldTime = Math.max(0, timeSpent).toFixed(2);
    const cleanElapsed = Math.max(0.1, elapsedTime).toFixed(1); // aby nebolo delenie nulou

    finalTime.textContent = `Time on ball: ${cleanHoldTime} seconds`;
    modal.style.display = "flex";

    saveTrackingResult(cleanHoldTime, cleanElapsed);
  }
});

function backToMenu() {
  document.getElementById("results-modal").style.display = "none";
  window.location.href = "index.html";
}

function exitToGamemode() {
  document.getElementById("results-modal").style.display = "none";
  window.location.href = "home_page.html";
}

function restartGame() {
  document.getElementById("results-modal").style.display = "none";
  window.location.href = "tracking.html";
}

function saveTrackingResult(holdTimeStr, totalTimeStr) {
  const key = "leaderboard_tracking";
  let data = [];

  try {
    data = JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    console.error("Chyba pri čítaní zo storage:", e);
  }

  const holdTime = parseFloat(holdTimeStr);
  const totalTime = parseFloat(totalTimeStr);
  const averageHold = totalTime > 0 ? (holdTime / totalTime).toFixed(2) : "0.00";

  const entry = {
    holdTime: holdTime.toFixed(2),
    totalTime: totalTime.toFixed(1),
    averageHold,
    timestamp: new Date().toLocaleString("sk-SK")
  };

  data.push(entry);

  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log("Tracking výsledok uložený:", entry);
  } catch (e) {
    console.error("Chyba pri ukladaní do localStorage:", e);
  }
}
    