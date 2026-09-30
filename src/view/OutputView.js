const playerColorInput = document.querySelector("#color-select");
const betMoneyInput = document.querySelector("#bet-amount");

const betButton = document.querySelector("#bet-button");
const stopButton = document.querySelector("#stop-button");
const restartButton = document.querySelector("#restart-button");
const gameControlBar = document.querySelector("#game-controls");

export default class OutputView {
    constructor() {
        this.result = document.querySelector("#result-content");
        this.playerColor=document.querySelector("#color-select");
        this.currentMoney = document.querySelector("#current-money");
        this.currentRound = document.querySelector("#current-round");
    }

    printInitialState() {
        this.currentMoney.textContent = (10000).toLocaleString();
        this.currentRound.textContent = 0;
        this.result.textContent="";
        betMoneyInput.value="";
        this.playerColor.value="";
        this.result.style.display="none";
        this.enableBetStopButtons();
        gameControlBar.style.display = "";
    }

    printWhileSpining() {
        this.result.style.display="";
        this.result.innerHTML = "룰렛을 돌리는 중...";
    }

    printGameResult(targetColor, playerColor, moneyChange, currentMoney, currentRound) {
        this.result.innerHTML =
            `룰렛 결과: ${targetColor}<br>`;
        if (playerColor === targetColor) {
            this.result.innerHTML += `베팅 성공! + ${moneyChange.toLocaleString()}원`
        }
        else {
            this.result.innerHTML += `베팅 실패! -${moneyChange.toLocaleString()}원`
        }
        if(currentMoney<=0){
            this.result.innerHTML+='<br>게임이 곧 종료됩니다.';
        }
        this.currentMoney.innerHTML = `${currentMoney.toLocaleString()}`;
        this.currentRound.innerHTML = `${currentRound.toLocaleString()}`;
    }

    printCurrnetMoneyRound(currentMoney, currentRound) {
        this.currentMoney.innerHTML = `${currentMoney.toLocaleString()}`;
        this.currentRound.innerHTML = `${currentRound.toLocaleString()}`;
    }
    printGameOver(playerMoney, playerRound) {
        this.result.style.display="";
        
        if (playerMoney === 0) {

            setTimeout(() => {
                this.result.innerHTML =
                    `게임 종료<br>
                최종 자금: ${playerMoney}원<br>
                플레이한 라운드: ${playerRound}`;
                restartButton.style.display = "";
                gameControlBar.style.display = "none";
            }, 2000);

            return;
        }
        this.result.innerHTML =
            `게임 종료<br>
            최종 자금: ${playerMoney.toLocaleString()}원<br>
            플레이한 라운드: ${playerRound}`;

        this.currentMoney.innerHTML = (playerMoney).toLocaleString();
        this.currentRound.innerHTML = playerRound;
        restartButton.style.display = "";
        gameControlBar.style.display = "none";
        return;
    }

    enableBetStopButtons() {
        betButton.disabled = false;
        stopButton.disabled = false;
        return;
    }

    disableBetStopButtons() {
        betButton.disabled = true;
        stopButton.disabled = true;
        return;
    }

    printError(error){
        alert(error);
        return;
    }

}
