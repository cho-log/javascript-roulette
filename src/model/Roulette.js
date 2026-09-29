import { ROULETTE_COLORS } from '../constants.js';

export default class Roulette {
  constructor() {
    this.slots = [];
    ROULETTE_COLORS.forEach((color) => {
      for (let i = 0; i < color.count; i += 1) {
        this.slots.push(color.name);
      }
    });
  }

  spin() {
    const index = Math.floor(Math.random() * this.slots.length);
    return this.slots[index];
  }
}
