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
      showResult("Too early!", "You lost!  You let go before the green.");
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
}

function restartGame() {
  document.getElementById("results-modal").style.display = "none";
  document.getElementById("instruction").textContent = "Hold the button and wait for green signal !";
  document.getElementById("reaction-box").classList.remove("green", "red");

  for (let i = 1; i <= 5; i++) {
    document.getElementById(`light-${i}`).classList.remove("on");
  }
  document.getElementById("light-go").classList.remove("on");
}

function exitToMenu() {
  window.location.href = "index.html";
}

function exitToGamemode() {
  document.getElementById("results-modal").style.display = "none";
  window.location.href = "home_page.html";
}

function getRank(time) {
  if (time <= 0.2) return "TOP 1%";
  if (time <= 0.25) return "TOP 5%";
  if (time <= 0.3) return "TOP 10%";
  if (time <= 0.4) return "Above Average";
  if (time <= 0.5) return "Average";
  if (time <= 0.7) return "Below Average";
  return "Too slow";
}
