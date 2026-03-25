let boxes = [...document.querySelectorAll(".box")];
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector("#turn-indicator");

let oScoreEl = document.querySelector("#o-score");
let xScoreEl = document.querySelector("#x-score");
let drawScoreEl = document.querySelector("#draw-score");

let turnO = true; // O starts
let gameOver = false;

let oScore = 0;
let xScore = 0;
let drawScore = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const updateTurnIndicator = () => {
    turnIndicator.innerText = `Turn: ${turnO ? "O" : "X"}`;
};

boxes.forEach((box) => {
    box.addEventListener("click", function () {
        if (gameOver || box.innerText !== "") return;

        if (turnO) {
            box.innerText = "O";
            box.style.color = "green";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "black";
            turnO = true;
        }

        checkWinner();
        updateTurnIndicator();
    });
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("win");
        box.style.color = "";
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const updateScoreboard = () => {
    oScoreEl.innerText = oScore;
    xScoreEl.innerText = xScore;
    drawScoreEl.innerText = drawScore;
};

const showWinner = (winner, pattern) => {
    msg.innerText = `🎉 Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    gameOver = true;

    pattern.forEach((index) => {
        boxes[index].classList.add("win");
    });

    if (winner === "O") {
        oScore++;
    } else {
        xScore++;
    }

    updateScoreboard();
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "😐 Match Drawn";
    msgContainer.classList.remove("hide");
    drawScore++;
    updateScoreboard();
    gameOver = true;
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (
            pos1Val !== "" &&
            pos2Val !== "" &&
            pos3Val !== "" &&
            pos1Val === pos2Val &&
            pos2Val === pos3Val
        ) {
            showWinner(pos1Val, pattern);
            return;
        }
    }

    const allBoxesFilled = boxes.every((box) => box.innerText !== "");
    if (allBoxesFilled) {
        showDraw();
    }
};

const resetGame = () => {
    turnO = true;
    gameOver = false;
    enableBoxes();
    msgContainer.classList.add("hide");
    updateTurnIndicator();
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

updateTurnIndicator();
updateScoreboard();