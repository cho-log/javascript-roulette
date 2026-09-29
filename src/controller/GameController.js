import Game from '../model/Game.js';
import Roulette from '../model/Roulette.js';
import GameView from '../view/GameView.js';
import { validateColor, validateAmount } from '../model/validator.js';
import { SPIN_TIME, GAME_OVER_TIME } from '../constants.js';

export default class GameController {
  constructor() {
    this.game = new Game();
    this.roulette = new Roulette();
    this.view = new GameView();
    this.view.bindBet(() => this.onBet());
    this.view.bindStop(() => this.endGame());
    this.view.bindRestart(() => this.restart());
  }

  start() {
    this.restart();
  }

  onBet() {
    const color = this.view.getColor();
    const input = this.view.getAmount();
    try {
      validateColor(color);
      validateAmount(input, this.game.money);
    } catch (error) {
      alert(error.message);
      return;
    }
    this.spin(color, Number(input));
  }

  spin(color, amount) {
    this.game.bet(amount);
    this.view.showStatus(this.game.money, this.game.round);
    this.view.disableButtons(true);
    this.view.showSpinning();
    setTimeout(() => this.finishSpin(color, amount), SPIN_TIME);
  }

  finishSpin(color, amount) {
    const resultColor = this.roulette.spin();
    const prize = this.game.checkResult(color, amount, resultColor);

    this.view.showStatus(this.game.money, this.game.round);
    this.view.showResult(resultColor, prize, amount);

    if (this.game.isBankrupt()) {
      this.view.appendGameOverNotice();
      setTimeout(() => this.endGame(), GAME_OVER_TIME);
      return;
    }

    this.view.disableButtons(false);
  }

  endGame() {
    this.view.showGameOver(this.game.money, this.game.round);
  }

  restart() {
    this.game.reset();
    this.view.showStatus(this.game.money, this.game.round);
    this.view.showStartScreen();
  }
}
