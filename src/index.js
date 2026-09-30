import RouletteGameController from "./controller/RouletteGameController.js";
import OutputView from "./view/OutputView.js";
import InputValidation from "./model/InputValidation.js";

const rouletteGameController = new RouletteGameController();
const outputView = new OutputView();
const inputValidation = new InputValidation();
const playerColorInput = document.querySelector("#color-select");
const betMoneyInput = document.querySelector("#bet-amount");

const betButton = document.querySelector("#bet-button");
const stopButton = document.querySelector("#stop-button");
const restartButton = document.querySelector("#restart-button");
const resultBox = document.querySelector("#result-box");
const gameControlBar = document.querySelector("#game-controls");

restartButton.style.display = "none";
outputView.printInitialState();

betButton.addEventListener("click", (event) => {
    event.preventDefault();

    resultBox.style.display = "";
    const playerColor = playerColorInput.value;
    const betMoney = Number(betMoneyInput.value);

    if (!inputValidation.isValidInput(playerColor, betMoneyInput.value).isValid) {
        outputView.printError(inputValidation.isValidInput(playerColor,betMoneyInput.value).message);
        return;
    }
    rouletteGameController.play(playerColor, betMoney);
});

stopButton.addEventListener("click", (event) => {
    event.preventDefault();

    rouletteGameController.endGame();
});

restartButton.addEventListener("click", (event) => {
    event.preventDefault();
    resultBox.style.display = "none";
    gameControlBar.style.display = "";
    restartButton.style.display = "none";
    rouletteGameController.initGame();
});

