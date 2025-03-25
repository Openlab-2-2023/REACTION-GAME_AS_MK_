document.addEventListener("DOMContentLoaded" , (event) => {
    function moveTarget() {
        let target = document.getElementById("target");
        let gameArea = document.getElementById("game");
        target.style.left = Math.random() * (gameArea.clientWidth - 40) + "px";
        target.style.top = Math.random() * (gameArea.clientHeight - 40) + "px";
    }
    moveTarget();
})