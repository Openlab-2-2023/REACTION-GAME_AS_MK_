let isHolding = false;
let greenLight = false;
let startTime;
let goTimeout;
let lights = [];

document.addEventListener("DOMContentLoaded", () => {
  lights = Array.from({ length: 5 }, (_, i) =>
    document.getElementById(`light-${i + 1}`)
  );
  const goLight = document.getElementById("light-go");
  const button = document.getElementById("hold-button");
  const instruction = document.getElementById("instruction");

  button.addEventListener("mousedown", () => {
    if (isHolding) return;
    isHolding = true;
    instruction.textContent = "Get ready...";
    document.getElementById("reaction-box").classList.remove("green", "red");

    lights.forEach((l) => l.classList.remove("on"));
    goLight.classList.remove("on");

    lights.forEach((light, i) => {
      setTimeout(() => {
        light.classList.add("on");
      }, i * 300);
    });

    const delay = Math.random() * 2000 + 2000;
    goTimeout = setTimeout(() => {
      goLight.classList.add("on");
      startTime = performance.now();
      greenLight = true;
      instruction.textContent = "Pusti tlačidlo!";
      document.getElementById("reaction-box").classList.add("green");
    }, 5 * 300 + delay);
  });

  button.addEventListener("mouseup", () => {
    if (!isHolding) return;
    isHolding = false;
    clearTimeout(goTimeout);

    if (!greenLight) {
      document.getElementById("reaction-box").classList.add("red");
      showResult("Too early!", "You let go before the green.");
    } else {
      const endTime = performance.now();
      const reaction = (endTime - startTime) / 1000;
      const rank = getRank(reaction);
      showResult("Reaction time", `${reaction.toFixed(3)} seconds`, rank);
    }

    greenLight = false;
  });
});

function showResult(title, message, rank = "") {
  document.getElementById("result-title").textContent = title;
  document.getElementById("reaction-time").textContent = message;
  document.getElementById("rank").textContent = rank
    ? `Tvoje hodnotenie: ${rank}`
    : "";
  document.getElementById("results-modal").style.display = "flex";

  if (title === "Reaction time") {
    const reactionSeconds = parseFloat(message);
    addToSpeedLeaderboard(reactionSeconds, rank);
  }
}

function getRank(time) {
  if (time <= 0.2) return "TOP 1%";
  if (time <= 0.23) return "TOP 5%";
  if (time <= 0.35) return "TOP 10%";
  if (time <= 0.4) return "Above Average";
  if (time <= 0.5) return "Average";
  if (time <= 0.7) return "Below Average";
  return "Too slow";
}

function addToSpeedLeaderboard(reactionTime, rank) {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard_speed")) || [];

  const newEntry = {
    reactionTime: reactionTime.toFixed(3),
    rank: rank
  };

  leaderboard.push(newEntry);
  localStorage.setItem("leaderboard_speed", JSON.stringify(leaderboard));
}

function exitToMenu() {
  window.location.href = "index.html";
}

function exitToGamemode() {
  document.getElementById("results-modal").style.display = "none";
  window.location.href = "home_page.html";
}
function restartGame() {
  document.getElementById("results-modal").style.display = "none";
  window.location.href = "speed.html";
}
function backToMenu() {
  document.getElementById("results-modal").style.display = "none";
  window.location.href = "index.html";
}
