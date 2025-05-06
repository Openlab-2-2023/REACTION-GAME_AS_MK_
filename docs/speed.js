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
      instruction.textContent = "Release the button!";
    }, 5 * 300 + delay);
  });

  button.addEventListener("mouseup", () => {
    if (!isHolding) return;
    isHolding = false;
    clearTimeout(goTimeout);

    if (!greenLight) {
      showResult("Too early!", "You lost!  You let go before the green.");
    } else {
      const endTime = performance.now();
      const reaction = (endTime - startTime) / 1000;
      showResult("Reaction time", `${reaction.toFixed(3)} seconds`);
    }

    greenLight = false;
  });
});

function showResult(title, message) {
  document.getElementById("result-title").textContent = title;
  document.getElementById("reaction-time").textContent = message;
  document.getElementById("results-modal").style.display = "flex";
}

function restartGame() {
  document.getElementById("results-modal").style.display = "none";
  document.getElementById("instruction").textContent = "Hold the button and wait for the green signal";

  for (let i = 1; i <= 5; i++) {
    document.getElementById(`light-${i}`).classList.remove("on");
  }
  document.getElementById("light-go").classList.remove("on");
}

function exitToMenu() {
  window.location.href = "index.html"; 
}
function exitToGamemode() {
    window.location.href = "home_page.html"; 
  }
