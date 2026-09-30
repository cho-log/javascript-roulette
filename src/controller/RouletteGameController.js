import Player from "../model/Player.js";
import Roulette from "../model/Roulette.js";
import OutputView from "../view/OutputView.js";
import InputValidation from "../model/InputValidation.js";

const inputValidation = new InputValidation();

export default class RouletteGameController {
    constructor() {
        this.player = new Player();
        this.roulette = new Roulette();
        this.outputView = new OutputView();
    }

    play(playerColor, betMoney) {
        if (!inputValidation.isValidBetMoney(betMoney, this.player.money).isValid) {
            this.outputView.printError(inputValidation.isValidBetMoney(betMoney, this.player.money).message);
            return;
        }
        this.player.bet(betMoney);

        this.outputView.disableBetStopButtons();
        this.outputView.printWhileSpining();
        this.outputView.printCurrnetMoneyRound(this.player.money, this.player.round);

        setTimeout(() => {
            const targetColor = this.roulette.spin(playerColor, betMoney);
            let moneyChange;
            if (playerColor === targetColor) {
                moneyChange = this.player.win(playerColor, betMoney);
            }
            else {
                this.player.lose(betMoney);
                moneyChange = betMoney;
            }

            this.outputView.printGameResult(targetColor, playerColor, moneyChange, this.player.money, this.player.round);

            if (this.player.money <= 0) {
                setTimeout(() => {
                    this.endGame();
                }, 2000);
                return;
            }

            this.outputView.enableBetStopButtons();
            return;

        }, 2000)

    }

    endGame() {
        if (this.player.money <= 0) {
            this.player.money = 0;
        }
        this.outputView.printGameOver(this.player.money, this.player.round);
        return;
    }

    initGame() {
        this.player.reset();
        this.outputView.printInitialState();
        return;
    }
}
