let score = 0;
let totalClicks = 0;
let targetClicks = 0;
let gameMode = "easy";
let timeoutID;
let fakeTimeoutID;
let gameTimer;
let timeLeft = 30;

function startGame(mode) {
  gameMode = mode;
  document.getElementById("classic-menu").style.display = "none";
  document.getElementById("game-container").style.display = "flex";
  document.getElementById("score").textContent = "Score: 0";
  score = 0;
  totalClicks = 0;
  targetClicks = 0;
  timeLeft = 30;
  document.getElementById("timer").textContent = `Time: ${timeLeft}s`;
  gameTimer = setInterval(updateTimer, 1000);

  document.getElementById("game").addEventListener("click", handleGameClick);

  moveTarget();
}

function updateTimer() {
  timeLeft--;
  document.getElementById("timer").textContent = `Time: ${timeLeft}s`;
  if (timeLeft <= 0) {
    clearInterval(gameTimer);
    endGame();
  }
}

function handleGameClick(e) {
  totalClicks++;
  document.getElementById("score").textContent = `Score: ${score}`;
}

function increaseScore(e) {
  e.stopPropagation();
  score++;
  targetClicks++;
  totalClicks++;
  document.getElementById("score").textContent = `Score: ${score}`;
  moveTarget();
}

function decreaseScore(e) {
  e.stopPropagation();
  score = Math.max(0, score - 1);
  totalClicks++;
  document.getElementById("score").textContent = `Score: ${score}`;
  moveTarget();
}

function endGame() {
  clearInterval(gameTimer);
  clearTimeout(timeoutID);
  clearTimeout(fakeTimeoutID);
  document.getElementById("game").removeEventListener("click", handleGameClick);

  const missedClicks = Math.max(0, totalClicks - targetClicks);
  let accuracy = 0;

  if (totalClicks > 0) {
    accuracy = ((targetClicks / totalClicks) * 100);
    accuracy = Math.min(Math.max(accuracy, 0), 100).toFixed(2);
  }

  document.getElementById("final-score").textContent = `Score: ${score}`;
  document.getElementById("total-clicks").textContent = `Total Clicks: ${totalClicks}`;
  document.getElementById("target-clicks").textContent = `Target Clicks: ${targetClicks}`;
  document.getElementById("missed-clicks").textContent = `Missed Clicks: ${missedClicks}`;
  document.getElementById("accuracy").textContent = `Accuracy: ${accuracy}%`;

  document.getElementById("results-modal").style.display = "flex";
}

function backToMenu() {
  document.getElementById("results-modal").style.display = "none";
  window.location.href = "index.html";
}

function moveTarget() {
  let target = document.getElementById("target");
  let fakeTarget = document.getElementById("fakeTarget");
  let gameArea = document.getElementById("game");

  let x = Math.random() * (gameArea.clientWidth - 50);
  let y = Math.random() * (gameArea.clientHeight - 50);

  target.style.left = x + "px";
  target.style.top = y + "px";
  target.style.display = "block";

  clearTimeout(timeoutID);
  clearTimeout(fakeTimeoutID);
  fakeTarget.style.display = "none";

  let hideTime = 2000;
  if (gameMode === "normal") hideTime = 1000;
  else if (gameMode === "hard") {
    hideTime = 1000;
    if (Math.random() > 0.5) {
      let fx = Math.random() * (gameArea.clientWidth - 50);
      let fy = Math.random() * (gameArea.clientHeight - 50);
      fakeTarget.style.left = fx + "px";
      fakeTarget.style.top = fy + "px";
      fakeTarget.style.display = "block";
      fakeTimeoutID = setTimeout(() => fakeTarget.style.display = "none", 700);
    }
  } else if (gameMode === "ultra-hard") hideTime = 500;

  timeoutID = setTimeout(() => {
    target.style.display = "none";
    moveTarget();
  }, hideTime);
}

  function exitToGamemode() {
    window.location.href = "home_page.html";
  }
  function restartGame() {
    document.getElementById("results-modal").style.display = "none";
    window.location.href = "classic.html";
  }
  