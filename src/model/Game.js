import { ROULETTE_COLORS, INITIAL_MONEY } from '../constants.js';

function getMultiplier(colorName) {
  const color = ROULETTE_COLORS.find((item) => item.name === colorName);
  return color.multiplier;
}

export default class Game {
  constructor() {
    this.reset();
  }

  reset() {
    this.money = INITIAL_MONEY;
    this.round = 0;
  }

  bet(amount) {
    this.money -= amount;
  }

  checkResult(betColor, amount, resultColor) {
    this.round += 1;
    if (betColor !== resultColor) {
      return 0;
    }
    const prize = amount + amount * getMultiplier(betColor);
    this.money += prize;
    return prize;
  }

  isBankrupt() {
    return this.money <= 0;
  }
}
