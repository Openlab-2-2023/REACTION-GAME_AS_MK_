let score = 0;
let totalClicks = 0;
let gameMode = "easy";
let timeoutID;
let fakeTimeoutID;
let gameTimer;
let timeLeft = 30;

function showClassicMenu() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("classic-menu").style.display = "flex";
}

function backToMainMenu() {
    document.getElementById("classic-menu").style.display = "none";
    document.getElementById("main-menu").style.display = "flex";
}

function startGame(mode) {
    gameMode = mode;
    document.getElementById("classic-menu").style.display = "none";
    document.getElementById("game-container").style.display = "flex";
    document.getElementById("score").textContent = "Score: 0";
    score = 0;
    totalClicks = 0;
    
    timeLeft = 30;
    document.getElementById("timer").textContent = `Time: ${timeLeft}s`;
    gameTimer = setInterval(updateTimer, 1000);

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

function endGame() {
    clearInterval(gameTimer);
    clearTimeout(timeoutID);
    clearTimeout(fakeTimeoutID);

    let accuracy = totalClicks > 0 ? ((score / totalClicks) * 100).toFixed(2) : 0;

    document.getElementById("final-score").textContent = `Skóre: ${score}`;
    document.getElementById("accuracy").textContent = `Presnosť: ${accuracy}% (${score}/${totalClicks})`;
    document.getElementById("results-modal").style.display = "flex";
}

function backToMenu() {
    document.getElementById("results-modal").style.display = "none";
    window.location.href = "index.html";
}
function increaseScore() {
    score++;
    totalClicks++;
    document.getElementById("score").textContent = "Score: " + score;
    moveTarget();
}

function decreaseScore() {
    score = Math.max(0, score - 1);
    totalClicks++;
    document.getElementById("score").textContent = "Score: " + score;
    moveTarget();
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
    if (gameMode === "normal") {
        hideTime = 1000;
    } else if (gameMode === "hard") {
        hideTime = 1000;
        let chance = Math.random();
        if (chance > 0.5) {
            let fakeX = Math.random() * (gameArea.clientWidth - 50);
            let fakeY = Math.random() * (gameArea.clientHeight - 50);
            fakeTarget.style.left = fakeX + "px";
            fakeTarget.style.top = fakeY + "px";
            fakeTarget.style.display = "block";
            fakeTimeoutID = setTimeout(() => {
                fakeTarget.style.display = "none";
            }, 700);
        }
    } else if (gameMode === "ultra-hard") {
        hideTime = 500;
    }

    timeoutID = setTimeout(() => {
        target.style.display = "none";
        moveTarget();
    }, hideTime);
}