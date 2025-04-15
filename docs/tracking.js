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
        timerInterval = setInterval(() => {
            elapsedTime += 0.1;
            gameTimer.textContent = `Čas: ${elapsedTime.toFixed(1)} s`;
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

        finalTime.textContent = `Čas na guličke: ${timeSpent.toFixed(2)} sekúnd`;
        modal.style.display = "flex";
    }
});

function backToMenu() {
    document.getElementById("results-modal").style.display = "none";
    window.location.href = "index.html";
}
